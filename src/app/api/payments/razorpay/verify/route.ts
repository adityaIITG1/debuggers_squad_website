import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { getShiprocketToken, createShiprocketOrder, assignAWB, requestPickup } from "@/lib/shiprocket";
import { razorpay } from "@/lib/razorpay";
import { getProduct } from "@/lib/product";

type CustomerDetails = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
};

type ShiprocketDetails = {
  shipment_id: string;
  shiprocket_order_id: string;
  awb_code: string | null;
  courier_partner: string | null;
};

function isValidCustomer(customer: CustomerDetails) {
  return Boolean(
    customer?.name?.trim() &&
      customer?.email?.includes("@") &&
      /^\d{10}$/.test(customer?.phone?.replace(/\D/g, "")) &&
      customer?.address?.trim() &&
      customer?.city?.trim() &&
      customer?.state?.trim() &&
      /^\d{6}$/.test(customer?.pincode)
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      customerDetails,
      disclaimerAccepted
    } = body;

    if (!isValidCustomer(customerDetails) || disclaimerAccepted !== true) {
      return NextResponse.json({ error: "Invalid checkout details" }, { status: 400 });
    }

    if (!process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json({ error: "Payment service is not configured" }, { status: 503 });
    }
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ error: "Order database is not configured" }, { status: 503 });
    }

    // 1. Verify Razorpay Signature
    const secret = process.env.RAZORPAY_KEY_SECRET!;
    const generated_signature = crypto
      .createHmac("sha256", secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    const razorpayOrder = await razorpay.orders.fetch(razorpay_order_id);
    const product = getProduct(razorpayOrder.notes?.product_slug);

    if (!product) {
      return NextResponse.json({ error: "Payment product is invalid" }, { status: 400 });
    }

    if (
      Number(razorpayOrder.amount) !== product.priceInPaise ||
      razorpayOrder.currency !== product.currency
    ) {
      return NextResponse.json({ error: "Payment amount mismatch" }, { status: 400 });
    }

    const { data: existingPayment } = await supabaseAdmin
      .from("payments")
      .select("order_id")
      .eq("razorpay_payment_id", razorpay_payment_id)
      .maybeSingle();

    if (existingPayment) {
      return NextResponse.json({ error: "This payment has already been processed" }, { status: 409 });
    }

    // 2. Save Customer to Supabase
    const { data: customer, error: customerError } = await supabaseAdmin
      .from("customers")
      .insert({
        full_name: customerDetails.name,
        email: customerDetails.email,
        phone: customerDetails.phone,
        address_line: customerDetails.address,
        city: customerDetails.city,
        state: customerDetails.state,
        pincode: customerDetails.pincode,
        landmark: customerDetails.landmark,
      })
      .select()
      .single();

    if (customerError) throw new Error(`Customer Error: ${customerError.message}`);

    // Generate Order Number: DS-NP-YYYY-XXXX
    const year = new Date().getFullYear();
    const orderPrefix = product.slug === "paratalk" ? "PT" : "NP";
    const orderNumber = `DS-${orderPrefix}-${year}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;

    // 3. Save Order to Supabase
    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .insert({
        order_number: orderNumber,
        customer_id: customer.id,
        total_amount: product.price,
        payment_status: "paid",
        order_status: "processing",
        shipping_status: "pending",
        disclaimer_accepted: disclaimerAccepted,
      })
      .select()
      .single();

    if (orderError) throw new Error(`Order Error: ${orderError.message}`);

    // 4. Save Order Items
    const { data: productRecord } = await supabaseAdmin
      .from("products")
      .select("id")
      .eq("slug", product.slug)
      .maybeSingle();

    const orderItemsToInsert = [{
      order_id: order.id,
      product_id: productRecord?.id ?? null,
      product_name: product.fullName,
      quantity: 1,
      unit_price: product.price,
      total_price: product.price,
    }];

    const { error: itemsError } = await supabaseAdmin.from("order_items").insert(orderItemsToInsert);
    if (itemsError) throw new Error(`Items Error: ${itemsError.message}`);

    // 5. Save Payment Record
    const { error: paymentError } = await supabaseAdmin.from("payments").insert({
      order_id: order.id,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount: product.price,
      status: "successful",
    });
    if (paymentError) throw new Error(`Payment Error: ${paymentError.message}`);

    // 6. Shiprocket Automation
    let shiprocketDetails: ShiprocketDetails | null = null;
    let shippingStatus = "Manual scheduling required";

    try {
      if (process.env.SHIPROCKET_EMAIL && process.env.SHIPROCKET_PASSWORD) {
        const token = await getShiprocketToken();
        
        // Prepare order data for Shiprocket
        const srOrderData = {
          order_id: orderNumber,
          order_date: new Date().toISOString().split('T')[0],
          pickup_location: process.env.SHIPROCKET_PICKUP_LOCATION,
          channel_id: process.env.SHIPROCKET_CHANNEL_ID,
          billing_customer_name: customer.full_name,
          billing_last_name: "",
          billing_address: customer.address_line,
          billing_city: customer.city,
          billing_pincode: customer.pincode,
          billing_state: customer.state,
          billing_country: "India",
          billing_email: customer.email,
          billing_phone: customer.phone,
          shipping_is_billing: true,
          order_items: [{
            name: product.fullName,
            sku: product.sku,
            units: 1,
            selling_price: product.price,
          }],
          payment_method: "Prepaid",
          sub_total: product.price,
          length: product.shipment.length,
          breadth: product.shipment.breadth,
          height: product.shipment.height,
          weight: product.shipment.weight,
        };

        const srOrder = await createShiprocketOrder(srOrderData, token);
        const shipmentId = srOrder.shipment_id;
        
        const awbData = await assignAWB(shipmentId, token);
        await requestPickup(shipmentId, token);

        shiprocketDetails = {
          shipment_id: shipmentId.toString(),
          shiprocket_order_id: srOrder.order_id.toString(),
          awb_code: awbData.response.data.awb_assign_status === 1 ? awbData.response.data.awb_code : null,
          courier_partner: awbData.response.data.courier_name || null,
        };
        shippingStatus = "Pickup Scheduled";
      }
    } catch (srError) {
      console.error("Shiprocket Automation Failed, falling back to manual mode:", srError);
      // We don't throw here, we just leave shiprocketDetails as null and status as Manual
    }

    // 7. Update Order Shipping Status & Save Shipment
    await supabaseAdmin
      .from("orders")
      .update({ shipping_status: shippingStatus })
      .eq("id", order.id);

    await supabaseAdmin.from("shipments").insert({
      order_id: order.id,
      courier_partner: shiprocketDetails?.courier_partner,
      shiprocket_order_id: shiprocketDetails?.shiprocket_order_id,
      shipment_id: shiprocketDetails?.shipment_id,
      awb_code: shiprocketDetails?.awb_code,
      pickup_status: shiprocketDetails ? "Scheduled" : "Pending",
      shipping_status: shippingStatus,
    });

    return NextResponse.json({ 
      success: true, 
      order_id: order.id, 
      order_number: orderNumber 
    });

  } catch (error: unknown) {
    console.error("Verification Error:", error);
    const message = error instanceof Error ? error.message : "Failed to verify and process order";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

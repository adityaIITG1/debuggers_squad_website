import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { getShiprocketToken, createShiprocketOrder, assignAWB, requestPickup } from "@/lib/shiprocket";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      customerDetails,
      cartItems,
      totalAmount,
      disclaimerAccepted
    } = body;

    // 1. Verify Razorpay Signature
    const secret = process.env.RAZORPAY_KEY_SECRET!;
    const generated_signature = crypto
      .createHmac("sha256", secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
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
    const orderNumber = `DS-NP-${year}-${Math.floor(1000 + Math.random() * 9000)}`;

    // 3. Save Order to Supabase
    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .insert({
        order_number: orderNumber,
        customer_id: customer.id,
        total_amount: totalAmount,
        payment_status: "paid",
        order_status: "processing",
        shipping_status: "pending",
        disclaimer_accepted: disclaimerAccepted,
      })
      .select()
      .single();

    if (orderError) throw new Error(`Order Error: ${orderError.message}`);

    // 4. Save Order Items
    const orderItemsToInsert = cartItems.map((item: any) => ({
      order_id: order.id,
      product_id: item.product_id, // Ensure this exists or pass null for prototype
      product_name: item.name,
      quantity: item.quantity,
      unit_price: item.price,
      total_price: item.price * item.quantity,
    }));

    const { error: itemsError } = await supabaseAdmin.from("order_items").insert(orderItemsToInsert);
    if (itemsError) throw new Error(`Items Error: ${itemsError.message}`);

    // 5. Save Payment Record
    const { error: paymentError } = await supabaseAdmin.from("payments").insert({
      order_id: order.id,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount: totalAmount,
      status: "successful",
    });
    if (paymentError) throw new Error(`Payment Error: ${paymentError.message}`);

    // 6. Shiprocket Automation
    let shiprocketDetails: any = null;
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
          order_items: cartItems.map((i: any) => ({
            name: i.name,
            sku: i.name.substring(0, 10).toUpperCase(),
            units: i.quantity,
            selling_price: i.price,
          })),
          payment_method: "Prepaid",
          sub_total: totalAmount,
          length: 25,
          breadth: 17,
          height: 10,
          weight: 0.5,
        };

        const srOrder = await createShiprocketOrder(srOrderData, token);
        const shipmentId = srOrder.shipment_id;
        
        const awbData = await assignAWB(shipmentId, token);
        const pickupData = await requestPickup(shipmentId, token);

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

  } catch (error: any) {
    console.error("Verification Error:", error);
    return NextResponse.json({ error: error.message || "Failed to verify and process order" }, { status: 500 });
  }
}

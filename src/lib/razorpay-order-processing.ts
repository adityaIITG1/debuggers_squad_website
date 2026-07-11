import crypto from "crypto";
import { priceCartItems } from "@/lib/cart";
import { sendOrderEmails } from "@/lib/order-email";
import { razorpay } from "@/lib/razorpay";
import {
  assignAWB,
  createShiprocketOrder,
  getShiprocketToken,
  requestPickup,
} from "@/lib/shiprocket";
import { supabaseAdmin } from "@/lib/supabase-admin";

export type CustomerDetails = {
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

type ProcessPaidRazorpayOrderInput = {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature?: string;
  customerDetails?: unknown;
  disclaimerAccepted?: boolean;
};

export function isValidCustomer(customer: unknown): customer is CustomerDetails {
  if (typeof customer !== "object" || customer === null) return false;
  const value = customer as Partial<CustomerDetails>;

  return Boolean(
    value.name?.trim() &&
      value.email?.includes("@") &&
      /^\d{10}$/.test(value.phone?.replace(/\D/g, "") || "") &&
      value.address?.trim() &&
      value.city?.trim() &&
      value.state?.trim() &&
      /^\d{6}$/.test(value.pincode || "")
  );
}

export function normalizeCustomer(customer: CustomerDetails): CustomerDetails {
  return {
    ...customer,
    phone: customer.phone.replace(/\D/g, ""),
    landmark: customer.landmark?.trim() || "",
  };
}

function customerFromNotes(notes: Record<string, unknown> | undefined) {
  if (!notes) return null;

  const customer = {
    name: String(notes.customer_name ?? ""),
    email: String(notes.customer_email ?? ""),
    phone: String(notes.customer_phone ?? ""),
    address: String(notes.customer_address ?? ""),
    city: String(notes.customer_city ?? ""),
    state: String(notes.customer_state ?? ""),
    pincode: String(notes.customer_pincode ?? ""),
    landmark: String(notes.customer_landmark ?? ""),
  };

  return isValidCustomer(customer) ? normalizeCustomer(customer) : null;
}

function databaseErrorMessage(stage: string, message: string) {
  if (message.toLowerCase().includes("fetch failed")) {
    return `${stage}: Database connection failed. Check NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in the deployed environment.`;
  }

  return `${stage}: ${message}`;
}

export function verifyCheckoutSignature({
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
}: {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}) {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) return false;

  const generatedSignature = crypto
    .createHmac("sha256", secret)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest("hex");

  const generatedBuffer = Buffer.from(generatedSignature, "utf8");
  const receivedBuffer = Buffer.from(razorpaySignature, "utf8");

  return (
    generatedBuffer.length === receivedBuffer.length &&
    crypto.timingSafeEqual(generatedBuffer, receivedBuffer)
  );
}

export async function processPaidRazorpayOrder({
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
  customerDetails: submittedCustomerDetails,
  disclaimerAccepted = true,
}: ProcessPaidRazorpayOrderInput) {
  if (!process.env.RAZORPAY_KEY_SECRET) {
    throw new Error("Payment service is not configured");
  }
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Order database is not configured");
  }

  const razorpayOrder = await razorpay.orders.fetch(razorpayOrderId);
  const customerDetails = isValidCustomer(submittedCustomerDetails)
    ? normalizeCustomer(submittedCustomerDetails)
    : customerFromNotes(razorpayOrder.notes as Record<string, unknown> | undefined);

  if (!customerDetails) {
    throw new Error("Invalid checkout details");
  }

  let rawCart: unknown;
  try {
    rawCart = JSON.parse(String(razorpayOrder.notes?.cart ?? "[]"));
  } catch {
    throw new Error("Payment cart is invalid");
  }

  const cart = priceCartItems(rawCart);
  if (cart.items.length === 0) {
    throw new Error("Payment cart is empty");
  }

  if (
    Number(razorpayOrder.amount) !== cart.totalInPaise ||
    razorpayOrder.currency !== "INR"
  ) {
    throw new Error("Payment amount mismatch");
  }

  const razorpayPayment = await razorpay.payments.fetch(razorpayPaymentId);

  if (
    razorpayPayment.order_id !== razorpayOrderId ||
    Number(razorpayPayment.amount) !== cart.totalInPaise ||
    razorpayPayment.currency !== "INR"
  ) {
    throw new Error("Payment details do not match the Razorpay order");
  }

  const capturedPayment =
    razorpayPayment.status === "authorized"
      ? await razorpay.payments.capture(razorpayPaymentId, cart.totalInPaise, "INR")
      : razorpayPayment;

  if (capturedPayment.status !== "captured") {
    throw new Error("Payment was not captured. Contact support before retrying.");
  }

  const { data: existingPayment } = await supabaseAdmin
    .from("payments")
    .select("order_id")
    .eq("razorpay_payment_id", razorpayPaymentId)
    .maybeSingle();

  if (existingPayment) {
    const { data: existingOrder } = await supabaseAdmin
      .from("orders")
      .select("order_number")
      .eq("id", existingPayment.order_id)
      .maybeSingle();

    return {
      success: true,
      already_processed: true,
      order_id: existingPayment.order_id,
      order_number: existingOrder?.order_number,
    };
  }

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

  if (customerError) {
    throw new Error(databaseErrorMessage("Customer Error", customerError.message));
  }

  const orderNumberFromNotes =
    typeof razorpayOrder.notes?.internal_order_number === "string"
      ? razorpayOrder.notes.internal_order_number
      : null;
  const orderPrefix =
    cart.items.length === 1
      ? cart.items[0].product.slug === "paratalk"
        ? "PT"
        : "NP"
      : "MX";
  const orderNumber =
    orderNumberFromNotes ||
    `DS-${orderPrefix}-${new Date().getFullYear()}-${crypto
      .randomUUID()
      .slice(0, 8)
      .toUpperCase()}`;

  const { data: order, error: orderError } = await supabaseAdmin
    .from("orders")
    .insert({
      order_number: orderNumber,
      customer_id: customer.id,
      total_amount: cart.total,
      payment_status: "paid",
      order_status: "processing",
      shipping_status: "pending",
      disclaimer_accepted: disclaimerAccepted,
    })
    .select()
    .single();

  if (orderError) {
    throw new Error(databaseErrorMessage("Order Error", orderError.message));
  }

  const productSlugs = cart.items.map(({ product }) => product.slug);
  const { data: productRecords } = await supabaseAdmin
    .from("products")
    .select("id, slug")
    .in("slug", productSlugs);
  const productIds = new Map(
    (productRecords ?? []).map((record) => [record.slug, record.id])
  );

  const { error: itemsError } = await supabaseAdmin.from("order_items").insert(
    cart.items.map(({ product, quantity, lineTotal }) => ({
      order_id: order.id,
      product_id: productIds.get(product.slug) ?? null,
      product_name: product.fullName,
      quantity,
      unit_price: product.price,
      total_price: lineTotal,
    }))
  );

  if (itemsError) {
    throw new Error(databaseErrorMessage("Items Error", itemsError.message));
  }

  const { error: paymentError } = await supabaseAdmin.from("payments").insert({
    order_id: order.id,
    razorpay_order_id: razorpayOrderId,
    razorpay_payment_id: razorpayPaymentId,
    razorpay_signature: razorpaySignature,
    amount: cart.total,
    status: "successful",
  });

  if (paymentError) {
    throw new Error(databaseErrorMessage("Payment Error", paymentError.message));
  }

  let shiprocketDetails: ShiprocketDetails | null = null;
  let shippingStatus = "Manual scheduling required";

  try {
    if (
      process.env.SHIPROCKET_EMAIL &&
      process.env.SHIPROCKET_PASSWORD &&
      process.env.SHIPROCKET_PICKUP_LOCATION &&
      process.env.SHIPROCKET_CHANNEL_ID
    ) {
      const token = await getShiprocketToken();
      const srOrder = await createShiprocketOrder(
        {
          order_id: orderNumber,
          order_date: new Date()
            .toLocaleString("sv-SE", { timeZone: "Asia/Kolkata" })
            .replace("T", " "),
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
          order_items: cart.items.map(({ product, quantity }) => ({
            name: product.fullName,
            sku: product.sku,
            units: quantity,
            selling_price: product.price,
          })),
          payment_method: "Prepaid",
          sub_total: cart.total,
          length: Math.max(
            ...cart.items.map(({ product }) => product.shipment.length)
          ),
          breadth: Math.max(
            ...cart.items.map(({ product }) => product.shipment.breadth)
          ),
          height: cart.items.reduce(
            (sum, { product, quantity }) =>
              sum + product.shipment.height * quantity,
            0
          ),
          weight: cart.items.reduce(
            (sum, { product, quantity }) =>
              sum + product.shipment.weight * quantity,
            0
          ),
        },
        token
      );
      const shipmentId = Number(srOrder.shipment_id);

      if (!shipmentId || !srOrder.order_id) {
        throw new Error("Shiprocket did not return an order and shipment ID");
      }

      shiprocketDetails = {
        shipment_id: shipmentId.toString(),
        shiprocket_order_id: srOrder.order_id.toString(),
        awb_code: null,
        courier_partner: null,
      };
      shippingStatus = "Order created in Shiprocket";

      try {
        const awbData = await assignAWB(shipmentId, token);
        const awb = awbData?.response?.data;

        if (awb?.awb_assign_status === 1 && awb.awb_code) {
          shiprocketDetails.awb_code = awb.awb_code;
          shiprocketDetails.courier_partner = awb.courier_name || null;
          await requestPickup(shipmentId, token);
          shippingStatus = "Pickup Scheduled";
        } else {
          shippingStatus = "AWB assignment pending";
        }
      } catch (awbError) {
        console.error("Shiprocket AWB or pickup request failed:", awbError);
        shippingStatus = "AWB or pickup scheduling required";
      }
    }
  } catch (srError) {
    console.error(
      "Shiprocket Automation Failed, falling back to manual mode:",
      srError
    );
  }

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
    pickup_status: shippingStatus === "Pickup Scheduled" ? "Scheduled" : "Pending",
    shipping_status: shippingStatus,
  });

  await sendOrderEmails({
    orderNumber,
    customerName: customer.full_name,
    customerEmail: customer.email,
    customerPhone: customer.phone,
    deliveryAddress: [
      customer.address_line,
      customerDetails.landmark,
      customer.city,
      customer.state,
      customer.pincode,
    ]
      .filter(Boolean)
      .join(", "),
    items: cart.items,
    total: cart.total,
    paymentId: razorpayPaymentId,
    shippingStatus,
    awbCode: shiprocketDetails?.awb_code,
    courierPartner: shiprocketDetails?.courier_partner,
  });

  return {
    success: true,
    order_id: order.id,
    order_number: orderNumber,
  };
}

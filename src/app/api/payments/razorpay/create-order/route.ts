import { NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";
import { priceCartItems } from "@/lib/cart";
import { sendCheckoutStartedEmail } from "@/lib/order-email";

type RazorpayApiError = {
  statusCode?: number;
  error?: { description?: string };
};

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

function isValidCustomer(customer: unknown): customer is CustomerDetails {
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

function createOrderNumber(productPrefix: string) {
  return `DS-${productPrefix}-${new Date().getFullYear()}-${crypto
    .randomUUID()
    .slice(0, 8)
    .toUpperCase()}`;
}

export async function POST(req: Request) {
  try {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json({ error: "Payment service is not configured" }, { status: 503 });
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const rawItems =
      typeof body === "object" && body !== null && "items" in body
        ? (body as { items?: unknown }).items
        : undefined;
    const customerDetails =
      typeof body === "object" && body !== null && "customerDetails" in body
        ? (body as { customerDetails?: unknown }).customerDetails
        : undefined;
    const cart = priceCartItems(rawItems);

    if (cart.items.length === 0) {
      return NextResponse.json({ error: "Cart is empty or invalid" }, { status: 400 });
    }
    if (cart.totalInPaise < 100) {
      return NextResponse.json({ error: "Amount must be at least 100 paise" }, { status: 400 });
    }
    if (!isValidCustomer(customerDetails)) {
      return NextResponse.json({ error: "Invalid checkout details" }, { status: 400 });
    }

    const normalizedCustomer = {
      ...customerDetails,
      phone: customerDetails.phone.replace(/\D/g, ""),
      landmark: customerDetails.landmark?.trim() || "",
    };
    const orderPrefix =
      cart.items.length === 1
        ? cart.items[0].product.slug === "paratalk"
          ? "PT"
          : "NP"
        : "MX";
    const orderNumber = createOrderNumber(orderPrefix);

    const orderOptions = {
      amount: cart.totalInPaise,
      currency: "INR",
      receipt: orderNumber,
      notes: {
        internal_order_number: orderNumber,
        cart: JSON.stringify(
          cart.items.map(({ slug, quantity }) => ({ slug, quantity }))
        ),
        item_count: String(
          cart.items.reduce((sum, item) => sum + item.quantity, 0)
        ),
        customer_name: normalizedCustomer.name,
        customer_email: normalizedCustomer.email,
        customer_phone: normalizedCustomer.phone,
        customer_address: normalizedCustomer.address,
        customer_city: normalizedCustomer.city,
        customer_state: normalizedCustomer.state,
        customer_pincode: normalizedCustomer.pincode,
        customer_landmark: normalizedCustomer.landmark,
      },
    };

    const order = await razorpay.orders.create(orderOptions);
    const deliveryAddress = [
      normalizedCustomer.address,
      normalizedCustomer.landmark,
      normalizedCustomer.city,
      normalizedCustomer.state,
      normalizedCustomer.pincode,
    ]
      .filter(Boolean)
      .join(", ");

    let checkoutEmailSent = false;
    let checkoutEmailError: string | undefined;

    try {
      checkoutEmailSent = await sendCheckoutStartedEmail({
        orderNumber,
        customerName: normalizedCustomer.name,
        customerEmail: normalizedCustomer.email,
        customerPhone: normalizedCustomer.phone,
        deliveryAddress,
        items: cart.items,
        total: cart.total,
      });
    } catch (error) {
      checkoutEmailError =
        error instanceof Error ? error.message : "Checkout email failed";
    }

    return NextResponse.json({
      key_id: process.env.RAZORPAY_KEY_ID,
      order_id: order.id,
      order_number: orderNumber,
      amount: order.amount,
      currency: order.currency,
      checkout_email_sent: checkoutEmailSent,
      checkout_email_error: checkoutEmailError,
    });
  } catch (error: unknown) {
    console.error("Razorpay Order Creation Error:", error);
    const razorpayError = error as RazorpayApiError;
    if (razorpayError?.statusCode === 401) {
      return NextResponse.json(
        { error: "Razorpay authentication failed. Check the configured API keys." },
        { status: 401 }
      );
    }
    return NextResponse.json(
      {
        error:
          razorpayError?.error?.description || "Failed to create Razorpay order",
      },
      { status: 500 }
    );
  }
}

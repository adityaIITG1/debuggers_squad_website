import { NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";
import { priceCartItems } from "@/lib/cart";

type RazorpayApiError = {
  statusCode?: number;
  error?: { description?: string };
};

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
    const cart = priceCartItems(rawItems);

    if (cart.items.length === 0) {
      return NextResponse.json({ error: "Cart is empty or invalid" }, { status: 400 });
    }
    if (cart.totalInPaise < 100) {
      return NextResponse.json({ error: "Amount must be at least 100 paise" }, { status: 400 });
    }

    const orderOptions = {
      amount: cart.totalInPaise,
      currency: "INR",
      receipt: `ds_${Date.now()}`,
      notes: {
        cart: JSON.stringify(
          cart.items.map(({ slug, quantity }) => ({ slug, quantity }))
        ),
        item_count: String(
          cart.items.reduce((sum, item) => sum + item.quantity, 0)
        ),
      },
    };

    const order = await razorpay.orders.create(orderOptions);

    return NextResponse.json({
      key_id: process.env.RAZORPAY_KEY_ID,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
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

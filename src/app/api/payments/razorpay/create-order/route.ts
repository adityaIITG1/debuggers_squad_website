import { NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";
import { getProduct } from "@/lib/product";

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

    const productSlug =
      typeof body === "object" && body !== null && "productSlug" in body
        ? (body as { productSlug?: unknown }).productSlug
        : undefined;
    const product = getProduct(productSlug);

    if (!product) {
      return NextResponse.json({ error: "Invalid product" }, { status: 400 });
    }
    if (product.priceInPaise < 100) {
      return NextResponse.json({ error: "Amount must be at least 100 paise" }, { status: 400 });
    }

    const orderOptions = {
      amount: product.priceInPaise,
      currency: product.currency,
      receipt: `${product.slug.slice(0, 8)}_${Date.now()}`,
      notes: {
        sku: product.sku,
        product: product.fullName,
        product_slug: product.slug,
      },
    };

    const order = await razorpay.orders.create(orderOptions);

    return NextResponse.json({
      key_id: process.env.RAZORPAY_KEY_ID,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      product: product.fullName,
      product_slug: product.slug,
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

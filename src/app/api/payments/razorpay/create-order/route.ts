import { NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";
import { getProduct } from "@/lib/product";

export async function POST(req: Request) {
  try {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json({ error: "Payment service is not configured" }, { status: 503 });
    }

    const { productSlug } = await req.json();
    const product = getProduct(productSlug);

    if (!product) {
      return NextResponse.json({ error: "Invalid product" }, { status: 400 });
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
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      product: product.fullName,
      product_slug: product.slug,
    });
  } catch (error) {
    console.error("Razorpay Order Creation Error:", error);
    return NextResponse.json({ error: "Failed to create Razorpay order" }, { status: 500 });
  }
}

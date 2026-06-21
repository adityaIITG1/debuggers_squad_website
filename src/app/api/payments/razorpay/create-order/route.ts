import { NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";
import { NEUROPULSE_PRODUCT } from "@/lib/product";

export async function POST() {
  try {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json({ error: "Payment service is not configured" }, { status: 503 });
    }

    const orderOptions = {
      amount: NEUROPULSE_PRODUCT.priceInPaise,
      currency: NEUROPULSE_PRODUCT.currency,
      receipt: `npai_${Date.now()}`,
      notes: {
        sku: NEUROPULSE_PRODUCT.sku,
        product: NEUROPULSE_PRODUCT.fullName,
      },
    };

    const order = await razorpay.orders.create(orderOptions);

    return NextResponse.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      product: NEUROPULSE_PRODUCT.fullName,
    });
  } catch (error) {
    console.error("Razorpay Order Creation Error:", error);
    return NextResponse.json({ error: "Failed to create Razorpay order" }, { status: 500 });
  }
}

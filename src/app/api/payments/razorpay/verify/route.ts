import { NextResponse } from "next/server";
import {
  processPaidRazorpayOrder,
  verifyCheckoutSignature,
} from "@/lib/razorpay-order-processing";

export async function POST(req: Request) {
  try {
    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      customerDetails,
      disclaimerAccepted,
    } = body;

    if (
      typeof razorpay_order_id !== "string" ||
      typeof razorpay_payment_id !== "string" ||
      typeof razorpay_signature !== "string"
    ) {
      return NextResponse.json(
        { error: "Missing or invalid Razorpay payment fields" },
        { status: 400 }
      );
    }

    if (disclaimerAccepted !== true) {
      return NextResponse.json(
        { error: "Product disclaimer must be accepted" },
        { status: 400 }
      );
    }

    if (
      !verifyCheckoutSignature({
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
      })
    ) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    const result = await processPaidRazorpayOrder({
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      customerDetails,
      disclaimerAccepted,
    });

    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error("Verification Error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to verify and process order";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

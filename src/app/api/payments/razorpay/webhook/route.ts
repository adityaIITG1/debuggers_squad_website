import crypto from "crypto";
import { NextResponse } from "next/server";
import { processPaidRazorpayOrder } from "@/lib/razorpay-order-processing";

type RazorpayWebhookPayload = {
  event?: string;
  payload?: {
    payment?: {
      entity?: {
        id?: string;
        order_id?: string;
      };
    };
  };
};

function verifyWebhookSignature({
  rawBody,
  signature,
  secret,
}: {
  rawBody: string;
  signature: string;
  secret: string;
}) {
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");

  const expectedBuffer = Buffer.from(expectedSignature, "utf8");
  const receivedBuffer = Buffer.from(signature, "utf8");

  return (
    expectedBuffer.length === receivedBuffer.length &&
    crypto.timingSafeEqual(expectedBuffer, receivedBuffer)
  );
}

export async function POST(req: Request) {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!secret) {
      return NextResponse.json(
        { error: "Razorpay webhook is not configured" },
        { status: 503 }
      );
    }

    const signature = req.headers.get("x-razorpay-signature");
    if (!signature) {
      return NextResponse.json({ error: "Missing webhook signature" }, { status: 400 });
    }

    const rawBody = await req.text();
    if (!verifyWebhookSignature({ rawBody, signature, secret })) {
      return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
    }

    const event = JSON.parse(rawBody) as RazorpayWebhookPayload;

    if (event.event !== "payment.captured") {
      return NextResponse.json({ received: true, ignored: true });
    }

    const payment = event.payload?.payment?.entity;
    if (!payment?.id || !payment.order_id) {
      return NextResponse.json(
        { error: "Webhook payment payload is missing payment/order ID" },
        { status: 400 }
      );
    }

    const result = await processPaidRazorpayOrder({
      razorpayOrderId: payment.order_id,
      razorpayPaymentId: payment.id,
      disclaimerAccepted: true,
    });

    return NextResponse.json({ received: true, ...result });
  } catch (error: unknown) {
    console.error("Razorpay Webhook Error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to process Razorpay webhook";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

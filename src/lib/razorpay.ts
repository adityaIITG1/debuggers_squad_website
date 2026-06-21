import Razorpay from "razorpay";

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.warn("Razorpay environment variables are not configured.");
}

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "missing_key",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "missing_secret",
});

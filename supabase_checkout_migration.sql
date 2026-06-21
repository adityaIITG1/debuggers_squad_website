-- Run this once in the Supabase SQL Editor for an existing deployment.
-- It prevents the same Razorpay payment from creating duplicate orders.

CREATE UNIQUE INDEX IF NOT EXISTS payments_razorpay_payment_id_unique
ON payments (razorpay_payment_id)
WHERE razorpay_payment_id IS NOT NULL;

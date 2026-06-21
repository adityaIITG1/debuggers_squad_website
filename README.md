# Debuggers Squad - NeuroPulseAI

This is the official e-commerce and product showcase platform for Debuggers Squad's NeuroPulseAI.

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS & shadcn/ui
- **Database & Auth:** Supabase
- **Payments:** Razorpay
- **Shipping:** Shiprocket API
- **Transactional Email:** Resend

## Local Setup Instructions

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Database Setup:**
   - Go to your Supabase project dashboard.
   - Open the SQL Editor.
   - Copy the contents of `supabase_schema.sql` and run it to create all tables and RLS policies.

3. **Environment Variables:**
   - Rename `.env.example` to `.env.local`.
   - Fill in all the API keys (Supabase, Razorpay, Shiprocket).
   - Ensure `SUPABASE_SERVICE_ROLE_KEY` is added for backend operations.
   - Razorpay requires one matching key pair:
     - `RAZORPAY_KEY_ID` — server-side Key ID
     - `RAZORPAY_KEY_SECRET` — server-side secret; never expose it to the browser
   - The server returns the Key ID with each created Razorpay order. The Key
     Secret remains server-only.
   - Production payments require a matching `rzp_live_` key pair in Vercel.
   - Shiprocket automation requires:
     - `SHIPROCKET_EMAIL`
     - `SHIPROCKET_PASSWORD`
     - `SHIPROCKET_PICKUP_LOCATION` — exact pickup nickname configured in Shiprocket
     - `SHIPROCKET_CHANNEL_ID` — website/custom channel ID
   - Order emails require:
     - `RESEND_API_KEY`
     - `ORDER_EMAIL_FROM` — sender on a domain verified in Resend
     - `ORDER_NOTIFICATION_EMAIL` — internal order recipient

4. **Existing Supabase deployments:**
   - Run `supabase_checkout_migration.sql` once in the Supabase SQL Editor.
   - This adds an idempotency constraint for Razorpay payment IDs.

5. **Run Locally:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Vercel Deployment Instructions

1. **Push to GitHub:**
   Commit all your code and push it to a GitHub repository.

2. **Import to Vercel:**
   - Go to [Vercel](https://vercel.com/) and click "Add New Project".
   - Import your GitHub repository.

3. **Configure Environment Variables:**
   During the import process, add ALL the variables from your `.env.local` file to the Vercel Environment Variables section.
   *Important: Do not skip the `SUPABASE_SERVICE_ROLE_KEY` or `RAZORPAY_KEY_SECRET`.*

4. **Deploy:**
   Click Deploy. Vercel will automatically build the Next.js App Router application.

5. **Production checks:**
   - Razorpay payment capture should be automatic. The server also attempts capture
     when Razorpay returns an authorised payment.
   - Verify UPI/cards are enabled in the Razorpay live account.
   - Verify the Shiprocket pickup address and channel are active.
   - Verify `debuggerssquad.com` in Resend before using an
     `@debuggerssquad.com` sender.

6. **Custom Domain:**
   Once deployed, go to the project settings in Vercel -> Domains.
   Add `www.debuggerssquad.com` and configure your DNS settings as instructed by Vercel.

## Important Note on Disclaimers
This project contains medical and legal disclaimers heavily integrated into the checkout flow and footer. NeuroPulseAI is sold as an educational prototype. Ensure these disclaimers remain intact to avoid legal liabilities.

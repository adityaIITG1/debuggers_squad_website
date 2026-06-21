# Debuggers Squad - NeuroPulseAI

This is the official e-commerce and product showcase platform for Debuggers Squad's NeuroPulseAI.

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS & shadcn/ui
- **Database & Auth:** Supabase
- **Payments:** Razorpay
- **Shipping:** Shiprocket API

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
     - `NEXT_PUBLIC_RAZORPAY_KEY_ID` — must match `RAZORPAY_KEY_ID`
   - Keys beginning with `rzp_test_` cannot accept real UPI/QR payments. After
     Razorpay activates the account, use matching `rzp_live_` values in Vercel
     and redeploy.

4. **Run Locally:**
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

5. **Custom Domain:**
   Once deployed, go to the project settings in Vercel -> Domains.
   Add `www.debuggerssquad.com` and configure your DNS settings as instructed by Vercel.

## Important Note on Disclaimers
This project contains medical and legal disclaimers heavily integrated into the checkout flow and footer. NeuroPulseAI is sold as an educational prototype. Ensure these disclaimers remain intact to avoid legal liabilities.

import { createClient } from "@supabase/supabase-js";

// Note: This client uses the service role key and bypasses RLS.
// ONLY use this in secure server-side API routes.
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // Fallback if service role is missing for local dev
);

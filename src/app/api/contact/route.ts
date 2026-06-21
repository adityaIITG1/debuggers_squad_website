import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, message, type, organization, productInterest } = body;

    if (type === "demo") {
      const { error } = await supabaseAdmin.from("demo_requests").insert({
        name, email, phone, organization, product_interest: productInterest, message
      });
      if (error) throw error;
    } else {
      const { error } = await supabaseAdmin.from("contact_messages").insert({
        name, email, phone, message
      });
      if (error) throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Contact Form Error:", error);
    return NextResponse.json({ error: "Failed to submit form" }, { status: 500 });
  }
}

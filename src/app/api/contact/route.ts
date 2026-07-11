import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/contact-email";
import { supabaseAdmin } from "@/lib/supabase-admin";

type ContactType = "contact" | "demo";

type ContactPayload = {
  type: ContactType;
  name: string;
  email: string;
  phone: string;
  message: string;
  organization?: string;
  productInterest?: string;
};

function stringValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function parsePayload(body: Record<string, unknown>): ContactPayload | null {
  const type = body.type === "demo" ? "demo" : "contact";
  const payload: ContactPayload = {
    type,
    name: stringValue(body.name),
    email: stringValue(body.email),
    phone: stringValue(body.phone),
    message: stringValue(body.message),
    organization: stringValue(body.organization),
    productInterest: stringValue(body.productInterest),
  };

  if (
    !payload.name ||
    !payload.email.includes("@") ||
    !/^\d{10,12}$/.test(payload.phone.replace(/\D/g, "")) ||
    !payload.message
  ) {
    return null;
  }

  return {
    ...payload,
    phone: payload.phone.replace(/\D/g, ""),
  };
}

export async function POST(req: Request) {
  try {
    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const payload = parsePayload(body);
    if (!payload) {
      return NextResponse.json(
        { error: "Please enter a valid name, email, phone, and message." },
        { status: 400 }
      );
    }

    let databaseSaved = false;
    let emailSent = false;
    let lastError: unknown;

    try {
      if (payload.type === "demo") {
        const { error } = await supabaseAdmin.from("demo_requests").insert({
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          organization: payload.organization,
          product_interest: payload.productInterest,
          message: payload.message,
        });
        if (error) throw error;
      } else {
        const { error } = await supabaseAdmin.from("contact_messages").insert({
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          message: payload.message,
        });
        if (error) throw error;
      }
      databaseSaved = true;
    } catch (error) {
      lastError = error;
      console.error("Contact database save failed:", error);
    }

    try {
      emailSent = await sendContactEmail(payload);
    } catch (error) {
      lastError = error;
      console.error("Contact notification email failed:", error);
    }

    if (!databaseSaved && !emailSent) {
      throw lastError instanceof Error
        ? lastError
        : new Error("Failed to submit form");
    }

    return NextResponse.json({ success: true, databaseSaved, emailSent });
  } catch (error: unknown) {
    console.error("Contact Form Error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to submit form";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

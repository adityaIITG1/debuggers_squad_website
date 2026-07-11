type ContactEmailDetails = {
  type: "contact" | "demo";
  name: string;
  email: string;
  phone: string;
  message: string;
  organization?: string;
  productInterest?: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function contactHtml(details: ContactEmailDetails) {
  return `
    <div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#1f2937">
      <h1 style="color:#673de6">${
        details.type === "demo" ? "New demo request" : "New contact message"
      }</h1>
      <p><strong>Name:</strong> ${escapeHtml(details.name)}<br>
      <strong>Email:</strong> ${escapeHtml(details.email)}<br>
      <strong>Phone:</strong> ${escapeHtml(details.phone)}${
        details.organization
          ? `<br><strong>Organization:</strong> ${escapeHtml(details.organization)}`
          : ""
      }${
        details.productInterest
          ? `<br><strong>Product interest:</strong> ${escapeHtml(details.productInterest)}`
          : ""
      }</p>
      <p><strong>Message:</strong></p>
      <p style="white-space:pre-wrap;border-left:4px solid #673de6;padding-left:12px">${escapeHtml(
        details.message
      )}</p>
      <p style="color:#6b7280;font-size:13px">Debuggers Squad - debuggerssquad.com/contact</p>
    </div>`;
}

export async function sendContactEmail(details: ContactEmailDetails) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ORDER_EMAIL_FROM;
  const to = process.env.ORDER_NOTIFICATION_EMAIL || "debuggerssquad@gmail.com";

  if (!apiKey || !from) {
    console.warn("Contact email skipped: RESEND_API_KEY or ORDER_EMAIL_FROM is missing.");
    return false;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: details.email,
      subject:
        details.type === "demo"
          ? `Demo request from ${details.name}`
          : `Contact message from ${details.name}`,
      html: contactHtml(details),
    }),
  });

  if (!response.ok) {
    throw new Error(`Contact email failed: ${await response.text()}`);
  }

  return true;
}

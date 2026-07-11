import type { PricedCartItem } from "@/lib/cart";

type OrderEmailDetails = {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  items: PricedCartItem[];
  total: number;
  paymentId: string;
  shippingStatus: string;
  awbCode?: string | null;
  courierPartner?: string | null;
};

type CheckoutStartedEmailDetails = Omit<
  OrderEmailDetails,
  "paymentId" | "shippingStatus" | "awbCode" | "courierPartner"
>;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function estimatedDeliveryWindow() {
  const start = new Date();
  start.setDate(start.getDate() + 5);

  const end = new Date();
  end.setDate(end.getDate() + 8);

  const format: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  };

  return `${start.toLocaleDateString("en-IN", format)} - ${end.toLocaleDateString("en-IN", format)}`;
}

function itemRows(items: PricedCartItem[]) {
  return items
    .map(
      ({ product, quantity, lineTotal }) => `
        <tr>
          <td style="padding:8px;border-bottom:1px solid #e5e7eb">${escapeHtml(product.fullName)}</td>
          <td style="padding:8px;border-bottom:1px solid #e5e7eb;text-align:center">${quantity}</td>
          <td style="padding:8px;border-bottom:1px solid #e5e7eb;text-align:right">Rs ${lineTotal.toLocaleString("en-IN")}</td>
        </tr>`
    )
    .join("");
}

function customerBlock(
  details: Pick<
    OrderEmailDetails,
    "customerName" | "customerEmail" | "customerPhone" | "deliveryAddress"
  >
) {
  return `<p><strong>Customer:</strong> ${escapeHtml(details.customerName)}<br>
    <strong>Email:</strong> ${escapeHtml(details.customerEmail)}<br>
    <strong>Phone:</strong> ${escapeHtml(details.customerPhone)}<br>
    <strong>Delivery address:</strong> ${escapeHtml(details.deliveryAddress)}</p>`;
}

function orderHtml(details: OrderEmailDetails, admin: boolean) {
  const deliveryWindow = estimatedDeliveryWindow();
  const courierText =
    details.courierPartner || "Shiprocket / BlueDart / available courier partner";

  return `
    <div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#1f2937">
      <h1 style="color:#673de6">${admin ? "New paid order" : "Order confirmed"}</h1>
      <p>${
        admin
          ? `${escapeHtml(details.customerName)} purchased from debuggerssquad.com.`
          : `Thank you ${escapeHtml(details.customerName)}. Your payment was received and your order is confirmed.`
      }</p>
      <p><strong>Order:</strong> ${escapeHtml(details.orderNumber)}<br>
      <strong>Payment ID:</strong> ${escapeHtml(details.paymentId)}<br>
      <strong>Shipping:</strong> ${escapeHtml(details.shippingStatus)}<br>
      <strong>Courier:</strong> ${escapeHtml(courierText)}<br>
      <strong>Estimated delivery:</strong> ${escapeHtml(deliveryWindow)}</p>
      <table style="width:100%;border-collapse:collapse">
        <thead><tr><th style="padding:8px;text-align:left">Product</th><th>Qty</th><th style="text-align:right">Amount</th></tr></thead>
        <tbody>${itemRows(details.items)}</tbody>
      </table>
      <p style="font-size:20px"><strong>Total: Rs ${details.total.toLocaleString("en-IN")}</strong></p>
      ${admin ? customerBlock(details) : ""}
      ${
        details.awbCode
          ? `<p><strong>AWB:</strong> ${escapeHtml(details.awbCode)}${
              details.courierPartner
                ? ` (${escapeHtml(details.courierPartner)})`
                : ""
            }</p>`
          : ""
      }
      <p style="color:#6b7280;font-size:13px">Debuggers Squad - debuggerssquad.com</p>
    </div>`;
}

function checkoutStartedHtml(details: CheckoutStartedEmailDetails) {
  const productText =
    details.items.length === 1
      ? details.items[0].product.fullName
      : `${details.items.length} products`;

  return `
    <div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#1f2937">
      <h1 style="color:#673de6">Customer trying to buy ${escapeHtml(productText)}</h1>
      <p>${escapeHtml(details.customerName)} entered delivery details and opened Razorpay checkout on debuggerssquad.com before payment.</p>
      <p><strong>Temporary order ID:</strong> ${escapeHtml(details.orderNumber)}<br>
      <strong>Status:</strong> Awaiting Razorpay payment</p>
      <table style="width:100%;border-collapse:collapse">
        <thead><tr><th style="padding:8px;text-align:left">Product</th><th>Qty</th><th style="text-align:right">Amount</th></tr></thead>
        <tbody>${itemRows(details.items)}</tbody>
      </table>
      <p style="font-size:20px"><strong>Total: Rs ${details.total.toLocaleString("en-IN")}</strong></p>
      ${customerBlock(details)}
      <p style="color:#6b7280;font-size:13px">A paid-order email will follow automatically after successful Razorpay payment capture and verification.</p>
    </div>`;
}

async function sendEmail({
  to,
  subject,
  html,
  idempotencyKey,
}: {
  to: string;
  subject: string;
  html: string;
  idempotencyKey: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ORDER_EMAIL_FROM;

  if (!apiKey || !from) {
    console.warn("Order email skipped: RESEND_API_KEY or ORDER_EMAIL_FROM is missing.");
    return false;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey,
    },
    body: JSON.stringify({ from, to: [to], subject, html }),
  });

  if (!response.ok) {
    throw new Error(`Email delivery failed: ${await response.text()}`);
  }

  return true;
}

export async function sendOrderEmails(details: OrderEmailDetails) {
  const adminEmail =
    process.env.ORDER_NOTIFICATION_EMAIL || "debuggerssquad@gmail.com";

  const results = await Promise.allSettled([
    sendEmail({
      to: details.customerEmail,
      subject: `Order ${details.orderNumber} confirmed`,
      html: orderHtml(details, false),
      idempotencyKey: `customer-${details.orderNumber}`,
    }),
    sendEmail({
      to: adminEmail,
      subject: `New order ${details.orderNumber} from ${details.customerName}`,
      html: orderHtml(details, true),
      idempotencyKey: `admin-${details.orderNumber}`,
    }),
  ]);

  for (const result of results) {
    if (result.status === "rejected") {
      console.error("Order email failed:", result.reason);
    }
  }
}

export async function sendCheckoutStartedEmail(details: CheckoutStartedEmailDetails) {
  const adminEmail =
    process.env.ORDER_NOTIFICATION_EMAIL || "debuggerssquad@gmail.com";

  try {
    const firstProductName =
      details.items.length === 1
        ? details.items[0].product.name
        : `${details.items.length} products`;

    return await sendEmail({
      to: adminEmail,
      subject: `${details.customerName} is trying to buy ${firstProductName}`,
      html: checkoutStartedHtml(details),
      idempotencyKey: `checkout-started-${details.orderNumber}`,
    });
  } catch (error) {
    console.error("Checkout started email failed:", error);
    throw error;
  }
}

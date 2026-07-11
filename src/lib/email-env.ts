const DEFAULT_NOTIFICATION_EMAIL = "debuggerssquad@gmail.com";

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function getNotificationEmail() {
  const cleaned = (process.env.ORDER_NOTIFICATION_EMAIL || "")
    .replace(/\s+/g, "")
    .replace(/^mailto:/i, "")
    .replace(/[;,]+$/g, "");

  return isEmail(cleaned) ? cleaned : DEFAULT_NOTIFICATION_EMAIL;
}

export function getSenderEmail() {
  return process.env.ORDER_EMAIL_FROM?.trim();
}

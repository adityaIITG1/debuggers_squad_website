export async function getShiprocketToken() {
  const response = await fetch("https://apiv2.shiprocket.in/v1/external/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: process.env.SHIPROCKET_EMAIL,
      password: process.env.SHIPROCKET_PASSWORD,
    }),
  });

  if (!response.ok) {
    throw new Error(`Shiprocket authentication failed: ${await response.text()}`);
  }

  const data = await response.json();
  return data.token;
}

export async function createShiprocketOrder(orderData: Record<string, unknown>, token: string) {
  const response = await fetch("https://apiv2.shiprocket.in/v1/external/orders/create/adhoc", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    throw new Error(`Shiprocket order creation failed: ${await response.text()}`);
  }

  return response.json();
}

export async function assignAWB(shipmentId: number, token: string) {
  const response = await fetch("https://apiv2.shiprocket.in/v1/external/courier/assign/awb", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      shipment_id: shipmentId,
    }),
  });

  if (!response.ok) {
     throw new Error(`Shiprocket AWB assignment failed: ${await response.text()}`);
  }

  return response.json();
}

export async function requestPickup(shipmentId: number, token: string) {
  const response = await fetch("https://apiv2.shiprocket.in/v1/external/courier/generate/pickup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      shipment_id: [shipmentId],
    }),
  });

  if (!response.ok) {
    throw new Error(`Shiprocket pickup request failed: ${await response.text()}`);
  }

  return response.json();
}

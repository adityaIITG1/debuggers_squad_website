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
    throw new Error("Failed to authenticate with Shiprocket");
  }

  const data = await response.json();
  return data.token;
}

export async function createShiprocketOrder(orderData: any, token: string) {
  const response = await fetch("https://apiv2.shiprocket.in/v1/external/orders/create/adhoc", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Shiprocket Create Order Error:", errorData);
    throw new Error("Failed to create Shiprocket order");
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
     console.error("Shiprocket Assign AWB Error:", await response.text());
     throw new Error("Failed to assign AWB");
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
    console.error("Shiprocket Pickup Error:", await response.text());
    throw new Error("Failed to request pickup");
  }

  return response.json();
}

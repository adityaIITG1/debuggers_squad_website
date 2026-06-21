import { getProduct, type Product } from "@/lib/product";

export const MAX_ITEM_QUANTITY = 10;

export type CartItem = {
  slug: Product["slug"];
  quantity: number;
};

export type PricedCartItem = CartItem & {
  product: Product;
  lineTotal: number;
  lineTotalInPaise: number;
};

export function sanitizeCartItems(value: unknown): CartItem[] {
  if (!Array.isArray(value)) return [];

  const quantities = new Map<Product["slug"], number>();

  for (const entry of value) {
    if (typeof entry !== "object" || entry === null) continue;

    const slug = "slug" in entry ? entry.slug : undefined;
    const rawQuantity = "quantity" in entry ? entry.quantity : undefined;
    const product = getProduct(slug);
    const quantity = Number(rawQuantity);

    if (!product || !Number.isInteger(quantity) || quantity < 1) continue;

    const current = quantities.get(product.slug) ?? 0;
    quantities.set(
      product.slug,
      Math.min(MAX_ITEM_QUANTITY, current + quantity)
    );
  }

  return Array.from(quantities, ([slug, quantity]) => ({ slug, quantity }));
}

export function priceCartItems(value: unknown): {
  items: PricedCartItem[];
  total: number;
  totalInPaise: number;
} {
  const items = sanitizeCartItems(value).map((item) => {
    const product = getProduct(item.slug)!;

    return {
      ...item,
      product,
      lineTotal: product.price * item.quantity,
      lineTotalInPaise: product.priceInPaise * item.quantity,
    };
  });

  return {
    items,
    total: items.reduce((sum, item) => sum + item.lineTotal, 0),
    totalInPaise: items.reduce((sum, item) => sum + item.lineTotalInPaise, 0),
  };
}

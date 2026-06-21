"use client";

import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/CartProvider";
import type { Product } from "@/lib/product";
import { cn } from "@/lib/utils";

export function AddToCartButton({
  slug,
  className,
  buyNow = false,
  label,
}: {
  slug: Product["slug"];
  className?: string;
  buyNow?: boolean;
  label?: string;
}) {
  const router = useRouter();
  const { addItem } = useCart();

  const handleClick = () => {
    addItem(slug);

    if (buyNow) {
      router.push("/checkout");
      return;
    }

    toast.success("Product added to cart.");
  };

  return (
    <Button
      type="button"
      size="lg"
      onClick={handleClick}
      className={cn("h-14 rounded-xl font-bold", className)}
    >
      <ShoppingCart className="size-4" />
      {label ?? (buyNow ? "Buy now" : "Add to cart")}
    </Button>
  );
}

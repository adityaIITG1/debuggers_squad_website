"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { useCart } from "@/components/cart/CartProvider";
import { MAX_ITEM_QUANTITY, priceCartItems } from "@/lib/cart";
import { cn } from "@/lib/utils";

export default function CartPage() {
  const { items, ready, setQuantity, removeItem } = useCart();
  const cart = priceCartItems(items);

  if (!ready) {
    return <div className="mx-auto max-w-5xl px-4 py-20">Loading cart…</div>;
  }

  if (cart.items.length === 0) {
    return (
      <div className="mx-auto flex min-h-[65vh] max-w-xl flex-col items-center justify-center px-4 text-center">
        <span className="grid size-16 place-items-center rounded-full bg-violet-100 text-[#673de6]">
          <ShoppingBag className="size-7" />
        </span>
        <h1 className="mt-6 text-3xl font-black text-[#2f1c6a]">Your cart is empty</h1>
        <p className="mt-3 text-slate-600">Add a product before proceeding to payment.</p>
        <Link
          href="/#products"
          className={cn(
            buttonVariants({ size: "lg" }),
            "mt-7 h-12 rounded-xl bg-[#673de6] px-6 font-bold text-white"
          )}
        >
          Shop products
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#fbfaff] px-4 py-9 text-[#2f1c6a] sm:px-6 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-black sm:text-4xl">Shopping cart</h1>
        <p className="mt-2 text-slate-600">Review products and quantities before checkout.</p>

        <div className="mt-9 grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="space-y-4">
            {cart.items.map(({ product, quantity, lineTotal }) => (
              <article
                key={product.slug}
                className="grid grid-cols-[72px_1fr] gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:flex sm:items-center sm:gap-4 sm:p-4"
              >
                <div className="relative size-[72px] shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:size-24">
                  <Image src={product.image} alt={product.name} fill className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="font-black">{product.name}</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    ₹{product.price.toLocaleString("en-IN")} each
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2 sm:mt-4 sm:gap-3">
                    <div className="flex items-center rounded-xl border border-slate-300">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label={`Decrease ${product.name} quantity`}
                        onClick={() => setQuantity(product.slug, quantity - 1)}
                      >
                        <Minus />
                      </Button>
                      <span className="w-10 text-center font-bold">{quantity}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        disabled={quantity >= MAX_ITEM_QUANTITY}
                        aria-label={`Increase ${product.name} quantity`}
                        onClick={() => setQuantity(product.slug, quantity + 1)}
                      >
                        <Plus />
                      </Button>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => removeItem(product.slug)}
                    >
                      <Trash2 />
                      Remove
                    </Button>
                  </div>
                </div>
                <p className="col-span-2 text-right font-black sm:col-auto">
                  ₹{lineTotal.toLocaleString("en-IN")}
                </p>
              </article>
            ))}
          </div>

          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black">Order summary</h2>
            <div className="mt-5 flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>₹{cart.total.toLocaleString("en-IN")}</span>
            </div>
            <div className="mt-3 flex justify-between text-slate-600">
              <span>Delivery</span>
              <span className="font-semibold text-emerald-700">Free</span>
            </div>
            <div className="mt-5 flex justify-between border-t border-slate-200 pt-5 text-xl font-black">
              <span>Total</span>
              <span>₹{cart.total.toLocaleString("en-IN")}</span>
            </div>
            <Link
              href="/checkout"
              className={cn(
                buttonVariants({ size: "lg" }),
                "mt-6 h-14 w-full rounded-xl bg-[#673de6] text-base font-bold text-white"
              )}
            >
              Proceed to checkout
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}

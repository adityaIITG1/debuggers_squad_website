"use client";

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AlertTriangle,
  CreditCard,
  LockKeyhole,
  Minus,
  PackageCheck,
  Plus,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getProduct } from "@/lib/product";
import { useCart } from "@/components/cart/CartProvider";
import { priceCartItems } from "@/lib/cart";

type RazorpaySuccessResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayFailureResponse = {
  error: { description: string };
};

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpaySuccessResponse) => Promise<void>;
  prefill: { name: string; email: string; contact: string };
  theme: { color: string };
  modal: {
    ondismiss: () => void;
    confirm_close: boolean;
  };
  retry: {
    enabled: boolean;
    max_count: number;
  };
};

type RazorpayOrderResponse = {
  key_id: string;
  order_id: string;
  order_number: string;
  amount: number;
  currency: string;
  error?: string;
};

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
      on: (
        event: "payment.failed",
        callback: (response: RazorpayFailureResponse) => void
      ) => void;
    };
  }
}

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  landmark: "",
};

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    items,
    ready,
    addItem,
    setQuantity,
    removeItem,
    clearCart,
  } = useCart();
  const [loading, setLoading] = useState(false);
  const [acceptedDisclaimer, setAcceptedDisclaimer] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const cart = priceCartItems(items);

  useEffect(() => {
    if (!ready || items.length > 0) return;
    const legacyProduct = getProduct(searchParams.get("product"));
    if (legacyProduct) addItem(legacyProduct.slug);
  }, [ready, items.length, searchParams, addItem]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handlePayment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (cart.items.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }
    const normalizedPhone = formData.phone.replace(/\D/g, "");
    if (normalizedPhone.length !== 10) {
      toast.error("Enter a valid 10-digit phone number.");
      return;
    }
    if (!/^\d{6}$/.test(formData.pincode)) {
      toast.error("Enter a valid 6-digit PIN code.");
      return;
    }
    if (!acceptedDisclaimer) {
      toast.error("Accept the product disclaimer to continue.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/payments/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          customerDetails: {
            ...formData,
            phone: normalizedPhone,
          },
        }),
      });
      const order = (await response.json()) as RazorpayOrderResponse;

      if (!response.ok) {
        throw new Error(order.error || "Could not start secure checkout.");
      }
      if (!order.key_id || !order.order_id) {
        throw new Error("Secure checkout configuration is incomplete.");
      }
      if (!window.Razorpay) {
        throw new Error("Secure checkout did not load. Refresh the page and try again.");
      }

      const options: RazorpayOptions = {
        key: order.key_id,
        amount: order.amount,
        currency: order.currency,
        name: "Debuggers Squad",
        description:
          cart.items.length === 1
            ? cart.items[0].product.fullName
            : `${cart.items.length} products from Debuggers Squad`,
        order_id: order.order_id,
        handler: async (payment) => {
          const toastId = toast.loading("Confirming your payment and order...");
          try {
            const verificationResponse = await fetch(
              "/api/payments/razorpay/verify",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  ...payment,
                  customerDetails: {
                    ...formData,
                    phone: normalizedPhone,
                  },
                  disclaimerAccepted: true,
                }),
              }
            );
            const verification = await verificationResponse.json();

            if (!verificationResponse.ok) {
              throw new Error(
                verification.error ||
                  "Payment was received, but order confirmation failed. Contact support."
              );
            }

            toast.success("Payment successful. Your order is confirmed.", {
              id: toastId,
            });
            clearCart();
            router.push(
              `/order-success?order_id=${encodeURIComponent(verification.order_number)}`
            );
          } catch (error: unknown) {
            toast.error(
              error instanceof Error
                ? error.message
                : "Order confirmation failed. Contact support.",
              { id: toastId }
            );
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: normalizedPhone,
        },
        theme: { color: "#673de6" },
        modal: {
          confirm_close: true,
          ondismiss: () => {
            toast.info("Payment was cancelled. Your order has not been charged.");
          },
        },
        retry: {
          enabled: true,
          max_count: 2,
        },
      };

      const checkout = new window.Razorpay(options);
      checkout.on("payment.failed", (failure) => {
        toast.error(`Payment failed: ${failure.error.description}`);
      });
      checkout.open();
    } catch (error: unknown) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!ready || (cart.items.length === 0 && getProduct(searchParams.get("product")))) {
    return <div className="mx-auto max-w-6xl px-4 py-20">Loading checkout…</div>;
  }

  if (cart.items.length === 0) {
    return (
      <div className="mx-auto flex min-h-[65vh] max-w-xl flex-col items-center justify-center px-4 text-center">
        <ShoppingCart className="size-12 text-[#673de6]" />
        <h1 className="mt-5 text-3xl font-black text-[#2f1c6a]">Your cart is empty</h1>
        <p className="mt-3 text-slate-600">Add a product before opening checkout.</p>
        <Link
          href="/#products"
          className="mt-7 rounded-xl bg-[#673de6] px-6 py-3 font-bold text-white"
        >
          Shop products
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#fbfaff] text-[#2f1c6a]">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <div className="mb-9">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#673de6]">
            Final step
          </p>
          <h1 className="mt-2 text-4xl font-black tracking-tight">Secure checkout</h1>
          <p className="mt-2 text-slate-600">
            Enter delivery details and complete payment through Razorpay.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr]">
          <form onSubmit={handlePayment} className="space-y-7">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <h2 className="text-xl font-bold">Contact and delivery</h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Field label="Full name" id="name">
                  <Input id="name" name="name" autoComplete="name" required value={formData.name} onChange={handleInputChange} />
                </Field>
                <Field label="Phone number" id="phone">
                  <Input id="phone" name="phone" type="tel" inputMode="numeric" autoComplete="tel" required value={formData.phone} onChange={handleInputChange} />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Email address" id="email">
                    <Input id="email" name="email" type="email" autoComplete="email" required value={formData.email} onChange={handleInputChange} />
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Field label="Full address" id="address">
                    <Input id="address" name="address" autoComplete="street-address" required value={formData.address} onChange={handleInputChange} />
                  </Field>
                </div>
                <Field label="City" id="city">
                  <Input id="city" name="city" autoComplete="address-level2" required value={formData.city} onChange={handleInputChange} />
                </Field>
                <Field label="State" id="state">
                  <Input id="state" name="state" autoComplete="address-level1" required value={formData.state} onChange={handleInputChange} />
                </Field>
                <Field label="PIN code" id="pincode">
                  <Input id="pincode" name="pincode" inputMode="numeric" autoComplete="postal-code" maxLength={6} required value={formData.pincode} onChange={handleInputChange} />
                </Field>
                <Field label="Landmark (optional)" id="landmark">
                  <Input id="landmark" name="landmark" value={formData.landmark} onChange={handleInputChange} />
                </Field>
              </div>
            </section>

            <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <div className="flex gap-3">
                <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-700" />
                <div>
                  <h2 className="font-bold text-amber-950">Educational-use acknowledgement</h2>
                  <p className="mt-2 text-sm leading-6 text-amber-900">
                    {cart.items
                      .map(({ product }) => product.disclaimer)
                      .join(" ")}
                  </p>
                  <label className="mt-4 flex cursor-pointer items-start gap-3 text-sm font-semibold text-amber-950">
                    <input
                      type="checkbox"
                      className="mt-0.5 size-4 accent-violet-700"
                      checked={acceptedDisclaimer}
                      onChange={(event) => setAcceptedDisclaimer(event.target.checked)}
                    />
                    I understand and accept this product-use disclaimer.
                  </label>
                </div>
              </div>
            </section>

            <div className="rounded-2xl border border-violet-200 bg-violet-50 p-4">
              <div className="flex items-center gap-3">
                <CreditCard className="size-5 text-[#673de6]" />
                <div>
                  <p className="font-bold text-[#2f1c6a]">Pay securely with Razorpay</p>
                  <p className="text-sm text-slate-600">
                    UPI, cards, netbanking and supported wallets
                  </p>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="h-14 w-full rounded-xl bg-[#673de6] text-base font-bold text-white shadow-lg shadow-violet-700/20 hover:bg-[#5630c9]"
            >
              <LockKeyhole className="size-4" />
              {loading
                ? "Opening Razorpay…"
                : `Pay ₹${cart.total.toLocaleString("en-IN")} with Razorpay`}
            </Button>
            <p className="-mt-4 text-center text-xs leading-5 text-slate-500">
              Payment details are processed securely by Razorpay and are not stored
              on this website.
            </p>
          </form>

          <aside>
            <Card className="sticky top-24 overflow-hidden border-slate-200 bg-white text-slate-950 shadow-sm">
              <CardHeader>
                <CardTitle>Your order</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {cart.items.map(({ product, quantity, lineTotal }) => (
                  <div
                    key={product.slug}
                    className="flex items-center gap-3 border-b border-slate-200 pb-4"
                  >
                    <div className="relative size-14 shrink-0 overflow-hidden rounded-lg">
                      <Image src={product.image} alt="" fill className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold">{product.name}</p>
                      <div className="mt-2 flex items-center gap-1">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon-xs"
                          aria-label={`Decrease ${product.name} quantity`}
                          onClick={() => setQuantity(product.slug, quantity - 1)}
                        >
                          <Minus />
                        </Button>
                        <span className="w-7 text-center text-sm font-bold">{quantity}</span>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon-xs"
                          aria-label={`Increase ${product.name} quantity`}
                          onClick={() => setQuantity(product.slug, quantity + 1)}
                        >
                          <Plus />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-xs"
                          className="ml-1 text-red-600"
                          aria-label={`Remove ${product.name}`}
                          onClick={() => removeItem(product.slug)}
                        >
                          <Trash2 />
                        </Button>
                      </div>
                    </div>
                    <span className="font-semibold">
                      ₹{lineTotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between">
                  <span className="text-slate-600">Delivery</span>
                  <span className="font-semibold text-emerald-700">Free</span>
                </div>
                <div className="flex items-start gap-3 rounded-xl bg-[#f0ebff] p-4 text-sm text-[#2f1c6a]">
                  <PackageCheck className="mt-0.5 size-5 shrink-0 text-[#673de6]" />
                  <span>
                    Shiprocket pickup will be requested automatically after successful
                    payment verification.
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t border-slate-200 bg-slate-50 py-5">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-black text-[#673de6]">
                  ₹{cart.total.toLocaleString("en-IN")}
                </span>
              </CardFooter>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-4 py-20">Loading checkout…</div>}>
      <CheckoutContent />
    </Suspense>
  );
}

function Field({
  label,
  id,
  children,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-slate-800">
        {label}
      </Label>
      {children}
    </div>
  );
}

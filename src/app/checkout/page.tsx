"use client";

import { Suspense, useState } from "react";
import Image from "next/image";
import Script from "next/script";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertTriangle, LockKeyhole, PackageCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getProduct, NEUROPULSE_PRODUCT, PRODUCTS, type Product } from "@/lib/product";

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
  const [loading, setLoading] = useState(false);
  const [acceptedDisclaimer, setAcceptedDisclaimer] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [selectedSlug, setSelectedSlug] = useState<Product["slug"] | null>(null);
  const product =
    getProduct(selectedSlug ?? searchParams.get("product")) ?? NEUROPULSE_PRODUCT;
  const isRazorpayTestMode =
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.startsWith("rzp_test_") ?? false;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const selectProduct = (nextProduct: Product) => {
    setSelectedSlug(nextProduct.slug);
    setAcceptedDisclaimer(false);
    window.history.replaceState(null, "", `/checkout?product=${nextProduct.slug}`);
  };

  const handlePayment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
        body: JSON.stringify({ productSlug: product.slug }),
      });
      const order = await response.json();

      if (!response.ok) {
        throw new Error(order.error || "Could not start secure checkout.");
      }
      if (!window.Razorpay) {
        throw new Error("Secure checkout did not load. Refresh the page and try again.");
      }

      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
        amount: order.amount,
        currency: order.currency,
        name: "Debuggers Squad",
        description: product.fullName,
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
            Enter the delivery details for your {product.name} kit.
          </p>
          <div className="mt-6 grid max-w-2xl gap-3 sm:grid-cols-2">
            {PRODUCTS.map((item) => (
              <button
                key={item.slug}
                type="button"
                onClick={() => selectProduct(item)}
                className={`rounded-2xl border p-4 text-left transition-all ${
                  product.slug === item.slug
                    ? "border-[#673de6] bg-[#f0ebff] ring-2 ring-[#673de6]/15"
                    : "border-slate-200 bg-white hover:border-[#b9a8ee]"
                }`}
              >
                <span className="block text-sm font-black">{item.name}</span>
                <span className="mt-1 block text-xs text-slate-600">{item.shortDescription}</span>
                <span className="mt-2 block font-black text-[#673de6]">
                  ₹{item.price.toLocaleString("en-IN")}
                </span>
              </button>
            ))}
          </div>
          {isRazorpayTestMode && (
            <div className="mt-5 max-w-2xl rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
              <strong>Razorpay Test Mode:</strong> This checkout cannot accept real
              UPI, QR, card, or bank payments. Replace all three Razorpay variables
              with a matching <code>rzp_live_</code> key pair in the hosting
              environment after account activation.
            </div>
          )}
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
                    {product.disclaimer}
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

            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="h-14 w-full rounded-xl bg-[#673de6] text-base font-bold text-white shadow-lg shadow-violet-700/20 hover:bg-[#5630c9]"
            >
              <LockKeyhole className="size-4" />
              {loading
                ? "Opening secure payment..."
                : `Pay ₹${product.price.toLocaleString("en-IN")}`}
            </Button>
          </form>

          <aside>
            <Card className="sticky top-24 overflow-hidden border-slate-200 bg-white text-slate-950 shadow-sm">
              <div className="relative aspect-[4/3]">
                <Image
                  src={product.image}
                  alt={product.fullName}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>{product.fullName}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex justify-between border-b border-slate-200 pb-5">
                  <span className="text-slate-600">Quantity</span>
                  <span className="font-semibold">1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Delivery</span>
                  <span className="font-semibold text-emerald-700">Free</span>
                </div>
                <div className="flex items-start gap-3 rounded-xl bg-[#f0ebff] p-4 text-sm text-[#2f1c6a]">
                  <PackageCheck className="mt-0.5 size-5 shrink-0 text-[#673de6]" />
                  <span>{product.checkoutNote}</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t border-slate-200 bg-slate-50 py-5">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-black text-[#673de6]">
                  ₹{product.price.toLocaleString("en-IN")}
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

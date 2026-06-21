import type { Metadata } from "next";
import Image from "next/image";
import {
  Activity,
  AlertTriangle,
  BookOpen,
  Box,
  Check,
  GraduationCap,
  Laptop,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { NEUROPULSE_PRODUCT } from "@/lib/product";
import { cn } from "@/lib/utils";
import { AddToCartButton } from "@/components/cart/AddToCartButton";

export const metadata: Metadata = {
  title: "Buy NeuroPulseAI Single-Channel EMG Kit | Debuggers Squad",
  description:
    "Order the NeuroPulseAI single-channel EMG education and research kit for ₹2,999 with secure Razorpay checkout and delivery across India.",
};

const includedItems = [
  "NeuroPulseAI single-channel EMG device",
  "Muscle Patchy EMG sensor",
  "USB extender and electrode wires",
  "12 disposable gel electrodes",
  "6 alcohol swabs",
  "EMG Plotter software on USB drive",
  "Printed quick-start guide",
];

const useCases = [
  {
    icon: GraduationCap,
    title: "Student projects",
    text: "A ready-to-use platform for biosignal, embedded systems, and biomedical projects.",
  },
  {
    icon: BookOpen,
    title: "Research learning",
    text: "Observe and visualize surface muscle activity during controlled demonstrations.",
  },
  {
    icon: Activity,
    title: "Physiotherapy education",
    text: "Demonstrate muscle activation feedback in supervised learning environments.",
  },
];

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-[#fbfaff] text-[#2f1c6a]">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-16">
          <div className="space-y-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm">
              <Image
                src="/images/neuropulseai/product-hero.jpeg"
                alt="NeuroPulseAI portable single-channel EMG kit and included accessories"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  src: "/images/neuropulseai/sensor-placement.jpeg",
                  alt: "EMG sensor placed on a forearm",
                },
                {
                  src: "/images/neuropulseai/emg-software-live.jpeg",
                  alt: "NeuroPulseAI live EMG software displaying a muscle signal",
                },
                {
                  src: "/images/neuropulseai/product-overview.jpeg",
                  alt: "NeuroPulseAI product overview",
                },
              ].map((image) => (
                <div
                  key={image.src}
                  className="relative aspect-[4/3] overflow-hidden rounded-xl border border-slate-200 bg-slate-50"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 1024px) 33vw, 18vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="mb-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-[#f0ebff] px-3 py-1 text-xs font-semibold text-[#673de6]">
                Single-channel EMG
              </span>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                In stock
              </span>
            </div>

            <p className="mb-2 text-sm font-bold uppercase tracking-[0.22em] text-[#673de6]">
              Debuggers Squad
            </p>
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
              NeuroPulse<span className="text-[#673de6]">AI</span>
            </h1>
            <p className="mt-3 text-xl font-medium text-slate-600">
              Portable EMG muscle-activity feedback kit
            </p>

            <div className="mt-7 flex items-end gap-3">
              <span className="text-4xl font-black">
                ₹{NEUROPULSE_PRODUCT.price.toLocaleString("en-IN")}
              </span>
              <span className="pb-1 text-sm text-slate-500">inclusive of taxes</span>
            </div>
            <p className="mt-2 text-sm font-medium text-emerald-700">
              Free prepaid delivery across India
            </p>

            <p className="mt-7 max-w-xl leading-7 text-slate-600">
              Connect the device to a Windows laptop, place the included electrodes,
              and view live muscle signals through the supplied NeuroPulseAI plotting
              software. Built for students, labs, educators, and innovation demos.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                "Live EMG graph visualization",
                "USB-powered laptop connection",
                "Compact, reusable project kit",
                "Software and setup guide included",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm font-medium">
                  <span className="grid size-5 place-items-center rounded-full bg-[#e8e0ff] text-[#673de6]">
                    <Check className="size-3.5" />
                  </span>
                  {feature}
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <AddToCartButton
                  slug="neuropulseai"
                  className="w-full bg-[#673de6] text-white hover:bg-[#5630c9]"
                />
                <AddToCartButton
                  slug="neuropulseai"
                  buyNow
                  label={`Buy now for ₹${NEUROPULSE_PRODUCT.price.toLocaleString("en-IN")}`}
                  className="w-full bg-[#2f1c6a] text-white hover:bg-[#241650]"
                />
              </div>
              <a
                href="https://wa.me/919170397988?text=I%20want%20to%20buy%20NeuroPulseAI%20for%20a%20lab%20or%20bulk%20order."
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "h-12 w-full rounded-xl border-slate-300 bg-white text-slate-800 hover:bg-slate-50"
                )}
              >
                Ask about lab or bulk orders
              </a>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 border-t border-slate-200 pt-6 text-sm text-slate-600">
              <span className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-[#673de6]" />
                Secure Razorpay payment
              </span>
              <span className="flex items-center gap-2">
                <Truck className="size-4 text-[#673de6]" />
                India-wide shipping
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl bg-slate-950 p-8 text-white">
            <Box className="size-9 text-cyan-400" />
            <h2 className="mt-5 text-3xl font-bold">Everything in the box</h2>
            <ul className="mt-7 space-y-4">
              {includedItems.map((item) => (
                <li key={item} className="flex gap-3 text-slate-300">
                  <Check className="mt-0.5 size-5 shrink-0 text-cyan-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {useCases.map(({ icon: Icon, title, text }) => (
              <article
                key={title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span className="grid size-11 place-items-center rounded-2xl bg-[#f0ebff] text-[#673de6]">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#673de6]">
              Simple setup
            </p>
            <h2 className="mt-3 text-3xl font-black">From box to live signal</h2>
            <ol className="mt-8 space-y-6">
              {[
                ["Install", "Copy the supplied NeuroPulseAI software from the USB drive."],
                ["Connect", "Attach the device to your Windows laptop through USB."],
                ["Observe", "Place electrodes correctly and view the live EMG graph."],
              ].map(([title, text], index) => (
                <li key={title} className="flex gap-4">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#673de6] font-bold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-bold">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="relative aspect-[2/3] max-h-[620px] overflow-hidden rounded-3xl border border-slate-200">
            <Image
              src="/images/neuropulseai/quick-start-guide.jpeg"
              alt="NeuroPulseAI quick-start guide"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-950">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-700" />
          <p className="text-sm leading-6">
            <strong>Educational prototype:</strong> NeuroPulseAI is intended for
            education, research, and innovation demonstrations. It is not a certified
            medical or diagnostic device and must not be used to diagnose, treat, or
            cure any condition.
          </p>
        </div>
      </section>

      <section className="bg-[#673de6] px-4 py-14 text-center text-white">
        <Laptop className="mx-auto size-9 text-cyan-300" />
        <h2 className="mt-4 text-3xl font-black">Start exploring muscle signals</h2>
        <p className="mx-auto mt-3 max-w-xl text-[#ddd4ff]">
          One complete NeuroPulseAI kit, software included, delivered to your door.
        </p>
        <AddToCartButton
          slug="neuropulseai"
          buyNow
          label="Buy NeuroPulseAI"
          className="mt-7 bg-white px-7 text-[#673de6] hover:bg-[#f5f2ff]"
        />
      </section>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Activity, AlertTriangle, ArrowRight, Laptop, Play, Usb } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const gallery = [
  {
    src: "/images/neuropulseai/emg-software-live.jpeg",
    label: "Live EMG software output",
    span: "md:col-span-2",
    ratio: "aspect-video",
  },
  {
    src: "/images/neuropulseai/gallery/forearm-live-demo.jpeg",
    label: "Real electrode demonstration",
    span: "",
    ratio: "aspect-square",
  },
  {
    src: "/images/neuropulseai/gallery/workshop-demo-portrait.jpeg",
    label: "Hands-on workshop testing",
    span: "",
    ratio: "aspect-square",
  },
];

export default function DemoPage() {
  return (
    <div className="bg-[#fbfaff] text-[#2f1c6a]">
      <section className="premium-grid">
        <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-28">
          <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-[#eee9ff] text-[#673de6]">
            <Activity className="size-7" />
          </span>
          <p className="mt-6 text-sm font-black uppercase tracking-[0.2em] text-[#673de6]">
            Real hardware. Real signals.
          </p>
          <h1 className="mt-4 text-5xl font-black tracking-[-0.045em] sm:text-6xl">
            NeuroPulseAI in action
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#66598a]">
            See the complete workflow—from electrode placement and USB connection to
            real-time muscle activity on the NeuroPulseAI plotting dashboard.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="relative aspect-video overflow-hidden rounded-[30px] border-8 border-white bg-black shadow-2xl shadow-violet-900/15">
            <Image
              src="/images/neuropulseai/emg-software-live.jpeg"
              alt="Live NeuroPulseAI EMG software graph responding to hand movement"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#673de6]">
              The signal journey
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.035em]">
              Movement becomes visible data
            </h2>
            <div className="mt-8 space-y-6">
              {[
                { icon: Activity, title: "Sense", text: "Surface electrodes capture changes associated with muscle activation." },
                { icon: Usb, title: "Connect", text: "The portable kit sends the signal to a Windows laptop over USB." },
                { icon: Laptop, title: "Visualize", text: "The supplied software displays the incoming waveform in real time." },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#eee9ff] text-[#673de6]">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-black">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-[#6b5e8d]">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f0ebff] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#673de6]">
              Demonstration gallery
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight">Used in real environments</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {gallery.map((item) => (
              <article
                key={item.src}
                className={cn(
                  "group relative overflow-hidden rounded-[26px] border-4 border-white bg-white shadow-xl",
                  item.span,
                  item.ratio
                )}
              >
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  sizes="(max-width: 768px) 100vw, 66vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#24134f]/90 to-transparent p-5 pt-16">
                  <p className="font-black text-white">{item.label}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <div className="flex gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-700" />
          <p>
            Images and demonstrations are for educational, research, and prototype
            validation purposes. NeuroPulseAI is not a certified medical or diagnostic device.
          </p>
        </div>
      </section>

      <section className="bg-[#673de6] px-4 py-16 text-center text-white">
        <Play className="mx-auto size-8 fill-current" />
        <h2 className="mt-5 text-4xl font-black">Want a guided demonstration?</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-[#ddd4ff]">
          Talk to Debuggers Squad about student, college, lab, or innovation showcase use.
        </p>
        <Link
          href="/contact"
          className={cn(
            buttonVariants({ size: "lg" }),
            "mt-8 h-14 rounded-xl bg-white px-8 font-black text-[#673de6] hover:bg-[#f5f2ff]"
          )}
        >
          Book a demo
          <ArrowRight className="size-4" />
        </Link>
      </section>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  BarChart3,
  BookOpen,
  Check,
  ChevronRight,
  CircleCheck,
  GraduationCap,
  HeartPulse,
  Laptop,
  Microscope,
  PackageCheck,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  Usb,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NEUROPULSE_PRODUCT } from "@/lib/product";

const benefits = [
  {
    icon: Activity,
    title: "Live muscle signals",
    text: "Watch surface EMG activity appear in real time through the included plotting dashboard.",
  },
  {
    icon: Usb,
    title: "Simple USB setup",
    text: "Connect the kit to a Windows laptop without expensive laboratory infrastructure.",
  },
  {
    icon: BarChart3,
    title: "Clear visual feedback",
    text: "Turn complex biosignals into an understandable graph for learning and demonstrations.",
  },
  {
    icon: GraduationCap,
    title: "Built for learning",
    text: "Ideal for student projects, research exploration, workshops, and innovation showcases.",
  },
];

const audiences = [
  { icon: HeartPulse, label: "Physiotherapy learning" },
  { icon: Microscope, label: "Research labs" },
  { icon: BookOpen, label: "Medical colleges" },
  { icon: GraduationCap, label: "Student innovation" },
];

const included = [
  "NeuroPulseAI single-channel EMG device",
  "Muscle Patchy sensor",
  "USB extender and electrode wires",
  "12 disposable gel electrodes",
  "6 alcohol swabs",
  "EMG Plotter software",
  "Printed quick-start guide",
];

export default function Home() {
  return (
    <div className="overflow-hidden bg-[#fbfaff] text-[#2f1c6a]">
      <section className="premium-grid relative">
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#eee8ff] to-transparent" />
        <div className="relative mx-auto grid min-h-[720px] max-w-7xl items-center gap-14 px-4 py-16 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:py-20">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d7ccf7] bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#673de6] shadow-sm">
              <Sparkles className="size-3.5" />
              Affordable biosignal innovation
            </div>
            <h1 className="mt-7 max-w-2xl text-5xl font-black leading-[1.03] tracking-[-0.045em] sm:text-6xl lg:text-[68px]">
              See muscle activity.
              <span className="block text-[#673de6]">Understand every signal.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-[#5b4d7e]">
              NeuroPulseAI is a portable single-channel EMG kit that makes real-time
              muscle signal visualization accessible for education, research, and
              supervised rehabilitation learning.
            </p>

            <div className="mt-8 space-y-3">
              {[
                "Complete hardware, sensor, electrodes, and software",
                "Ready for student projects and lab demonstrations",
                "Free prepaid delivery across India",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm font-bold text-[#403267]">
                  <span className="grid size-6 place-items-center rounded-full bg-[#d9f7eb] text-[#008c69]">
                    <Check className="size-3.5 stroke-[3]" />
                  </span>
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/product"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-14 rounded-xl bg-[#673de6] px-8 text-base font-black text-white shadow-xl shadow-violet-700/20 hover:bg-[#5630c9]"
                )}
              >
                Get NeuroPulseAI
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/demo"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "h-14 rounded-xl border-[#673de6] bg-white/70 px-7 text-base font-black text-[#673de6] hover:bg-[#f2edff]"
                )}
              >
                <Play className="size-4 fill-current" />
                Watch it work
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-bold text-[#6c5f8d]">
              <span className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-[#00a67e]" />
                Secure Razorpay checkout
              </span>
              <span className="flex items-center gap-2">
                <PackageCheck className="size-4 text-[#00a67e]" />
                Support after purchase
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-8 top-12 size-36 rounded-full bg-[#cbb8ff] blur-3xl" />
            <div className="absolute -right-8 bottom-10 size-44 rounded-full bg-[#ffb4df] blur-3xl" />
            <div className="premium-shadow relative rounded-[32px] border border-white/80 bg-gradient-to-br from-[#7650ef] via-[#9a70f5] to-[#e889cc] p-3 sm:p-5">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-white">
                <Image
                  src="/images/neuropulseai/product-hero.jpeg"
                  alt="NeuroPulseAI portable EMG kit"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-7 left-5 right-5 flex items-center justify-between rounded-2xl border border-white/80 bg-white/95 p-4 shadow-xl backdrop-blur sm:left-10 sm:right-10 sm:p-5">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.15em] text-[#8a7aa9]">
                    Complete kit
                  </p>
                  <p className="mt-1 text-2xl font-black text-[#2f1c6a]">
                    ₹{NEUROPULSE_PRODUCT.price.toLocaleString("en-IN")}
                  </p>
                </div>
                <Link
                  href="/checkout"
                  className="flex items-center gap-2 rounded-xl bg-[#2f1c6a] px-5 py-3 text-sm font-black text-white hover:bg-[#432a89]"
                >
                  Buy now
                  <ChevronRight className="size-4" />
                </Link>
              </div>
            </div>

            <div className="absolute -left-5 top-10 hidden rounded-2xl border border-[#e3dcf7] bg-white p-4 shadow-xl xl:block">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-[#e9fff7] text-[#00a67e]">
                  <Activity className="size-5" />
                </span>
                <div>
                  <p className="text-xs font-bold text-[#897ba7]">Signal status</p>
                  <p className="font-black text-[#2f1c6a]">EMG live</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#e4ddf5] bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-4 py-7 sm:px-6 md:grid-cols-4 lg:px-8">
          {audiences.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center justify-center gap-3 px-3 py-4 text-center">
              <Icon className="size-5 text-[#673de6]" />
              <span className="text-sm font-black text-[#574777]">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#673de6]">
            Powerful, without the complexity
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.035em] sm:text-5xl">
            Everything you need to explore EMG
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#66598a]">
            A thoughtfully assembled system that takes muscle-signal learning out of
            expensive laboratories and puts it on your desk.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="group rounded-3xl border border-[#e5def7] bg-white p-7 shadow-[0_18px_50px_-35px_rgba(47,28,106,0.5)] transition-all hover:-translate-y-1 hover:border-[#c7b7f4]"
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-[#eee9ff] text-[#673de6] transition-colors group-hover:bg-[#673de6] group-hover:text-white">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-6 text-xl font-black">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#6b5e8c]">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#f0ebff] py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[30px] border-8 border-white shadow-2xl shadow-violet-900/15">
              <Image
                src="/images/neuropulseai/gallery/forearm-live-demo.jpeg"
                alt="NeuroPulseAI electrode demonstration"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-2 max-w-[260px] rounded-2xl bg-[#2f1c6a] p-5 text-white shadow-xl sm:right-8">
              <div className="flex gap-1 text-[#f8cc5d]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="size-4 fill-current" />
                ))}
              </div>
              <p className="mt-3 text-sm font-bold leading-6">
                Demonstrated in real educational and innovation environments.
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#673de6]">
              Three steps to a live graph
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.035em] sm:text-5xl">
              Set up in minutes. Learn by doing.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#66598a]">
              NeuroPulseAI includes a guided workflow for first-time users, from
              connecting the hardware to observing muscle activation.
            </p>

            <div className="mt-9 space-y-7">
              {[
                ["01", "Install the software", "Copy the supplied NeuroPulseAI folder and launch the EMG Plotter."],
                ["02", "Connect the kit", "Attach the device to your Windows laptop using the USB connection."],
                ["03", "Place and observe", "Apply the electrodes correctly, move the muscle, and watch the live graph."],
              ].map(([number, title, text]) => (
                <div key={number} className="flex gap-5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#673de6] text-sm font-black text-white">
                    {number}
                  </span>
                  <div>
                    <h3 className="text-lg font-black">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-[#6a5d8a]">{text}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/demo" className="mt-9 inline-flex items-center gap-2 font-black text-[#673de6] hover:gap-3">
              Explore the demonstration
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid overflow-hidden rounded-[34px] border border-[#d9cef6] bg-white shadow-[0_35px_90px_-55px_rgba(47,28,106,0.55)] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="bg-[#2f1c6a] p-8 text-white sm:p-12 lg:p-14">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#cbbdff]">
              One kit. No confusing plans.
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight">NeuroPulseAI</h2>
            <p className="mt-3 text-lg text-[#d9d1ef]">Single-channel EMG learning system</p>
            <div className="mt-9 flex items-end gap-3">
              <span className="text-5xl font-black">₹2,999</span>
              <span className="pb-2 text-sm font-bold text-[#c8bfe0]">one-time</span>
            </div>
            <p className="mt-2 text-sm font-bold text-[#76e7c4]">Free prepaid delivery in India</p>
            <Link
              href="/checkout"
              className={cn(
                buttonVariants({ size: "lg" }),
                "mt-9 h-14 w-full rounded-xl bg-[#fc5185] text-base font-black text-white hover:bg-[#ea3e75]"
              )}
            >
              Order the complete kit
              <ArrowRight className="size-4" />
            </Link>
            <p className="mt-4 text-center text-xs font-medium text-[#bfb3da]">
              Secure payment powered by Razorpay
            </p>
          </div>

          <div className="p-8 sm:p-12 lg:p-14">
            <h3 className="text-2xl font-black">Everything included</h3>
            <div className="mt-7 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {included.map((item) => (
                <div key={item} className="flex gap-3 text-sm font-bold text-[#544578]">
                  <CircleCheck className="mt-0.5 size-5 shrink-0 text-[#00a67e]" />
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-9 rounded-2xl bg-[#f5f2ff] p-5">
              <div className="flex items-start gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-[#673de6] shadow-sm">
                  <Laptop className="size-5" />
                </span>
                <div>
                  <h4 className="font-black">Software and guide included</h4>
                  <p className="mt-1 text-sm leading-6 text-[#6b5e8d]">
                    Start with the supplied quick-start workflow and keep the software
                    backup on the included USB drive.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#e2daf5] bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#673de6]">
                Built by Debuggers Squad
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.035em] sm:text-5xl">
                Technology with a clear purpose
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-[#66598a]">
                We design practical, affordable tools that connect engineering,
                healthcare learning, neuroscience, and real-world social impact.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {["Human-centered", "Affordable", "Demonstrable", "Research-minded"].map((item) => (
                  <span key={item} className="rounded-full bg-[#f0ebff] px-4 py-2 text-xs font-black text-[#673de6]">
                    {item}
                  </span>
                ))}
              </div>
              <Link href="/about" className="mt-9 inline-flex items-center gap-2 font-black text-[#673de6]">
                Meet the team
                <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[26px] border-4 border-white shadow-xl">
                <Image
                  src="/images/neuropulseai/founder-aditya.jpeg"
                  alt="Aditya Kumar Singh, founder of Debuggers Squad"
                  fill
                  sizes="(max-width: 1024px) 50vw, 23vw"
                  className="object-cover"
                />
              </div>
              <div className="relative mt-10 aspect-[3/4] overflow-hidden rounded-[26px] border-4 border-white shadow-xl">
                <Image
                  src="/images/neuropulseai/cofounder-prakriti.jpeg"
                  alt="Prakriti Jaiswal, co-founder of Debuggers Squad"
                  fill
                  sizes="(max-width: 1024px) 50vw, 23vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#673de6] px-4 py-20 text-center text-white sm:px-6">
        <div className="mx-auto max-w-3xl">
          <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-white/15">
            <Activity className="size-7" />
          </span>
          <h2 className="mt-6 text-4xl font-black tracking-[-0.035em] sm:text-5xl">
            Ready to see signals differently?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#ddd4ff]">
            Bring hands-on EMG learning to your project, classroom, lab, or innovation demo.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/product"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-14 rounded-xl bg-white px-8 text-base font-black text-[#673de6] hover:bg-[#f5f2ff]"
              )}
            >
              Explore NeuroPulseAI
            </Link>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "h-14 rounded-xl border-white/50 bg-transparent px-8 text-base font-black text-white hover:bg-white/10 hover:text-white"
              )}
            >
              Talk to our team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

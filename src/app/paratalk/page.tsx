import type { Metadata } from "next";
import Image from "next/image";
import {
  AlertTriangle,
  ArrowRight,
  BriefcaseBusiness,
  Check,
  ChessKnight,
  Code2,
  Eye,
  Gamepad2,
  Keyboard,
  Laptop,
  MessageSquareText,
  PhoneCall,
  Play,
  ShieldCheck,
  Sparkles,
  Volume2,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { ProductFaq } from "@/components/commerce/ProductFaq";

export const metadata: Metadata = {
  title: "ParaTalk Eye-Blink Communication & Control Kit | Debuggers Squad",
  description:
    "ParaTalk is an EOG-based eye-blink communication and computer-control kit for accessible communication, games, learning, coding, and digital participation.",
};

const capabilities = [
  {
    icon: MessageSquareText,
    title: "Speak and communicate",
    text: "Select useful phrases and trigger voice output through intentional eye blinks.",
  },
  {
    icon: PhoneCall,
    title: "Send alerts",
    text: "Use blink-based selections for caregiver messages and configured communication actions.",
  },
  {
    icon: ChessKnight,
    title: "Play chess",
    text: "Map an eye blink to the spacebar and make selections in accessible chess workflows.",
  },
  {
    icon: Gamepad2,
    title: "Play simple games",
    text: "Interact with compatible one-button games using deliberate blink control.",
  },
  {
    icon: Code2,
    title: "Explore coding",
    text: "Use accessible controls with AI coding tools to experiment with simple websites and digital projects.",
  },
  {
    icon: Laptop,
    title: "Control computer tasks",
    text: "Navigate supported ParaTalk modes for communication, learning, productivity, and entertainment.",
  },
];

const kitContents = [
  "Main ParaTalk eye-blink interface device",
  "Electrode cable set for EOG placement",
  "20 disposable gel electrodes",
  "20 alcohol swabs",
  "USB laptop connection cable",
  "Pen drive loaded with the ParaTalk folder",
  "ParaTalk software and setup files",
  "Printed guide manual and quick-start instructions",
];

export default function ParaTalkPage() {
  return (
    <div className="overflow-hidden bg-[#f7fbff] text-[#14213d]">
      <section className="relative border-b border-[#cfe3f7] bg-gradient-to-br from-[#eef7ff] via-white to-[#eeeaff]">
        <div className="absolute inset-0 premium-grid opacity-50" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:gap-14 sm:px-6 sm:py-16 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:py-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#b9dff6] bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#0768b8] shadow-sm">
              <Sparkles className="size-3.5" />
              Assistive innovation by Debuggers Squad
            </div>
            <h1 className="mt-6 text-[42px] font-black leading-[1.03] tracking-[-0.05em] sm:mt-7 sm:text-6xl lg:text-7xl">
              Para<span className="text-[#12a8e8]">Talk</span>
            </h1>
            <p className="mt-3 text-xl font-black uppercase tracking-[0.18em] text-[#63738c]">
              EOG based system
            </p>
            <h2 className="mt-7 max-w-xl text-3xl font-black leading-tight sm:text-4xl">
              Communicate and control a computer with an intentional eye blink.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#53647d]">
              ParaTalk converts detected eye-blink activity into accessible computer
              input. It is designed to support communication, learning, games, chess,
              creativity, and greater digital participation for people with significant
              movement or speech limitations.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                "Direct USB connection to a Windows laptop",
                "Blink-to-spacebar control",
                "Voice-enabled communication modes",
                "Software and complete setup kit included",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3 text-sm font-bold">
                  <span className="grid size-6 place-items-center rounded-full bg-[#d9f8ef] text-[#008b68]">
                    <Check className="size-3.5 stroke-[3]" />
                  </span>
                  {feature}
                </div>
              ))}
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <AddToCartButton
                slug="paratalk"
                buyNow
                label="Buy ParaTalk — ₹7,999"
                className="bg-[#0869bd] px-8 text-base font-black text-white shadow-xl shadow-blue-800/20 hover:bg-[#07599f]"
              />
              <a
                href="https://youtube.com/shorts/JLQoj-U82aU"
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "h-14 rounded-xl border-[#0869bd] bg-white px-7 text-base font-black text-[#0869bd] hover:bg-[#eaf5ff]"
                )}
              >
                <Play className="size-4 fill-current" />
                Watch demo
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-8 top-8 size-40 rounded-full bg-[#a8e8ff] blur-3xl" />
            <div className="absolute -right-8 bottom-5 size-44 rounded-full bg-[#cfc2ff] blur-3xl" />
            <div className="relative rounded-[34px] border border-white bg-white/80 p-4 shadow-2xl shadow-blue-900/15 backdrop-blur">
              <div className="relative aspect-[4/3] max-h-[720px] overflow-hidden rounded-[26px] bg-white">
                <Image
                  src="/images/paratalk/paratalk-audience-demo.jpeg"
                  alt="ParaTalk device being demonstrated to an audience at Evolothon"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 left-8 right-8 flex items-center justify-between rounded-2xl bg-[#073d73] p-5 text-white shadow-xl">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[#a8dcff]">
                    Complete assistive kit
                  </p>
                  <p className="mt-1 text-2xl font-black">₹7,999</p>
                </div>
                <span className="rounded-full bg-[#28d3aa] px-4 py-2 text-xs font-black text-[#073d73]">
                  USB READY
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#0878c8]">
            Accessible digital participation
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
            One blink can open many possibilities
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#5b6c84]">
            ParaTalk is built for people with permanent or partial motor and speech
            disabilities, their caregivers, educators, accessibility labs, and innovators.
          </p>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="rounded-3xl border border-[#d8e8f6] bg-white p-7 shadow-[0_20px_55px_-40px_rgba(6,73,125,0.55)] transition-transform hover:-translate-y-1"
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-[#e8f5ff] text-[#0878c8]">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-6 text-xl font-black">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#61728a]">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#0878c8]">
              Product overview
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em]">
              See the full ParaTalk system at a glance
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#61728a]">
              The complete product poster explains its communication modes, eye-blink
              workflow, accessibility use cases, electrode placement, and everything
              supplied in the box.
            </p>
            <a
              href="/images/paratalk/paratalk-product-poster.jpeg"
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "mt-8 h-13 rounded-xl border-[#0878c8] bg-white px-7 font-black text-[#0878c8] hover:bg-[#edf8ff]"
              )}
            >
              View full-size product poster
              <ArrowRight className="size-4" />
            </a>
          </div>
          <a
            href="/images/paratalk/paratalk-product-poster.jpeg"
            target="_blank"
            rel="noreferrer"
            className="relative aspect-[5/7] max-h-[760px] overflow-hidden rounded-[28px] border-8 border-white bg-white shadow-2xl shadow-blue-900/15"
          >
            <Image
              src="/images/paratalk/paratalk-product-poster.jpeg"
              alt="ParaTalk professional product poster showing features, workflow, use cases, and kit contents"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-contain"
            />
          </a>
        </div>
      </section>

      <section className="bg-[#eaf5ff] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
            <ParaTalkDashboard />
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#0878c8]">
                ParaTalk interface
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
                Communication that adapts to the user
              </h2>
              <p className="mt-5 text-lg leading-8 text-[#596b83]">
                The interface organizes common communication needs, emergency and
                caregiver actions, games, coding tools, chess, and learning modes into
                large selectable cards.
              </p>
              <div className="mt-8 space-y-5">
                {[
                  [Volume2, "Voice output", "Selected phrases can be spoken aloud."],
                  [Keyboard, "Spacebar control", "A configured blink acts as a selection input."],
                  [Eye, "EOG signal detection", "Electrodes observe eye-area electrical activity."],
                ].map(([Icon, title, text]) => {
                  const FeatureIcon = Icon as typeof Eye;
                  return (
                    <div key={String(title)} className="flex gap-4">
                      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-[#0878c8] shadow-sm">
                        <FeatureIcon className="size-5" />
                      </span>
                      <div>
                        <h3 className="font-black">{String(title)}</h3>
                        <p className="mt-1 text-sm leading-6 text-[#61728a]">{String(text)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#0878c8]">
              How it works
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em]">
              From eye movement to computer action
            </h2>
            <ol className="mt-9 space-y-7">
              {[
                ["01", "Place the electrodes", "Apply the EOG electrodes near the eye and forehead according to the guide."],
                ["02", "Connect ParaTalk", "Plug the main device directly into a compatible Windows laptop through USB."],
                ["03", "Launch the software", "Open the ParaTalk folder supplied on the pen drive and start the interface."],
                ["04", "Blink to select", "An intentional detected blink can trigger the configured spacebar or selection action."],
              ].map(([number, title, text]) => (
                <li key={number} className="flex gap-5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#0878c8] text-sm font-black text-white">
                    {number}
                  </span>
                  <div>
                    <h3 className="text-lg font-black">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-[#61728a]">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-[32px] bg-[#073d73] p-8 text-white shadow-2xl shadow-blue-900/20 sm:p-10">
            <BriefcaseBusiness className="size-9 text-[#4fe1bd]" />
            <h2 className="mt-5 text-3xl font-black">Participation, creativity, and opportunity</h2>
            <p className="mt-4 leading-7 text-[#cde6f8]">
              Accessible controls can help users participate in digital learning,
              chess, one-button games, communication, and creative computer work.
              With suitable training and additional accessibility tools, users can also
              explore AI-assisted coding and simple web projects.
            </p>
            <div className="mt-7 rounded-2xl border border-white/15 bg-white/10 p-5">
              <div className="flex gap-3">
                <ChessKnight className="mt-0.5 size-5 shrink-0 text-[#4fe1bd]" />
                <p className="text-sm leading-6 text-[#e2f2ff]">
                  ParaTalk promotes the principle that chess and other cognitive
                  activities should be accessible based on skill and thinking—not
                  limited by a person’s ability to use a conventional mouse or keyboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-amber-200 bg-[#120d0a] py-20 text-white lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.88fr_1.12fr] lg:px-8">
          <div className="rounded-[30px] border border-amber-400/30 bg-gradient-to-br from-[#21170c] to-[#0d0907] p-7 shadow-2xl shadow-black/30 sm:p-9">
            <div className="flex items-center justify-between">
              <span className="grid size-14 place-items-center rounded-2xl bg-amber-400 text-[#211408]">
                <ChessKnight className="size-7" />
              </span>
              <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-amber-300">
                Proposal for evaluation
              </span>
            </div>
            <p className="mt-8 text-sm font-black uppercase tracking-[0.2em] text-amber-400">
              ParaTalk Inclusive Chess Vision
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
              Let chess skill—not physical movement—decide the game.
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#d9cbbd]">
              ParaTalk can enable a player with significant motor limitations to
              navigate and select moves on a digital chessboard using intentional
              eye blinks.
            </p>
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-amber-400">
              Message for FIDE and chess organisations
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              A pathway toward more accessible competitive chess
            </h2>
            <p className="mt-6 leading-8 text-[#d9cbbd]">
              We invite the International Chess Federation (FIDE), national chess
              federations, accessibility experts, and fair-play teams to evaluate
              ParaTalk through controlled demonstrations and technical trials. With
              appropriate testing, standardisation, anti-cheating safeguards, and
              tournament approval, eye-blink control could help skilled players who
              cannot use conventional pieces, a mouse, or a keyboard compete more
              independently.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                [Eye, "Eye-blink input", "Intentional EOG signals control move selection."],
                [ShieldCheck, "Fair-play review", "Designed for controlled evaluation and safeguards."],
                [ChessKnight, "Skill-first access", "Chess ability remains the deciding factor."],
              ].map(([Icon, title, text]) => {
                const FeatureIcon = Icon as typeof Eye;
                return (
                  <article
                    key={String(title)}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5"
                  >
                    <FeatureIcon className="size-5 text-amber-400" />
                    <h3 className="mt-4 font-black">{String(title)}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#bfae9e]">
                      {String(text)}
                    </p>
                  </article>
                );
              })}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="mailto:debuggerssquad@gmail.com?subject=ParaTalk%20Inclusive%20Chess%20Demonstration"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-13 rounded-xl bg-amber-400 px-7 font-black text-[#211408] hover:bg-amber-300"
                )}
              >
                Request a demonstration
              </a>
              <a
                href="https://youtube.com/shorts/JLQoj-U82aU"
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "h-13 rounded-xl border-amber-300/50 bg-transparent px-7 font-black text-amber-300 hover:bg-amber-300/10 hover:text-amber-200"
                )}
              >
                <Play className="size-4 fill-current" />
                Watch ParaTalk demo
              </a>
            </div>

            <p className="mt-5 text-xs leading-5 text-[#978777]">
              ParaTalk is not currently approved by or affiliated with FIDE. This is
              an independent accessibility proposal for technical evaluation.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#0878c8]">
              Complete box
            </p>
            <h2 className="mt-4 text-4xl font-black">Everything needed to get started</h2>
            <p className="mt-5 text-lg leading-8 text-[#61728a]">
              ParaTalk arrives as a complete project and assistive-technology kit with
              hardware, consumables, software, and setup documentation.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {kitContents.map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl border border-[#d9e9f6] bg-[#f8fcff] p-4 text-sm font-bold">
                <Check className="mt-0.5 size-5 shrink-0 text-[#00a67e]" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProductFaq />

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <div className="flex gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-700" />
          <p>
            <strong>Assistive prototype disclaimer:</strong> ParaTalk is intended for
            educational, accessibility, and innovation use. It is not a certified
            medical, diagnostic, emergency, or life-support device. It should be
            configured and tested with caregiver or trained supervision where appropriate.
          </p>
        </div>
      </section>

      <section className="bg-[#0869bd] px-4 py-20 text-center text-white">
        <ShieldCheck className="mx-auto size-9 text-[#65e4c4]" />
        <h2 className="mt-5 text-4xl font-black sm:text-5xl">Make computer access more inclusive</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#d6ecff]">
          Get the complete ParaTalk kit with hardware, electrodes, consumables,
          software-loaded pen drive, and guide manual.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <AddToCartButton
            slug="paratalk"
            buyNow
            label="Order ParaTalk — ₹7,999"
            className="bg-white px-8 text-base font-black text-[#0869bd] hover:bg-[#edf8ff]"
          />
          <a
            href="https://youtube.com/shorts/JLQoj-U82aU"
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              "h-14 rounded-xl border-white/50 bg-transparent px-8 text-base font-black text-white hover:bg-white/10 hover:text-white"
            )}
          >
            Watch the demo
          </a>
        </div>
      </section>
    </div>
  );
}

function ParaTalkDashboard() {
  const cards = [
    ["Hello", "Social", MessageSquareText],
    ["Water", "Hydration", Volume2],
    ["Food", "Nutrition", Volume2],
    ["Play game", "Entertainment", Gamepad2],
    ["Call caregiver", "Emergency", PhoneCall],
    ["AI coding", "Creativity", Code2],
  ] as const;

  return (
    <div className="rounded-[30px] border border-[#bcdcf2] bg-[#f5faff] p-4 shadow-2xl shadow-blue-900/10 sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-2xl font-black text-[#0878c8]">ParaTalk</p>
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#718299]">
            EOG based system
          </p>
        </div>
        <span className="rounded-full bg-[#d9f8ef] px-3 py-1.5 text-xs font-black text-[#007d5e]">
          EOG CONNECTED
        </span>
      </div>
      <div className="mt-5 rounded-2xl bg-[#075a91] p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#a9d7f1]">
              Current selection
            </p>
            <p className="mt-1 text-3xl font-black">Hello</p>
          </div>
          <span className="rounded-full bg-[#0c4774] px-3 py-2 text-xs font-black">
            Confidence: 98%
          </span>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {cards.map(([title, category, Icon], index) => (
          <div
            key={title}
            className={cn(
              "rounded-2xl border bg-white p-4",
              index === 0 ? "border-[#168fe0] ring-2 ring-[#168fe0]/30" : "border-[#d8e8f5]"
            )}
          >
            <Icon className="size-5 text-[#0878c8]" />
            <p className="mt-3 text-[9px] font-black uppercase tracking-[0.14em] text-[#1681c9]">
              {category}
            </p>
            <p className="mt-1 text-sm font-black">{title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

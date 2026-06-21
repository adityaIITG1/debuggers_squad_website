import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BrainCircuit,
  Download,
  ExternalLink,
  FlaskConical,
  Mail,
  MessageCircle,
  Newspaper,
  Rocket,
  TrendingUp,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PitchDeckViewer } from "@/components/media/PitchDeckViewer";

export const metadata: Metadata = {
  title: "Investor & Media Kit | Debuggers Squad",
  description:
    "Mission, products, traction, market direction, founder profiles, and downloadable pitch deck for Debuggers Squad.",
};

const traction = [
  {
    icon: Award,
    metric: "National winner",
    title: "HackDiwas 3.0",
    text: "Recognised for technical execution and prototype impact.",
  },
  {
    icon: Award,
    metric: "Best Solution",
    title: "TRAE ReVibe",
    text: "Awarded for an impactful solution at a one-day hackathon.",
  },
  {
    icon: Award,
    metric: "2nd Runner-Up",
    title: "IIT (BHU) Jagriti ’26",
    text: "Serve-Smart Hackathon recognition for innovation and social impact.",
  },
  {
    icon: TrendingUp,
    metric: "2.4M+",
    title: "Social views",
    text: "Large audience reach for biosignal and accessible-technology content.",
  },
  {
    icon: FlaskConical,
    metric: "Working hardware",
    title: "Tested prototypes",
    text: "EMG and EOG systems demonstrated using real signals and devices.",
  },
  {
    icon: Newspaper,
    metric: "Public proof",
    title: "Demos and media",
    text: "Workshop demonstrations, competition evidence, and press coverage.",
  },
] as const;

const direction = [
  {
    step: "01",
    title: "Education kits",
    text: "Affordable hands-on biosignal products for students, educators, and innovators.",
  },
  {
    step: "02",
    title: "College and lab adoption",
    text: "Workshop, project-lab, accessibility-lab, and supervised demonstration deployments.",
  },
  {
    step: "03",
    title: "Assistive technology",
    text: "Eye-blink communication and computer-control pathways through ParaTalk.",
  },
  {
    step: "04",
    title: "Future certified pathway",
    text: "Long-term clinical research, quality systems, regulatory evaluation, and certification where appropriate.",
  },
] as const;

const founders = [
  {
    name: "Aditya Kumar Singh",
    role: "Founder",
    image: "/images/neuropulseai/founder-aditya.jpeg",
    education:
      "Pursuing an online BSc (Honours) in Data Science and Artificial Intelligence through IIT Guwahati and a BTech in CSE (AI & ML) under AKTU.",
    focus:
      "Neurotechnology, biosignals, IoT, assistive systems, product engineering, and neuroscience-led innovation.",
    email: "iitianadityakumarsingh@gmail.com",
    linkedin:
      "https://www.linkedin.com/in/aditya-kumar-singh-39245525b",
  },
  {
    name: "Prakriti Jaiswal",
    role: "Co-founder",
    image: "/images/neuropulseai/cofounder-prakriti-2026.jpeg",
    education:
      "Studied BCom with a focus on Accounts and Finance at the University of Allahabad.",
    focus:
      "Operations, finance, presentation, outreach, brand development, and neuroscience-focused innovation.",
    email: "jaiswalprakriti26@gmail.com",
    linkedin: "https://www.linkedin.com/in/prakriti-jaiswal-a67291402",
  },
] as const;

export default function MediaKitPage() {
  return (
    <div className="overflow-hidden bg-[#fbfaff] text-[#2f1c6a]">
      <section className="premium-grid relative border-b border-[#ddd4f5]">
        <div className="absolute left-1/4 top-0 size-80 rounded-full bg-[#dcd0ff] blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-28">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#673de6]">
              Investor & media kit
            </p>
            <h1 className="mt-5 max-w-4xl text-5xl font-black tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              Affordable neurotechnology
              <span className="block text-[#673de6]">built for India.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#66598a]">
              Debuggers Squad develops practical EMG, EOG, IoT, and assistive
              technology products that move advanced learning from expensive
              laboratories into classrooms, project teams, and real-world innovation.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="/api/media-kit/pitch-deck"
                download
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-14 rounded-xl bg-[#673de6] px-8 text-base font-black text-white shadow-xl shadow-violet-700/20 hover:bg-[#5630c9]"
                )}
              >
                <Download className="size-4" />
                Download pitch deck (PDF)
              </a>
              <a
                href="https://wa.me/918604684988?text=Hello%20Debuggers%20Squad%2C%20I%20would%20like%20to%20discuss%20your%20investor%20and%20media%20kit."
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "h-14 rounded-xl border-[#673de6] bg-white/70 px-7 text-base font-black text-[#673de6]"
                )}
              >
                <MessageCircle className="size-4" />
                Message on WhatsApp
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 rounded-full bg-[#9d7aff]/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-[32px] border-8 border-white bg-white shadow-2xl shadow-violet-950/15">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/neuropulseai/gallery/team-founders.jpeg"
                  alt="Debuggers Squad founders presenting their work"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-3 border-t border-[#e7e0f8] bg-white">
                {[
                  ["2", "Products"],
                  ["3+", "Awards"],
                  ["2.4M+", "Views"],
                ].map(([value, label]) => (
                  <div key={label} className="p-4 text-center">
                    <p className="text-xl font-black text-[#673de6]">{value}</p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-wide text-[#796b99]">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <PitchDeckViewer />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl bg-[#2f1c6a] p-8 text-white sm:p-10">
            <BrainCircuit className="size-9 text-[#bdaaff]" />
            <p className="mt-6 text-sm font-black uppercase tracking-[0.2em] text-[#bdaaff]">
              Our mission
            </p>
            <h2 className="mt-3 text-4xl font-black">
              Make neurotechnology affordable, understandable, and useful.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#dcd3f4]">
              We aim to reduce the gap between advanced biosignal systems and the
              students, labs, educators, and accessibility communities that can use
              them to learn, experiment, and build.
            </p>
          </article>

          <article className="rounded-3xl border border-[#ded5f5] bg-white p-8 sm:p-10">
            <Rocket className="size-9 text-[#673de6]" />
            <p className="mt-6 text-sm font-black uppercase tracking-[0.2em] text-[#673de6]">
              Products
            </p>
            <div className="mt-5 space-y-6">
              <div>
                <h2 className="text-2xl font-black">NeuroPulseAI</h2>
                <p className="mt-2 leading-7 text-[#66598a]">
                  A portable single-channel EMG kit for muscle-signal education,
                  projects, supervised learning, and research exploration.
                </p>
              </div>
              <div className="border-t border-[#e7e0f8] pt-6">
                <h2 className="text-2xl font-black">ParaTalk</h2>
                <p className="mt-2 leading-7 text-[#66598a]">
                  An EOG eye-blink communication and computer-control system for
                  accessible interaction, learning, games, and inclusive chess.
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="border-y border-[#ded5f5] bg-[#f0ebff] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#673de6]">
              Traction
            </p>
            <h2 className="mt-4 text-4xl font-black sm:text-5xl">
              Evidence beyond the idea stage
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#66598a]">
              Awards, working prototypes, demonstrations, social reach, and public
              evidence show sustained execution.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {traction.map(({ icon: Icon, metric, title, text }) => (
              <article
                key={title}
                className="rounded-3xl border border-[#ddd3f5] bg-white p-7 shadow-[0_20px_55px_-40px_rgba(47,28,106,0.55)]"
              >
                <div className="flex items-center justify-between gap-4">
                  <Icon className="size-6 text-[#673de6]" />
                  <span className="rounded-full bg-[#eee9ff] px-3 py-1 text-xs font-black text-[#673de6]">
                    {metric}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-black">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#66598a]">{text}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/#proof-trust"
              className="inline-flex items-center gap-2 font-bold text-[#673de6] hover:underline"
            >
              View certificates and proof
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#673de6]">
              Market direction
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
              A responsible path from learning tools to deeper impact
            </h2>
            <p className="mt-5 leading-8 text-[#66598a]">
              Today’s products are educational and assistive prototypes. Any future
              medical application would require dedicated clinical research,
              regulatory review, quality systems, and certification.
            </p>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2">
            {direction.map(({ step, title, text }) => (
              <li
                key={step}
                className="rounded-3xl border border-[#e1d9f5] bg-white p-7"
              >
                <span className="text-sm font-black text-[#9b83e9]">{step}</span>
                <h3 className="mt-4 text-xl font-black">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#66598a]">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-[#19102f] py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#bdaaff]">
              Founding team
            </p>
            <h2 className="mt-4 text-4xl font-black sm:text-5xl">
              National hackathon winners and prototype builders
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#cfc4e8]">
              Both founders are deeply interested in neuroscience and focused on
              translating ambitious ideas into practical, quality-driven prototypes.
            </p>
          </div>

          <div className="mt-12 grid gap-7 lg:grid-cols-2">
            {founders.map((founder) => (
              <article
                key={founder.name}
                className="grid overflow-hidden rounded-[30px] border border-white/10 bg-white/5 sm:grid-cols-[190px_1fr]"
              >
                <div className="relative min-h-64 sm:min-h-full">
                  <Image
                    src={founder.image}
                    alt={`${founder.name}, ${founder.role}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 190px"
                    className="object-cover"
                  />
                </div>
                <div className="p-7">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#bdaaff]">
                    {founder.role}
                  </p>
                  <h3 className="mt-2 text-2xl font-black">{founder.name}</h3>
                  <p className="mt-4 text-sm leading-6 text-[#d0c6e6]">
                    {founder.education}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[#a99cbe]">
                    {founder.focus}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={`mailto:${founder.email}`}
                      className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold text-[#2f1c6a]"
                    >
                      <Mail className="size-4" />
                      Email
                    </a>
                    <a
                      href={founder.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-white/25 px-4 py-2 text-sm font-bold text-white hover:bg-white/10"
                    >
                      LinkedIn
                      <ExternalLink className="size-4" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-3xl border border-[#8c73dc]/30 bg-[#2f1c6a] p-7 sm:flex-row">
            <div>
              <h3 className="text-2xl font-black">Investor, media, or partnership enquiry?</h3>
              <p className="mt-2 text-[#d5caed]">
                Contact the founders or message Debuggers Squad directly.
              </p>
            </div>
            <a
              href="https://wa.me/918604684988"
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-13 shrink-0 rounded-xl bg-white px-7 font-black text-[#2f1c6a] hover:bg-[#f2edff]"
              )}
            >
              <MessageCircle className="size-4" />
              WhatsApp Debuggers Squad
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

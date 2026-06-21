import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  HeartHandshake,
  Lightbulb,
  Target,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const founders = [
  {
    name: "Aditya Kumar Singh",
    role: "Founder · IoT Developer",
    image: "/images/neuropulseai/founder-aditya.jpeg",
    imagePosition: "object-center",
    description:
      "Aditya is an undergraduate pursuing Data Science, AI, and CSE (AI & ML). He builds affordable neurotechnology, biosignal, IoT, and assistive systems using Python, data analysis, prompt engineering, and AI tools.",
    skills: ["Python", "Data Analysis", "Prompt Engineering", "AI", "IoT"],
  },
  {
    name: "Prakriti Jaiswal",
    role: "Co-founder",
    image: "/images/neuropulseai/cofounder-prakriti-2026.jpeg",
    imagePosition: "object-center",
    description:
      "Prakriti is an undergraduate pursuing BCom in Accounts and Finance. She leads operations, presentation, outreach, and brand development while applying data analysis, Python, prompt engineering, and AI tools.",
    skills: ["Data Analysis", "Python", "Prompt Engineering", "AI", "Finance"],
  },
];

export default function AboutPage() {
  return (
    <div className="bg-[#fbfaff] text-[#2f1c6a]">
      <section className="premium-grid relative overflow-hidden">
        <div className="absolute left-1/4 top-0 size-72 rounded-full bg-[#ded2ff] blur-3xl" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-28">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#673de6]">
            Our story
          </p>
          <h1 className="mt-5 text-5xl font-black tracking-[-0.045em] sm:text-6xl">
            We build technology
            <span className="block text-[#673de6]">with a human purpose.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-[#66598a]">
            Debuggers Squad is an innovation team creating affordable, practical,
            human-centered solutions across healthcare learning, neuroscience,
            education, IoT, and assistive technology.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              icon: Lightbulb,
              title: "Build",
              text: "Transform useful ideas into working hardware and software prototypes.",
            },
            {
              icon: BrainCircuit,
              title: "Innovate",
              text: "Make biosignal and assistive technologies simpler and more accessible.",
            },
            {
              icon: HeartHandshake,
              title: "Impact",
              text: "Focus engineering effort on meaningful educational and social outcomes.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="rounded-3xl border border-[#e4dcf7] bg-white p-8 shadow-[0_20px_55px_-40px_rgba(47,28,106,0.55)]"
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-[#eee9ff] text-[#673de6]">
                <Icon className="size-5" />
              </span>
              <h2 className="mt-6 text-2xl font-black">{title}</h2>
              <p className="mt-3 leading-7 text-[#6b5e8c]">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#f0ebff] py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#673de6]">
              The people behind the work
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.035em] sm:text-5xl">
              Meet the founders
            </h2>
            <p className="mt-4 text-lg text-[#66598a]">
              The minds driving Debuggers Squad forward.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-2">
            {founders.map((founder) => (
              <article
                key={founder.name}
                className="overflow-hidden rounded-[24px] border border-[#ddd3f5] bg-white shadow-[0_24px_65px_-48px_rgba(47,28,106,0.6)]"
              >
                <div className="relative h-[300px] overflow-hidden bg-[#e8e1fa] sm:h-[330px] lg:h-[350px]">
                  <Image
                    src={founder.image}
                    alt={`${founder.name}, ${founder.role}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 480px"
                    className={`object-cover ${founder.imagePosition}`}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#2f1c6a]/55 to-transparent" />
                </div>
                <div className="p-6 sm:p-7">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#673de6]">
                    {founder.role}
                  </p>
                  <h3 className="mt-2 text-2xl font-black tracking-tight">{founder.name}</h3>
                  <p className="mt-4 text-sm leading-6 text-[#675a88]">{founder.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {founder.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-[#f0ebff] px-3 py-1.5 text-xs font-bold text-[#673de6]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
        <div>
          <span className="grid size-12 place-items-center rounded-2xl bg-[#eee9ff] text-[#673de6]">
            <Target className="size-5" />
          </span>
          <h2 className="mt-6 text-4xl font-black tracking-[-0.035em]">Our direction</h2>
          <p className="mt-5 text-lg leading-8 text-[#66598a]">
            We aim to bridge the gap between expensive laboratory systems and
            real-world learning by creating low-cost EMG, EOG, IoT, assistive, and
            rehabilitation-oriented project kits.
          </p>
          <Link
            href="/product"
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-8 h-13 rounded-xl bg-[#673de6] px-7 font-black text-white hover:bg-[#5630c9]"
            )}
          >
            Explore NeuroPulseAI
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="relative aspect-video overflow-hidden rounded-[28px] border-8 border-white shadow-2xl shadow-violet-900/15">
          <Image
            src="/images/neuropulseai/emg-software-live.jpeg"
            alt="NeuroPulseAI live EMG plotting software displaying muscle activity"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </section>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  BriefcaseBusiness,
  ExternalLink,
  HeartHandshake,
  Lightbulb,
  Mail,
  Sparkles,
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
    email: "iitianadityakumarsingh@gmail.com",
    linkedin: "https://www.linkedin.com/in/aditya-kumar-singh-39245525b",
    accent: "from-[#673de6] via-[#875cf0] to-[#d946ef]",
    softAccent: "bg-[#f0ebff] text-[#673de6]",
  },
  {
    name: "Prakriti Jaiswal",
    role: "Co-founder",
    image: "/images/neuropulseai/cofounder-prakriti-2026.jpeg",
    imagePosition: "object-center",
    description:
      "Prakriti is an undergraduate pursuing BCom in Accounts and Finance. She leads operations, presentation, outreach, and brand development while applying data analysis, Python, prompt engineering, and AI tools.",
    skills: ["Data Analysis", "Python", "Prompt Engineering", "AI", "Finance"],
    email: "jaiswalprakriti26@gmail.com",
    linkedin: "https://www.linkedin.com/in/prakriti-jaiswal-a67291402",
    accent: "from-[#0878c8] via-[#12a8e8] to-[#28d3aa]",
    softAccent: "bg-[#e9f8ff] text-[#0878c8]",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-[#fbfaff] text-[#2f1c6a]">
      <section className="premium-grid relative overflow-hidden">
        <div className="absolute left-1/4 top-0 size-72 rounded-full bg-[#ded2ff] blur-3xl" />
        <div className="relative mx-auto max-w-5xl px-4 py-14 text-center sm:px-6 sm:py-20 lg:px-8 lg:py-28">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#673de6]">
            Our story
          </p>
          <h1 className="mt-5 text-[40px] font-black leading-[1.06] tracking-[-0.045em] sm:text-6xl">
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

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
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
            {founders.map((founder, index) => (
              <article
                key={founder.name}
                className="group relative overflow-hidden rounded-[26px] border border-white/80 bg-white shadow-[0_28px_75px_-46px_rgba(47,28,106,0.52)] ring-1 ring-[#ddd3f5]/80"
              >
                <div className={`h-1.5 bg-gradient-to-r ${founder.accent}`} />
                <div className="relative h-[285px] overflow-hidden bg-[#e8e1fa] sm:h-[315px] lg:h-[330px]">
                  <Image
                    src={founder.image}
                    alt={`${founder.name}, ${founder.role}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 480px"
                    className={`object-cover transition-transform duration-700 group-hover:scale-[1.025] ${founder.imagePosition}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#17102f]/70 via-transparent to-white/5" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                    <span className="rounded-full border border-white/25 bg-white/90 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-[#2f1c6a] shadow-lg backdrop-blur">
                      {founder.role}
                    </span>
                    <span className="grid size-9 place-items-center rounded-full border border-white/25 bg-[#2f1c6a]/85 text-xs font-black text-white backdrop-blur">
                      0{index + 1}
                    </span>
                  </div>
                </div>
                <div className="relative p-6 sm:p-7">
                  <div className={`absolute right-5 top-5 grid size-9 place-items-center rounded-xl ${founder.softAccent}`}>
                    <Sparkles className="size-4" />
                  </div>
                  <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#8b70d8]">
                    Building for impact
                  </p>
                  <h3 className="mt-2 pr-12 text-2xl font-black tracking-tight">{founder.name}</h3>
                  <p className="mt-4 text-sm leading-6 text-[#675a88]">{founder.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {founder.skills.map((skill) => (
                      <span
                        key={skill}
                        className={`rounded-full px-3 py-1.5 text-[11px] font-bold ${founder.softAccent}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-3 border-t border-[#eee8f9] pt-5">
                    <a
                      href={`mailto:${founder.email}`}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2f1c6a] px-4 py-2.5 text-xs font-black text-white shadow-sm hover:bg-[#432a89]"
                    >
                      <Mail className="size-3.5" />
                      Email
                    </a>
                    <a
                      href={founder.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#d4c8f2] bg-[#faf8ff] px-4 py-2.5 text-xs font-black text-[#5630c9] hover:bg-[#f0ebff]"
                    >
                      <BriefcaseBusiness className="size-3.5" />
                      LinkedIn
                      <ExternalLink className="size-3" />
                    </a>
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

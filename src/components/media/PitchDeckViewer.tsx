"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Expand,
  Pause,
  Play,
  Presentation,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";

const slides = [
  {
    src: "/images/pitch-deck/slide-01-overview.jpeg",
    title: "NeuroPulseAI Overview",
  },
  {
    src: "/images/pitch-deck/slide-02-problem.jpeg",
    title: "Problem Statement",
  },
  {
    src: "/images/pitch-deck/slide-03-technical-approach.jpeg",
    title: "Technical Approach",
  },
  {
    src: "/images/pitch-deck/slide-04-impact-benefits.jpeg",
    title: "Impact and Benefits",
  },
  {
    src: "/images/pitch-deck/slide-05-feasibility.jpeg",
    title: "Feasibility and Viability",
  },
  {
    src: "/images/pitch-deck/slide-06-testing-validation.jpeg",
    title: "Prototype Testing and Validation",
  },
  {
    src: "/images/pitch-deck/slide-07-research-references.jpeg",
    title: "Research and References",
  },
  {
    src: "/images/pitch-deck/slide-08-validation-support.jpeg",
    title: "Expert and Institutional Support",
  },
  {
    src: "/images/pitch-deck/slide-09-market-business-model.jpeg",
    title: "Market Scalability and Business Model",
  },
  {
    src: "/images/pitch-deck/slide-10-roadmap-ask.jpeg",
    title: "Roadmap and Ask",
  },
] as const;

const pageVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    rotateY: direction > 0 ? -18 : 18,
    x: direction > 0 ? 80 : -80,
    scale: 0.97,
    transformOrigin: direction > 0 ? "left center" : "right center",
  }),
  center: {
    opacity: 1,
    rotateY: 0,
    x: 0,
    scale: 1,
  },
  exit: (direction: number) => ({
    opacity: 0,
    rotateY: direction > 0 ? 18 : -18,
    x: direction > 0 ? -80 : 80,
    scale: 0.97,
    transformOrigin: direction > 0 ? "right center" : "left center",
  }),
};

export function PitchDeckViewer() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [playing, setPlaying] = useState(false);
  const reduceMotion = useReducedMotion();

  const goTo = useCallback(
    (nextIndex: number) => {
      const normalized = (nextIndex + slides.length) % slides.length;
      setDirection(normalized >= index ? 1 : -1);
      setIndex(normalized);
    },
    [index]
  );

  const previous = useCallback(() => {
    setDirection(-1);
    setIndex((current) => (current - 1 + slides.length) % slides.length);
  }, []);

  const next = useCallback(() => {
    setDirection(1);
    setIndex((current) => (current + 1) % slides.length);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") previous();
      if (event.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [next, previous]);

  useEffect(() => {
    if (!playing || reduceMotion) return;
    const timer = window.setInterval(next, 5500);
    return () => window.clearInterval(timer);
  }, [playing, reduceMotion, next]);

  const slide = slides[index];

  return (
    <section className="border-y border-[#ded5f5] bg-[#160d34] py-16 text-white lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-3 text-[#bba8ff]">
              <Presentation className="size-5" />
              <p className="text-sm font-black uppercase tracking-[0.2em]">
                Interactive pitch deck
              </p>
            </div>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
              Turn through the NeuroPulseAI story
            </h2>
            <p className="mt-4 max-w-3xl leading-7 text-[#cec2e7]">
              Explore the problem, technical approach, validation, market direction,
              and roadmap. Use the arrow keys or controls to navigate.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setPlaying((current) => !current)}
              className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              aria-label={playing ? "Pause pitch deck" : "Play pitch deck automatically"}
            >
              {playing ? <Pause /> : <Play />}
              {playing ? "Pause" : "Auto play"}
            </Button>
            <a
              href={slide.src}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-white/25 bg-white/5 px-2.5 text-sm font-medium text-white hover:bg-white/10"
            >
              <Expand className="size-4" />
              Full size
            </a>
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-[28px] border border-white/15 bg-black/25 p-2 shadow-2xl shadow-black/35 sm:p-4">
          <div
            className="relative aspect-video overflow-hidden rounded-[20px] bg-white [perspective:1800px]"
            aria-live="polite"
          >
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={slide.src}
                custom={direction}
                variants={reduceMotion ? undefined : pageVariants}
                initial={reduceMotion ? { opacity: 0 } : "enter"}
                animate={reduceMotion ? { opacity: 1 } : "center"}
                exit={reduceMotion ? { opacity: 0 } : "exit"}
                transition={{
                  duration: reduceMotion ? 0.15 : 0.58,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute inset-0 [backface-visibility:hidden] [transform-style:preserve-3d]"
              >
                <Image
                  src={slide.src}
                  alt={`Pitch deck slide ${index + 1}: ${slide.title}`}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 1280px) 100vw, 1200px"
                  className="object-contain"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/12 to-transparent" />
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              onClick={previous}
              aria-label="Previous pitch deck slide"
              className="absolute left-3 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-[#160d34]/75 text-white shadow-lg backdrop-blur transition hover:scale-105 hover:bg-[#2f1c6a] sm:left-5"
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next pitch deck slide"
              className="absolute right-3 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-[#160d34]/75 text-white shadow-lg backdrop-blur transition hover:scale-105 hover:bg-[#2f1c6a] sm:right-5"
            >
              <ChevronRight />
            </button>

            <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/30 bg-[#160d34]/80 px-4 py-2 text-xs font-bold text-white backdrop-blur sm:bottom-5">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span className="h-px w-8 bg-white/40" />
              <span>{String(slides.length).padStart(2, "0")}</span>
            </div>
          </div>
        </div>

        <div className="mt-5 flex gap-3 overflow-x-auto pb-3">
          {slides.map((item, slideIndex) => (
            <button
              key={item.src}
              type="button"
              onClick={() => goTo(slideIndex)}
              aria-label={`Open slide ${slideIndex + 1}: ${item.title}`}
              aria-current={slideIndex === index ? "true" : undefined}
              className={`group relative aspect-video w-36 shrink-0 overflow-hidden rounded-xl border-2 bg-white transition sm:w-44 ${
                slideIndex === index
                  ? "border-[#a78bfa] ring-4 ring-[#8b5cf6]/20"
                  : "border-white/15 opacity-65 hover:border-white/40 hover:opacity-100"
              }`}
            >
              <Image
                src={item.src}
                alt=""
                fill
                sizes="176px"
                className="object-cover"
              />
              <span className="absolute bottom-1.5 left-1.5 rounded-md bg-[#160d34]/85 px-2 py-1 text-[10px] font-black text-white">
                {String(slideIndex + 1).padStart(2, "0")}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-5 flex flex-col justify-between gap-3 border-t border-white/10 pt-5 text-sm sm:flex-row sm:items-center">
          <p className="font-bold text-white">{slide.title}</p>
          <p className="text-[#a99cbe]">
            Prototype and future-pathway material; not a certified medical-device claim.
          </p>
        </div>
      </div>
    </section>
  );
}

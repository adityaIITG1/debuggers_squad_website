"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export function AnimatedBrand({ onClick }: { onClick?: () => void }) {
  const reduceMotion = useReducedMotion();

  return (
    <Link
      href="/"
      className="group flex min-w-0 items-center gap-2.5 sm:gap-3"
      onClick={onClick}
      aria-label="Debuggers Squad home"
    >
      <motion.span
        initial={reduceMotion ? false : { opacity: 0, scale: 0.82, rotate: -8 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        whileHover={reduceMotion ? undefined : { scale: 1.06, rotate: 2 }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
          scale: { type: "spring", stiffness: 320, damping: 20 },
        }}
        className="brand-logo-glow relative grid size-9 shrink-0 place-items-center overflow-hidden rounded-xl bg-black sm:size-10"
      >
        <Image
          src="/images/neuropulseai/gallery/debuggers-squad-logo.jpeg"
          alt=""
          fill
          sizes="40px"
          className="object-cover"
        />
        <motion.span
          aria-hidden="true"
          initial={reduceMotion ? false : { x: "-140%" }}
          animate={reduceMotion ? undefined : { x: "160%" }}
          transition={{ duration: 0.8, delay: 0.35, ease: "easeInOut" }}
          className="absolute inset-y-0 w-5 -skew-x-12 bg-gradient-to-r from-transparent via-white/45 to-transparent"
        />
      </motion.span>

      <span className="leading-none">
        <motion.span
          initial={reduceMotion ? false : { opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="block truncate text-[13px] font-black tracking-[0.06em] text-[#2f1c6a] min-[390px]:text-[14px] sm:text-[15px] sm:tracking-[0.08em]"
        >
          DEBUGGERS SQUAD
        </motion.span>
        <motion.span
          initial={
            reduceMotion
              ? false
              : { opacity: 0, y: 5, letterSpacing: "0.32em" }
          }
          animate={{ opacity: 1, y: 0, letterSpacing: "0.22em" }}
          transition={{ duration: 0.55, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="mt-1 hidden whitespace-nowrap text-[9px] font-bold text-[#8b5cf6] min-[360px]:block sm:text-[10px]"
        >
          BUILD · INNOVATE · IMPACT
        </motion.span>
      </span>
    </Link>
  );
}

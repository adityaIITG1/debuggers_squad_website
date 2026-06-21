"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ChevronDown,
  BriefcaseBusiness,
  ExternalLink,
  Mail,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const founders = [
  {
    name: "Aditya Kumar Singh",
    role: "Founder",
    image: "/images/neuropulseai/founder-aditya.jpeg",
    email: "iitianadityakumarsingh@gmail.com",
    linkedin: "https://www.linkedin.com/in/aditya-kumar-singh-39245525b",
  },
  {
    name: "Prakriti Jaiswal",
    role: "Co-founder",
    image: "/images/neuropulseai/cofounder-prakriti-2026.jpeg",
    email: "jaiswalprakriti26@gmail.com",
    linkedin: "https://www.linkedin.com/in/prakriti-jaiswal-a67291402",
  },
] as const;

export function FounderConnect({ mobile = false }: { mobile?: boolean }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative ${mobile ? "w-full" : ""}`}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={`group inline-flex items-center justify-center gap-2 rounded-xl border border-[#cfc2f3] bg-gradient-to-r from-white to-[#f3efff] font-bold text-[#5630c9] shadow-sm transition hover:-translate-y-0.5 hover:border-[#aa94ed] hover:shadow-md ${
          mobile ? "h-12 w-full px-4 text-sm" : "h-10 px-3.5 text-xs xl:text-sm"
        }`}
      >
        <span className="grid size-6 place-items-center rounded-lg bg-[#673de6] text-white">
          <Sparkles className="size-3.5" />
        </span>
        Connect with founders
        <ChevronDown
          className={`size-3.5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={reduceMotion ? false : { opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className={`z-[70] rounded-2xl border border-[#ddd3f5] bg-white p-3 shadow-2xl shadow-[#2f1c6a]/15 ${
              mobile
                ? "mt-2 w-full"
                : "absolute right-0 top-[calc(100%+10px)] w-[360px]"
            }`}
          >
            <div className="px-2 pb-3 pt-1">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#8b70d8]">
                Founder contact
              </p>
              <p className="mt-1 text-sm text-[#66598a]">
                Partnerships, media, demos, and institutional enquiries.
              </p>
            </div>

            <div className="space-y-2">
              {founders.map((founder) => (
                <div
                  key={founder.name}
                  className="rounded-xl border border-[#ebe5f8] bg-[#fbfaff] p-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="relative size-10 shrink-0 overflow-hidden rounded-xl bg-[#e8e1fa]">
                      <Image
                        src={founder.image}
                        alt=""
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-black text-[#2f1c6a]">
                        {founder.name}
                      </p>
                      <p className="text-xs font-semibold text-[#8b70d8]">
                        {founder.role}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <a
                      href={`mailto:${founder.email}`}
                      role="menuitem"
                      className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#673de6] px-3 py-2 text-xs font-bold text-white hover:bg-[#5630c9]"
                    >
                      <Mail className="size-3.5" />
                      Email
                    </a>
                    <a
                      href={founder.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      role="menuitem"
                      className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#cfc2f3] bg-white px-3 py-2 text-xs font-bold text-[#5630c9] hover:bg-[#f3efff]"
                    >
                      <BriefcaseBusiness className="size-3.5" />
                      LinkedIn
                      <ExternalLink className="size-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="https://wa.me/918604684988"
              target="_blank"
              rel="noreferrer"
              role="menuitem"
              className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-[#e8fff7] px-4 py-3 text-sm font-black text-[#08785c] hover:bg-[#d8f8ed]"
            >
              <MessageCircle className="size-4" />
              WhatsApp Debuggers Squad
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

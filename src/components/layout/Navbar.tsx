"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, ShoppingBag, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/product", label: "NeuroPulseAI" },
  { href: "/paratalk", label: "ParaTalk" },
  { href: "/demo", label: "How it works" },
  { href: "/about", label: "Our story" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-[#2f1c6a] px-4 py-2 text-center text-xs font-semibold text-white sm:text-sm">
        Two impact products: NeuroPulseAI EMG at ₹2,999 and ParaTalk eye-blink control at ₹7,999
      </div>
      <nav className="sticky top-0 z-50 border-b border-[#e5def8] bg-[#fbfaff]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <span className="relative grid size-10 place-items-center overflow-hidden rounded-xl bg-black">
              <Image
                src="/images/neuropulseai/gallery/debuggers-squad-logo.jpeg"
                alt=""
                fill
                sizes="40px"
                className="object-cover"
              />
            </span>
            <span className="leading-none">
              <span className="block text-[15px] font-black tracking-[0.08em] text-[#2f1c6a]">
                DEBUGGERS SQUAD
              </span>
              <span className="mt-1 block text-[10px] font-bold tracking-[0.22em] text-[#8b5cf6]">
                BUILD · INNOVATE · IMPACT
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-[#2f1c6a]/75 transition-colors hover:text-[#673de6]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/checkout"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 rounded-xl border-[#673de6] bg-transparent px-5 font-bold text-[#673de6] hover:bg-[#f1ecff]"
              )}
            >
              <ShoppingBag className="size-4" />
              Checkout
            </Link>
            <Link
              href="/#products"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 rounded-xl bg-[#673de6] px-6 font-bold text-white shadow-lg shadow-violet-700/20 hover:bg-[#5630c9]"
              )}
            >
              Shop products
            </Link>
          </div>

          <button
            type="button"
            className="grid size-10 place-items-center rounded-xl text-[#2f1c6a] hover:bg-[#f1ecff] lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label="Toggle navigation"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {open && (
          <div className="border-t border-[#e5def8] bg-white px-4 py-5 lg:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-semibold text-[#2f1c6a] hover:bg-[#f5f2ff]"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/#products"
                onClick={() => setOpen(false)}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "mt-2 h-12 rounded-xl bg-[#673de6] font-bold text-white"
                )}
              >
                Shop products
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

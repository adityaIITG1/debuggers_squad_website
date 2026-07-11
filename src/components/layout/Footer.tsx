import Image from "next/image";
import Link from "next/link";
import { AlertTriangle, Camera, Mail, MessageCircle } from "lucide-react";

const footerGroups = [
  {
    title: "Product",
    links: [
      ["/product", "NeuroPulseAI"],
      ["/paratalk", "ParaTalk"],
      ["/demo", "Demo & validation"],
      ["/checkout", "Secure checkout"],
    ],
  },
  {
    title: "Company",
    links: [
      ["/about", "About us"],
      ["/media-kit", "Investor & media kit"],
      ["/contact", "Contact"],
    ],
  },
  {
    title: "Policies",
    links: [
      ["/policies/shipping", "Shipping"],
      ["/policies/refunds", "Returns & refunds"],
      ["/policies/privacy", "Privacy"],
      ["/policies/terms", "Terms"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[#ddd4f5] bg-[#f0ebff] text-[#2f1c6a]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div className="max-w-md">
            <Link href="/" className="flex items-center gap-3">
              <span className="relative grid size-11 overflow-hidden rounded-xl bg-black">
                <Image
                  src="/images/neuropulseai/gallery/debuggers-squad-logo.jpeg"
                  alt=""
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </span>
              <span className="text-lg font-black tracking-wide">
                DEBUGGERS SQUAD
              </span>
            </Link>
            <p className="mt-5 leading-7 text-[#574a7d]">
              Affordable, human-centered neurotechnology for education, research,
              physiotherapy learning, and real-world innovation.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://wa.me/919170397988"
                aria-label="WhatsApp"
                className="grid size-10 place-items-center rounded-full bg-white text-[#673de6] shadow-sm transition-transform hover:-translate-y-0.5"
              >
                <MessageCircle className="size-4" />
              </a>
              <a
                href="mailto:debuggerssquad@gmail.com"
                aria-label="Email"
                className="grid size-10 place-items-center rounded-full bg-white text-[#673de6] shadow-sm transition-transform hover:-translate-y-0.5"
              >
                <Mail className="size-4" />
              </a>
              <a
                href="https://instagram.com/debuggers_squad"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="grid size-10 place-items-center rounded-full bg-white text-[#673de6] shadow-sm transition-transform hover:-translate-y-0.5"
              >
                <Camera className="size-4" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-black uppercase tracking-[0.16em]">
                  {group.title}
                </h3>
                <ul className="mt-5 space-y-3">
                  {group.links.map(([href, label]) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="text-sm font-medium text-[#66598a] hover:text-[#673de6]"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex gap-3 rounded-2xl border border-amber-300/60 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-700" />
          <p>
            NeuroPulseAI and ParaTalk are educational, research, and
            assistive-technology prototypes, not certified medical, diagnostic,
            emergency, or life-support devices. They must not replace
            professional medical advice.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-[#d8cef3] pt-7 text-xs font-medium text-[#766a98] sm:flex-row sm:items-center sm:justify-between">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>&copy; {new Date().getFullYear()} Debuggers Squad&trade;.</span>
            <span>MSME Registered</span>
            <span aria-hidden="true">|</span>
            <span>Trademark Applied</span>
            <span aria-hidden="true">|</span>
            <span>Copyright Application Filed</span>
            <span aria-hidden="true">|</span>
            <span>Made in Bharat</span>
            <span className="rounded-full border border-[#d8cef3] bg-white px-2 py-0.5 text-[10px] font-black tracking-[0.12em] text-[#673de6]">
              IN
            </span>
          </p>
          <Link href="/policies/disclaimer" className="hover:text-[#673de6]">
            Medical & product disclaimer
          </Link>
        </div>
      </div>
    </footer>
  );
}

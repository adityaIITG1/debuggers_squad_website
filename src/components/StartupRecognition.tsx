import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { startupRecognition as certificate } from "@/lib/startup-recognition";

export function StartupRecognition() {
  return (
    <section aria-labelledby="startup-recognition-heading" className="border-y border-[#ded5f5] bg-[#f0ebff] py-12 sm:py-16">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:px-8">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-[#d7ccf7] bg-white px-4 py-2 text-xs font-black uppercase tracking-widest text-[#673de6]">
            <BadgeCheck aria-hidden="true" className="size-4" /> A proud milestone
          </p>
          <h2 id="startup-recognition-heading" className="mt-5 text-3xl font-black tracking-tight text-[#2f1c6a] sm:text-4xl">Proud to be a DPIIT-recognised startup.</h2>
          <p className="mt-4 max-w-2xl leading-7 text-[#5b4d7e]">
            Debuggers Squad Innovations LLP is recognised as a startup by the
            Department for Promotion of Industry and Internal Trade, Ministry of
            Commerce &amp; Industry, Government of India. A milestone in our journey
            to build accessible healthtech and neurotechnology from Bharat.
          </p>
          <p className="mt-4 text-sm font-bold text-[#574777]">Certificate {certificate.number} · Issued September 14, 2026</p>
          <Link href={certificate.page} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#673de6] px-6 py-3 font-bold text-white hover:bg-[#5630c9]">
            Explore our recognition <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
        <Link href={certificate.page} className="block rounded-2xl border border-[#d7ccf7] bg-white p-3 shadow-xl shadow-violet-900/10 transition hover:-translate-y-1">
          <Image src={certificate.image} alt="DPIIT Certificate of Recognition DIPP282825 for Debuggers Squad Innovations LLP, issued September 14, 2026" width={1638} height={1157} sizes="(max-width: 1024px) 100vw, 45vw" className="h-auto w-full rounded-lg" />
          <span className="mt-3 block text-center text-xs font-bold text-[#673de6]">View certificate &amp; download the original PDF</span>
        </Link>
      </div>
    </section>
  );
}

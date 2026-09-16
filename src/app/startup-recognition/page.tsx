import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Download, ExternalLink } from "lucide-react";
import { startupRecognition as certificate } from "@/lib/startup-recognition";

const title = "DPIIT Startup Recognition Certificate DIPP282825";
const url = `https://www.debuggerssquad.com${certificate.page}`;

export const metadata: Metadata = {
  title,
  description: certificate.description,
  alternates: { canonical: url },
  openGraph: {
    title: `${title} | Debuggers Squad`,
    description: certificate.description,
    url,
    type: "website",
    siteName: "Debuggers Squad",
    locale: "en_IN",
    images: [{ url: certificate.image, width: 1638, height: 1157, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: certificate.description,
    images: [certificate.image],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": url,
  url,
  name: title,
  description: certificate.description,
  about: { "@id": "https://www.debuggerssquad.com/#organization" },
  mainEntity: {
    "@type": "DigitalDocument",
    name: "DPIIT Certificate of Recognition — Debuggers Squad Innovations LLP",
    identifier: certificate.number,
    datePublished: certificate.issued,
    expires: certificate.validUntil,
    description: "Startup recognition in Healthcare & Lifesciences / Healthcare IT, self-certified by the entity. Validity is subject to the conditions printed on the certificate.",
    publisher: { "@type": "GovernmentOrganization", name: certificate.issuer },
    about: { "@id": "https://www.debuggerssquad.com/#organization" },
    encoding: { "@type": "MediaObject", contentUrl: `https://www.debuggerssquad.com${certificate.pdf}`, encodingFormat: "application/pdf" },
  },
};

export default function StartupRecognitionPage() {
  const details = [
    ["Recognised entity", certificate.entity],
    ["Certificate number", certificate.number],
    ["Issued by", `${certificate.issuer} (DPIIT)`],
    ["Ministry", "Ministry of Commerce & Industry, Government of India"],
    ["Entity type", "Limited Liability Partnership"],
    ["Incorporation date", "September 5, 2026"],
    ["Date of issue", "September 14, 2026"],
    ["Valid up to", "September 4, 2036, subject to the certificate conditions"],
    ["Industry (self-certified)", "Healthcare & Lifesciences"],
    ["Sector (self-certified)", "Healthcare IT"],
  ];

  return (
    <div className="bg-[#fbfaff] text-[#2f1c6a]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <section className="premium-grid px-4 py-14 text-center sm:px-6 sm:py-20">
        <p className="inline-flex items-center gap-2 rounded-full border border-[#d7ccf7] bg-white px-4 py-2 text-xs font-black uppercase tracking-widest text-[#673de6]"><BadgeCheck aria-hidden="true" className="size-4" /> Proudly building from Bharat</p>
        <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">DPIIT-recognised startup.<span className="mt-2 block text-[#673de6]">A milestone worth sharing.</span></h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#66598a]">Debuggers Squad Innovations LLP received its Certificate of Recognition from the Department for Promotion of Industry and Internal Trade on September 14, 2026. We are proud to share this milestone with everyone supporting our healthtech and neurotechnology journey.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={certificate.pdf} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-[#673de6] px-6 py-3 font-bold text-white hover:bg-[#5630c9]">View original certificate <ExternalLink aria-hidden="true" className="size-4" /></a>
          <a href={certificate.pdf} download className="inline-flex items-center gap-2 rounded-xl border border-[#d7ccf7] bg-white px-6 py-3 font-bold text-[#673de6]">Download PDF <Download aria-hidden="true" className="size-4" /></a>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <figure className="rounded-2xl border border-[#ded5f5] bg-white p-3 shadow-xl shadow-violet-900/10 sm:p-6">
          <a href={certificate.pdf} target="_blank" rel="noreferrer" aria-label="Open original DPIIT certificate PDF in a new tab">
            <Image src={certificate.image} alt="Original DPIIT Certificate of Recognition DIPP282825 for Debuggers Squad Innovations LLP, issued September 14, 2026, with validity stated up to September 4, 2036" width={1638} height={1157} sizes="(max-width: 1152px) 100vw, 1100px" priority className="h-auto w-full" />
          </a>
          <figcaption className="mt-4 text-center text-sm leading-6 text-[#66598a]">Certificate {certificate.number}. Open the original PDF to inspect the document or scan its verification QR code.</figcaption>
        </figure>
        <h2 className="mt-14 text-3xl font-black tracking-tight">Certificate of Recognition details</h2>
        <dl className="mt-6 grid overflow-hidden rounded-2xl border border-[#ded5f5] bg-white sm:grid-cols-2">
          {details.map(([label, value]) => <div key={label} className="border-b border-[#eee8f9] p-6"><dt className="text-xs font-black uppercase tracking-wider text-[#766a98]">{label}</dt><dd className="mt-2 break-words font-bold leading-7">{value}</dd></div>)}
        </dl>
        <p className="mt-5 text-sm leading-7 text-[#66598a]">As stated on the certificate, recognition is valid for up to ten years from incorporation, provided turnover has not exceeded ₹200 crore in any financial year. The industry and sector are self-certified by the entity.</p>
        <Link href="/about" className="mt-8 inline-block font-bold text-[#673de6] underline underline-offset-4">Meet the team behind Debuggers Squad</Link>
      </section>
    </div>
  );
}

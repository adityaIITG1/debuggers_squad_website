import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const policies = {
  shipping: {
    title: "Shipping Policy",
    updated: "21 June 2026",
    sections: [
      ["Coverage", "We currently accept prepaid orders for delivery addresses within India."],
      ["Dispatch and delivery", "Dispatch and delivery estimates are shared after order confirmation. Delays may occur because of courier availability, remote-area serviceability, weather, public holidays, or other circumstances outside our control."],
      ["Address accuracy", "Customers are responsible for providing a complete address, reachable phone number, and correct PIN code. Additional shipping charges may apply if a parcel is returned because the address or contact information was incorrect."],
      ["Order support", "For a shipping update, contact us with your Debuggers Squad order number."],
    ],
  },
  refunds: {
    title: "Return and Refund Policy",
    updated: "21 June 2026",
    sections: [
      ["Before dispatch", "A paid order may be cancelled for a full refund before it has been dispatched. Contact us immediately with the order number."],
      ["Damaged or incomplete delivery", "Record an unboxing video and notify us within 48 hours of delivery if the package is damaged, incomplete, or contains the wrong item. We may request photographs, video, and packaging details before approving a replacement or refund."],
      ["Technical issues", "Contact support before returning a kit. We will first help verify the setup, software, USB connection, electrodes, and sensor placement. A confirmed manufacturing defect may qualify for repair, replacement, or refund at our discretion."],
      ["Non-returnable items", "Used gel electrodes, alcohol swabs, opened consumables, physically damaged components, and products modified or used outside the supplied instructions are not returnable."],
      ["Refund timing", "Approved refunds are issued to the original payment method. Bank and payment-provider processing times may vary."],
    ],
  },
  privacy: {
    title: "Privacy Policy",
    updated: "21 June 2026",
    sections: [
      ["Information collected", "We collect contact, delivery, order, and payment-reference information needed to process purchases and provide support. Card, UPI, and banking credentials are handled by Razorpay and are not stored by this website."],
      ["How information is used", "Information is used to confirm payments, fulfil orders, arrange shipping, prevent fraud, respond to support requests, and meet legal or accounting requirements."],
      ["Service providers", "Necessary order information may be shared with payment, database, hosting, courier, and shipping-platform providers solely to operate the service."],
      ["Contact", "You may contact us to request access, correction, or deletion of personal information, subject to records we must retain for legal or transaction purposes."],
    ],
  },
  terms: {
    title: "Terms and Conditions",
    updated: "21 June 2026",
    sections: [
      ["Product scope", "NeuroPulseAI is sold as a single-channel EMG education, research, and innovation prototype. Product appearance and non-material component placement may vary as the prototype is improved."],
      ["Acceptable use", "The buyer agrees to follow the supplied setup and safety instructions, use compatible equipment, and supervise use in educational or demonstration settings."],
      ["Payments and orders", "An order is accepted after successful payment verification. We may cancel and refund an order if inventory, address serviceability, pricing, or fraud checks prevent fulfilment."],
      ["Intellectual property", "Debugger Squad branding, documentation, software distribution, and original product materials may not be resold, republished, or represented as another party’s work without written permission."],
      ["Limitation", "To the maximum extent permitted by law, the product must not be relied on for clinical decisions, and Debuggers Squad is not responsible for outcomes resulting from medical use, unauthorized modification, or use contrary to the instructions."],
    ],
  },
  disclaimer: {
    title: "Medical and Product Disclaimer",
    updated: "21 June 2026",
    sections: [
      ["Not a medical device", "NeuroPulseAI is an educational, research, and innovation project-kit prototype. It is not a certified medical, diagnostic, monitoring, treatment, or cure device."],
      ["No medical advice", "Signals, graphs, software output, documentation, and support information are not medical advice and must not replace evaluation by a qualified healthcare professional."],
      ["Supervised use", "Electrodes should be applied only to intact skin and according to the supplied guide. Stop use if discomfort or irritation occurs. Do not use the kit for emergency, implanted-device, or clinical decision-making purposes."],
    ],
  },
} as const;

type PolicySlug = keyof typeof policies;

export function generateStaticParams() {
  return Object.keys(policies).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const policy = policies[slug as PolicySlug];
  return policy ? { title: `${policy.title} | Debuggers Squad` } : {};
}

export default async function PolicyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const policy = policies[slug as PolicySlug];

  if (!policy) notFound();

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 lg:py-20">
      <Link href="/" className="text-sm font-semibold text-primary hover:underline">
        ← Back to Debuggers Squad
      </Link>
      <h1 className="mt-6 text-4xl font-black tracking-tight">{policy.title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: {policy.updated}</p>
      <div className="mt-10 space-y-8">
        {policy.sections.map(([title, body]) => (
          <section key={title}>
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="mt-3 leading-7 text-muted-foreground">{body}</p>
          </section>
        ))}
      </div>
      <div className="mt-12 rounded-xl border border-border bg-card p-5 text-sm text-muted-foreground">
        Questions? Email{" "}
        <a className="font-semibold text-primary hover:underline" href="mailto:debuggerssquad@gmail.com">
          debuggerssquad@gmail.com
        </a>{" "}
        or contact us through WhatsApp.
      </div>
    </article>
  );
}

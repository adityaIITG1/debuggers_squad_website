import Link from "next/link";
import { ChevronDown, CircleHelp } from "lucide-react";

const faqs = [
  {
    question: "Does it work on Windows?",
    answer:
      "Yes. The supplied software is designed to work with a compatible Windows laptop.",
  },
  {
    question: "Is it a certified medical device?",
    answer:
      "No. Debuggers Squad products are educational, research, innovation, or assistive-technology prototypes. They are not certified medical or diagnostic devices.",
  },
  {
    question: "Can colleges order in bulk?",
    answer:
      "Yes. Colleges, laboratories, workshops, and innovation programs can contact us for bulk-order requirements and support.",
  },
  {
    question: "Is support included?",
    answer:
      "Yes. WhatsApp and email support are included for initial software, connection, and setup guidance.",
  },
  {
    question: "What if the product is damaged or incomplete?",
    answer:
      "Record an unboxing video and notify us within 48 hours of delivery. After reviewing the package evidence, we may approve a replacement or refund according to our policy.",
  },
] as const;

export function ProductFaq() {
  return (
    <section className="border-y border-slate-200 bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-[#f0ebff] text-[#673de6]">
            <CircleHelp className="size-6" />
          </span>
          <p className="mt-5 text-sm font-black uppercase tracking-[0.2em] text-[#673de6]">
            Buyer questions
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
            Clear answers about compatibility, support, institutional orders, and
            damaged deliveries.
          </p>
        </div>

        <div className="mt-10 space-y-3">
          {faqs.map(({ question, answer }) => (
            <details
              key={question}
              className="group rounded-2xl border border-slate-200 bg-[#fbfaff] px-5 py-1 open:border-[#c9baf4] open:bg-white"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-bold text-[#2f1c6a] marker:content-none">
                {question}
                <ChevronDown className="size-5 shrink-0 text-[#673de6] transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <p className="border-t border-slate-200 pb-5 pt-4 leading-7 text-slate-600">
                {answer}
                {question === "Can colleges order in bulk?" && (
                  <>
                    {" "}
                    <Link href="/contact" className="font-semibold text-[#673de6] hover:underline">
                      Contact us for an institutional order.
                    </Link>
                  </>
                )}
                {question === "What if the product is damaged or incomplete?" && (
                  <>
                    {" "}
                    <Link
                      href="/policies/refunds"
                      className="font-semibold text-[#673de6] hover:underline"
                    >
                      Read the complete return and refund policy.
                    </Link>
                  </>
                )}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

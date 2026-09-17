// Reviewed public facts only. Update these alongside changes to page copy.
export const seoPages = [
  {
    path: "/",
    subject: "Debuggers Squad",
    title: "Debuggers Squad | Educational Healthtech & Neurotechnology",
    description: "Explore Debuggers Squad's educational healthtech and neurotechnology, including NeuroPulseAI muscle-signal learning and ParaTalk eye-blink communication.",
    facts: "Debuggers Squad Innovations LLP is an Indian startup building educational healthtech, neurotechnology, embedded electronics and AI software. Products include NeuroPulseAI and ParaTalk.",
  },
  {
    path: "/about",
    subject: "Debuggers Squad",
    title: "About Debuggers Squad | Our Team & Startup Story",
    description: "Meet the Debuggers Squad team and explore its journey from student innovation to an Indian startup working on healthtech, AI and embedded electronics.",
    facts: "The story of Debuggers Squad Innovations LLP, from a student innovation team to an Indian startup. Founder Aditya Kumar Singh and co-founder Prakriti Jaiswal work on healthcare technology, AI and electronics.",
  },
  {
    path: "/product",
    subject: "NeuroPulseAI",
    title: "NeuroPulseAI EMG Education & Research Kit | Debuggers Squad",
    description: "Explore NeuroPulseAI, a portable single-channel EMG educational prototype for muscle-signal visualization, student projects and research learning.",
    facts: "NeuroPulseAI is a portable single-channel EMG kit for muscle-signal visualization, student projects, education and research. Includes device, sensor, electrodes, software and setup guide. An educational prototype, not a certified medical device; not for diagnosis or treatment.",
  },
  {
    path: "/paratalk",
    subject: "ParaTalk",
    title: "ParaTalk Eye-Blink Communication Kit | Debuggers Squad",
    description: "Discover ParaTalk, an educational eye-blink communication and computer-control prototype for accessible communication, games, learning and coding.",
    facts: "ParaTalk is an EOG-based eye-blink communication and computer-control kit for accessible communication, games, learning and coding. An educational and assistive-technology prototype, not a certified medical, diagnostic, emergency or life-support device.",
  },
] as const;

export type SeoPath = (typeof seoPages)[number]["path"];
export type SeoCopy = { path: SeoPath; title: string; description: string };

export function validateSeoCopy(value: unknown): SeoCopy {
  if (!value || typeof value !== "object") throw new Error("Invalid SEO output");
  const row = value as Record<string, unknown>;
  const page = seoPages.find((page) => page.path === row.path);
  if (!page || typeof row.title !== "string" || typeof row.description !== "string") {
    throw new Error("Unknown page or missing SEO fields");
  }
  const { title, description } = row;
  if (title.length < 20 || title.length > 70 || description.length < 80 || description.length > 170) {
    throw new Error("SEO copy length outside publishing limits");
  }
  const text = `${title} ${description}`;
  if (/[<>\r\n]|https?:|www\.|[\u0000-\u001f]/i.test(text) ||
      /\b(cure\w*|treat\w*|diagnos\w*|certified|approved|guarantee\w*|best|leading|clinically|FDA)\b/i.test(text) ||
      /[₹$€£]|\d/.test(text)) {
    throw new Error("SEO copy contains unsupported claims, prices, numbers or markup");
  }
  if (!title.includes(page.subject) || !description.includes(page.subject)) {
    throw new Error("SEO copy must identify the page subject");
  }
  if ((page.path === "/product" || page.path === "/paratalk") && !/\b(education\w*|prototype)\b/i.test(description)) {
    throw new Error("Product descriptions must retain educational positioning");
  }
  return { path: page.path, title, description };
}

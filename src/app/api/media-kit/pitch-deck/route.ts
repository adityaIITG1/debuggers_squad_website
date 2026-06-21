type Slide = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  bullets: string[];
};

const slides: Slide[] = [
  {
    eyebrow: "DEBUGGERS SQUAD",
    title: "Affordable Neurotechnology for India",
    subtitle: "Investor & Media Pitch Deck",
    bullets: [
      "Practical EMG, EOG, IoT, and assistive-technology products.",
      "Built for education, college labs, accessibility, and innovation.",
      "debuggerssquad.com",
    ],
  },
  {
    eyebrow: "MISSION & PRODUCTS",
    title: "Make Biosignal Technology Accessible",
    bullets: [
      "NeuroPulseAI: portable single-channel EMG education and research kit.",
      "ParaTalk: eye-blink communication and computer-control system.",
      "Complete hardware, software, setup guidance, and support.",
      "Current products are educational and assistive prototypes.",
    ],
  },
  {
    eyebrow: "TRACTION",
    title: "Evidence Beyond the Idea Stage",
    bullets: [
      "HackDiwas 3.0 national winner.",
      "TRAE ReVibe Best Solution recognition.",
      "IIT (BHU) Jagriti '26 Serve-Smart Hackathon: 2nd Runner-Up.",
      "2.4M+ social views on biosignal-related content.",
      "Working hardware, college demos, workshops, and media evidence.",
    ],
  },
  {
    eyebrow: "MARKET DIRECTION",
    title: "A Responsible Growth Path",
    bullets: [
      "1. Affordable education kits for students and educators.",
      "2. College, project-lab, workshop, and accessibility-lab adoption.",
      "3. Assistive technology and accessible computer interaction.",
      "4. Future research, quality systems, regulatory review, and certification.",
    ],
  },
  {
    eyebrow: "FOUNDING TEAM",
    title: "National Hackathon Winners & Builders",
    bullets: [
      "Aditya Kumar Singh, Founder - neurotechnology, IoT, biosignals, engineering.",
      "IIT Guwahati online BSc (Hons) DS & AI student; BTech CSE AI/ML student.",
      "Prakriti Jaiswal, Co-founder - operations, finance, outreach, and brand.",
      "University of Allahabad BCom, Accounts and Finance background.",
      "Both founders are focused on neuroscience-led, quality prototype building.",
    ],
  },
  {
    eyebrow: "CONTACT",
    title: "Build the Next Stage With Us",
    bullets: [
      "Aditya: iitianadityakumarsingh@gmail.com",
      "Prakriti: jaiswalprakriti26@gmail.com",
      "WhatsApp: +91 86046 84988",
      "Website: https://debuggerssquad.com/media-kit",
    ],
  },
];

function pdfEscape(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[^\x20-\x7E]/g, "")
    .replaceAll("\\", "\\\\")
    .replaceAll("(", "\\(")
    .replaceAll(")", "\\)");
}

function textLine(text: string, x: number, y: number, size: number, color: string) {
  return `${color} rg BT /F1 ${size} Tf 1 0 0 1 ${x} ${y} Tm (${pdfEscape(text)}) Tj ET\n`;
}

function makeSlideStream(slide: Slide, index: number) {
  let stream = "";
  stream += "0.965 0.955 0.995 rg 0 0 792 612 re f\n";
  stream += "0.184 0.110 0.416 rg 0 0 792 88 re f\n";
  stream += "0.404 0.239 0.902 rg 0 88 15 524 re f\n";
  stream += textLine(slide.eyebrow, 58, 540, 13, "0.404 0.239 0.902");
  stream += textLine(slide.title, 58, 492, 28, "0.184 0.110 0.416");
  if (slide.subtitle) {
    stream += textLine(slide.subtitle, 58, 457, 17, "0.36 0.31 0.49");
  }

  let y = slide.subtitle ? 405 : 430;
  for (const bullet of slide.bullets) {
    stream += "0.404 0.239 0.902 rg 61 " + (y + 3) + " 7 7 re f\n";
    stream += textLine(bullet, 82, y, 14, "0.24 0.20 0.34");
    y -= 46;
  }

  stream += textLine("DEBUGGERS SQUAD", 58, 42, 12, "1 1 1");
  stream += textLine(`Investor & Media Kit  |  ${index + 1}/${slides.length}`, 560, 42, 10, "0.82 0.78 0.92");
  return stream;
}

function buildPdf() {
  const pageObjectNumbers = slides.map((_, index) => 5 + index * 2);
  const objects: string[] = [];

  objects[1] = "<< /Type /Catalog /Pages 2 0 R >>";
  objects[2] = `<< /Type /Pages /Kids [${pageObjectNumbers
    .map((number) => `${number} 0 R`)
    .join(" ")}] /Count ${slides.length} >>`;
  objects[3] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>";

  slides.forEach((slide, index) => {
    const contentNumber = 4 + index * 2;
    const pageNumber = 5 + index * 2;
    const stream = makeSlideStream(slide, index);
    objects[contentNumber] = `<< /Length ${stream.length} >>\nstream\n${stream}endstream`;
    objects[pageNumber] =
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 792 612] ` +
      `/Resources << /Font << /F1 3 0 R >> >> /Contents ${contentNumber} 0 R >>`;
  });

  let pdf = "%PDF-1.4\n%DSQD\n";
  const offsets = [0];

  for (let index = 1; index < objects.length; index++) {
    offsets[index] = pdf.length;
    pdf += `${index} 0 obj\n${objects[index]}\nendobj\n`;
  }

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length}\n`;
  pdf += "0000000000 65535 f \n";
  for (let index = 1; index < objects.length; index++) {
    pdf += `${String(offsets[index]).padStart(10, "0")} 00000 n \n`;
  }
  pdf +=
    `trailer\n<< /Size ${objects.length} /Root 1 0 R >>\n` +
    `startxref\n${xrefOffset}\n%%EOF`;

  return new TextEncoder().encode(pdf);
}

export const dynamic = "force-static";

export function GET() {
  return new Response(buildPdf(), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition":
        'attachment; filename="Debuggers-Squad-Pitch-Deck.pdf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}

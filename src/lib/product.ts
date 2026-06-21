export type Product = {
  slug: "neuropulseai" | "paratalk";
  name: string;
  fullName: string;
  shortDescription: string;
  price: number;
  priceInPaise: number;
  currency: "INR";
  sku: string;
  image: string;
  checkoutNote: string;
  disclaimer: string;
  shipment: {
    length: number;
    breadth: number;
    height: number;
    weight: number;
  };
};

export const NEUROPULSE_PRODUCT: Product = {
  slug: "neuropulseai",
  name: "NeuroPulseAI",
  fullName: "NeuroPulseAI Single-Channel EMG Kit",
  shortDescription: "Portable muscle-signal learning and visualization kit",
  price: 2999,
  priceInPaise: 299900,
  currency: "INR",
  sku: "DS-NPAI-01",
  image: "/images/neuropulseai/product-hero.jpeg",
  checkoutNote: "Includes device, sensor, electrodes, software, and setup guide.",
  disclaimer:
    "NeuroPulseAI is an education, research, and innovation prototype. It is not a certified medical device and must not be used for diagnosis or treatment.",
  shipment: { length: 25, breadth: 17, height: 10, weight: 0.5 },
};

export const PARATALK_PRODUCT: Product = {
  slug: "paratalk",
  name: "ParaTalk",
  fullName: "ParaTalk Eye-Blink Communication & Control Kit",
  shortDescription: "EOG-based communication and computer-control system",
  price: 7999,
  priceInPaise: 799900,
  currency: "INR",
  sku: "DS-PTLK-01",
  image: "/images/paratalk/product-kit.svg",
  checkoutNote:
    "Includes ParaTalk device, 20 electrodes, 20 alcohol swabs, electrode cable, software-loaded pen drive, and guide manual.",
  disclaimer:
    "ParaTalk is an educational and assistive-technology prototype. It is not a certified medical, diagnostic, emergency, or life-support device.",
  shipment: { length: 28, breadth: 22, height: 12, weight: 0.8 },
};

export const PRODUCTS = [NEUROPULSE_PRODUCT, PARATALK_PRODUCT] as const;

export function getProduct(slug: unknown): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}

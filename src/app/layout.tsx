import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/components/cart/CartProvider";

export const metadata: Metadata = {
  title: "Debuggers Squad | NeuroPulseAI & ParaTalk",
  description:
    "Affordable biosignal and assistive-technology products: NeuroPulseAI muscle-signal visualization and ParaTalk eye-blink communication and computer control.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased">
        <CartProvider>
          <Navbar />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          <Footer />
          <Toaster theme="light" position="bottom-right" />
        </CartProvider>
      </body>
    </html>
  );
}

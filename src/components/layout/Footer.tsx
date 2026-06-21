import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background py-12 md:py-16">
      <div className="container px-4 md:px-8 max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* Important Disclaimer Section */}
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 sm:p-6 text-sm text-destructive-foreground">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
            <div className="flex flex-col gap-2">
              <h4 className="font-semibold text-destructive">IMPORTANT LEGAL & MEDICAL DISCLAIMER</h4>
              <p>
                NeuroPulseAI is presented solely as an educational, research, and innovation project-kit prototype. 
                <strong> It is NOT a certified medical device, diagnostic device, treatment device, or cure device.</strong>
              </p>
              <p>
                This product is intended for student projects, innovation demonstrations, and physiotherapy learning concepts. 
                Any information provided by the device or our software should not replace professional medical advice. 
                Consult a certified healthcare professional for any medical concerns.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4">
            <span className="font-bold text-xl tracking-tight text-neon-cyan">
              {"< /> "}
              <span className="text-foreground">DEBUGGERS SQUAD</span>
            </span>
            <p className="text-sm text-muted-foreground">
              Build • Innovate • Impact
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Building affordable neurotechnology, bio-signal, and assistive innovation for India.
            </p>
          </div>
          
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold">Product</h4>
            <Link href="/product" className="text-sm text-muted-foreground hover:text-primary transition-colors">NeuroPulseAI</Link>
            <Link href="/demo" className="text-sm text-muted-foreground hover:text-primary transition-colors">Demo & Validation</Link>
            <Link href="/impact" className="text-sm text-muted-foreground hover:text-primary transition-colors">India Impact</Link>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-semibold">Company</h4>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link>
            <Link href="/admin" className="text-sm text-muted-foreground hover:text-primary transition-colors">Admin Portal</Link>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-semibold">Legal</h4>
            <Link href="/policies/shipping" className="text-sm text-muted-foreground hover:text-primary transition-colors">Shipping Policy</Link>
            <Link href="/policies/refunds" className="text-sm text-muted-foreground hover:text-primary transition-colors">Return / Refund Policy</Link>
            <Link href="/policies/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/policies/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms & Conditions</Link>
            <Link href="/policies/disclaimer" className="text-sm text-muted-foreground hover:text-primary transition-colors">Legal Disclaimer</Link>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-border mt-8 text-sm text-muted-foreground gap-4">
          <p>© {new Date().getFullYear()} Debuggers Squad. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="https://wa.me/918604684988" target="_blank" rel="noreferrer" className="hover:text-foreground">WhatsApp</a>
            <a href="mailto:debuggerssquad@gmail.com" className="hover:text-foreground">Email</a>
            <a href="https://instagram.com/debuggers_squad" target="_blank" rel="noreferrer" className="hover:text-foreground">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DemoPage() {
  return (
    <div className="flex flex-col min-h-screen py-16 md:py-24 bg-background">
      <div className="container px-4 md:px-6 max-w-5xl mx-auto space-y-16">
        
        <section className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">Demo & <span className="text-neon-cyan">Validation</span></h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            See how NeuroPulseAI performs in real-world educational and innovation-driven environments.
          </p>
        </section>

        {/* Disclaimer */}
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive-foreground flex gap-3 items-start max-w-3xl mx-auto">
          <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
          <p>
            <strong>Legal & Medical Disclaimer:</strong> Images and demonstrations shown are for educational and project presentation purposes only. The device is tested in educational and research-oriented observation settings, designed for learning, demonstration, and prototype validation.
          </p>
        </div>

        {/* Video Demo */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-center">Video Demonstration</h2>
          <div className="w-full max-w-sm mx-auto aspect-[9/16] rounded-xl overflow-hidden border border-primary/20 shadow-[0_0_30px_rgba(255,0,255,0.1)] relative">
            <iframe 
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/DiS-mlOMdkE" 
              title="NeuroPulseAI Demo" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </section>

        {/* Photo Gallery Mock */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center">In Action</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="aspect-square bg-card rounded-lg border border-border flex flex-col justify-end p-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
              <p className="font-semibold z-10">Real Electrode Placement</p>
              <p className="text-xs text-muted-foreground z-10">Demonstrating bicep activation</p>
            </div>
            <div className="aspect-square bg-card rounded-lg border border-border flex flex-col justify-end p-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
              <p className="font-semibold z-10">Innovation Showcase</p>
              <p className="text-xs text-muted-foreground z-10">Event demonstration</p>
            </div>
            <div className="aspect-square bg-card rounded-lg border border-border flex flex-col justify-end p-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
              <p className="font-semibold z-10">Academic Validation</p>
              <p className="text-xs text-muted-foreground z-10">Support letter placeholder</p>
            </div>
          </div>
        </section>

        <section className="text-center pt-8 border-t border-border">
          <p className="mb-6 text-lg">Interested in seeing a live demo for your college or clinic?</p>
          <Link href="/contact">
            <Button size="lg" className="bg-neon-gradient text-white">Book a Demo Session</Button>
          </Link>
        </section>

      </div>
    </div>
  );
}

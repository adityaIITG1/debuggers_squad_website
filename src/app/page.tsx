"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Zap, BarChart3, GraduationCap, Laptop, BookOpen, Clock, Shield } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Real-Time EMG Feedback",
    description: "Live graph visualization to see real-time muscle activity as it happens.",
    icon: Activity,
    color: "text-neon-cyan"
  },
  {
    title: "Portable & Demonstrable",
    description: "Compact and affordable kit for high performance at a student-friendly price.",
    icon: Zap,
    color: "text-neon-purple"
  },
  {
    title: "Session-Wise Tracking",
    description: "Track muscle activation insights over multiple sessions.",
    icon: BarChart3,
    color: "text-neon-cyan"
  },
  {
    title: "Education & Research",
    description: "Perfect for students, research, and innovation demonstrations.",
    icon: GraduationCap,
    color: "text-neon-purple"
  },
  {
    title: "Easy Laptop Connection",
    description: "Plug & Play simplicity with a standard USB interface.",
    icon: Laptop,
    color: "text-neon-cyan"
  },
  {
    title: "Quick Report Concept",
    description: "Generate conceptual 1-minute session reports for learning.",
    icon: BookOpen,
    color: "text-neon-purple"
  },
  {
    title: "Affordable Project Kit",
    description: "Bridging the gap between expensive lab systems and real-world learning.",
    icon: Clock,
    color: "text-neon-cyan"
  },
  {
    title: "Future Rehab Pathway",
    description: "A stepping stone for future rehabilitation support systems after required approvals.",
    icon: Shield,
    color: "text-neon-purple"
  }
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative w-full flex-1 flex flex-col items-center justify-center overflow-hidden py-20 lg:py-32 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20"></div>
        <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center space-y-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 max-w-4xl"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter">
              <span className="text-neon-cyan">NeuroPulse</span>
              <span className="text-neon-purple">AI</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-medium text-muted-foreground mt-4">
              Portable EMG Rehabilitation Feedback Kit
            </h2>
            <p className="mx-auto max-w-[700px] text-lg text-muted-foreground mt-6 leading-relaxed">
              Low-cost, real-time muscle activity monitoring for education, research, physiotherapy learning, and future rehabilitation support.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 mt-8"
          >
            <Link href="/product">
              <Button size="lg" className="w-full sm:w-auto bg-neon-gradient text-white border-0 shadow-[0_0_20px_rgba(0,255,255,0.4)] hover:shadow-[0_0_30px_rgba(0,255,255,0.6)] transition-all">
                Explore NeuroPulseAI
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary/50 text-foreground hover:bg-primary/10">
                Watch Demo
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="ghost" className="w-full sm:w-auto text-muted-foreground hover:text-foreground">
                Book Demo
              </Button>
            </Link>
          </motion.div>

        </div>
      </section>

      {/* Video Demo Section */}
      <section className="w-full py-16 md:py-24 bg-card/50 border-y border-border">
        <div className="container px-4 md:px-6 mx-auto max-w-5xl">
          <div className="flex flex-col items-center justify-center space-y-8">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">See It In Action</h2>
              <p className="max-w-[600px] text-muted-foreground">
                Watch how NeuroPulseAI captures real-time muscle activity through a simple, non-invasive setup.
              </p>
            </div>
            <div className="w-full max-w-sm mx-auto aspect-[9/16] rounded-xl overflow-hidden border border-primary/20 shadow-[0_0_30px_rgba(255,0,255,0.1)] relative">
              <iframe 
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/DiS-mlOMdkE" 
                title="NeuroPulseAI Demo" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section className="w-full py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6 mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <div className="inline-block rounded-lg bg-destructive/10 px-3 py-1 text-sm text-destructive border border-destructive/20">
                The Problem
              </div>
              <h3 className="text-2xl md:text-3xl font-bold">The Accessibility Gap in Neurotechnology</h3>
              <p className="text-muted-foreground leading-relaxed">
                Traditional EMG machines are often costly, bulky, and inaccessible in India, especially for students, small clinics, physiotherapy learning spaces, and innovation labs. 
                Many cases of neuromuscular weakness need better awareness and affordable feedback tools, but advanced EMG systems remain out of reach for the masses.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary border border-primary/20">
                The Solution
              </div>
              <h3 className="text-2xl md:text-3xl font-bold">Affordable Innovation</h3>
              <p className="text-muted-foreground leading-relaxed">
                NeuroPulseAI bridges this gap as a low-cost, portable EMG-based kit that visualizes real-time muscle activity. It transforms complex biosignals into accessible, session-wise feedback concepts in an affordable format designed for learning, research, and future scalable impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 md:py-24 bg-card/30 border-t border-border">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Value Propositions</h2>
            <p className="max-w-[700px] mx-auto text-muted-foreground md:text-lg">
              Designed from the ground up to be practical, demonstratable, and accessible.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-background/50 border-border/50 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className={`p-3 rounded-lg w-fit bg-card mb-4 border border-border ${feature.color}`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm md:text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
    </div>
  );
}

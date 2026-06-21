"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Product Hero Section */}
      <section className="w-full py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <div className="grid gap-12 lg:grid-cols-2">
            
            {/* Image Placeholder area */}
            <div className="flex flex-col gap-4">
              <div className="aspect-square bg-card rounded-xl border border-border shadow-lg overflow-hidden flex items-center justify-center relative">
                {/* Fallback pattern if image is missing */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
                <div className="text-center z-10 p-6 space-y-4">
                   <h2 className="text-3xl font-bold text-neon-cyan opacity-50">NeuroPulseAI</h2>
                   <p className="text-muted-foreground">Prototype Visualization</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="aspect-square w-24 bg-card rounded-lg border border-border"></div>
                <div className="aspect-square w-24 bg-card rounded-lg border border-border"></div>
                <div className="aspect-square w-24 bg-card rounded-lg border border-border"></div>
              </div>
            </div>

            {/* Product Details */}
            <div className="flex flex-col space-y-6">
              <div>
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight">NeuroPulseAI</h1>
                <p className="text-xl text-muted-foreground mt-2">Single-Channel EMG Rehabilitation Feedback Kit</p>
              </div>

              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold text-foreground">₹2,999</span>
                <span className="text-sm text-muted-foreground line-through">₹4,999</span>
                <span className="text-xs font-semibold px-2 py-1 bg-neon-gradient text-white rounded-md">Pre-order Launch</span>
              </div>

              {/* Medical Disclaimer Banner */}
              <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive-foreground flex gap-3 items-start">
                <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <p>
                  <strong>Disclaimer:</strong> This product is a prototype intended for educational, research, and innovation demonstration purposes only. It is <strong>NOT</strong> a certified medical or diagnostic device.
                </p>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                NeuroPulseAI is designed to make muscle activity monitoring affordable and accessible. Perfect for physiotherapy students, hardware innovators, research labs, and academic demonstrations, this kit connects directly to your laptop via USB to provide real-time EMG feedback.
              </p>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">What's in the Box?</h3>
                <ul className="space-y-2">
                  {[
                    "NeuroPulseAI Prototype Device",
                    "USB Extender Cable",
                    "Electrode Wires",
                    "12x Gel Electrodes",
                    "Alcohol Swabs",
                    "Setup Guide Manual & Disclaimer Card"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/checkout" className="w-full">
                  <Button size="lg" className="w-full bg-primary text-primary-foreground shadow-[0_0_15px_rgba(0,255,255,0.3)] hover:shadow-[0_0_25px_rgba(0,255,255,0.5)]">
                    Order Now - ₹2,999
                  </Button>
                </Link>
                <Link href="/contact" className="w-full">
                  <Button size="lg" variant="outline" className="w-full border-border">
                    Inquire for Bulk / Lab
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground pt-4 border-t border-border">
                <ShieldCheck className="h-4 w-4" />
                <span>Secure payment via Razorpay. Fast shipping across India.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications Section */}
      <section className="w-full py-16 md:py-24 bg-card/30 border-t border-border">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Technical Specifications</h2>
            <p className="text-muted-foreground mt-2">Everything you need to know about the prototype.</p>
          </div>

          <div className="rounded-xl border border-border overflow-hidden bg-background">
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium bg-card/50 w-1/3">Product Name</TableCell>
                  <TableCell>NeuroPulseAI</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium bg-card/50">Category</TableCell>
                  <TableCell>EMG Educational / Research / Project Kit</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium bg-card/50">Signal Type</TableCell>
                  <TableCell>Single-channel EMG</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium bg-card/50">Connectivity</TableCell>
                  <TableCell>USB-based laptop connection</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium bg-card/50">Software</TableCell>
                  <TableCell>EMG Plotter / Visualization Dashboard (VS Code Setup)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium bg-card/50">Report Capability</TableCell>
                  <TableCell>1-minute session report conceptualization</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium bg-card/50">Power Source</TableCell>
                  <TableCell>USB / Microcontroller-based</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium bg-card/50">Dimensions</TableCell>
                  <TableCell>25 cm × 17 cm (Prototype Box)</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");

  return (
    <div className="container flex items-center justify-center min-h-[70vh] py-12 px-4 md:px-8">
      <Card className="max-w-md w-full bg-card/50 border-primary/20 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-neon-gradient"></div>
        <CardHeader className="pt-8">
          <div className="mx-auto bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl text-neon-cyan">Order Confirmed!</CardTitle>
          <CardDescription className="text-base mt-2">
            Thank you for purchasing NeuroPulseAI. Your order has been successfully placed.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-background rounded-lg p-4 border border-border">
            <p className="text-sm text-muted-foreground mb-1">Order Number</p>
            <p className="font-mono text-lg font-bold">{orderId || "Pending"}</p>
          </div>

          <div className="flex items-center justify-center gap-3 text-muted-foreground bg-muted/20 p-3 rounded-lg">
            <Package className="h-5 w-5 text-primary" />
            <span className="text-sm">We are packing your order. You will receive an email with tracking details shortly.</span>
          </div>

          <div className="text-xs text-muted-foreground pt-4 border-t border-border">
            <p><strong>Reminder:</strong> This product is a prototype for educational/research use.</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3 pb-8">
          <a
            href="https://wa.me/919170397988?text=Hello%2C%20I%20want%20an%20update%20on%20my%20NeuroPulseAI%20order."
            target="_blank"
            rel="noreferrer"
            className="w-full"
          >
            <Button variant="outline" className="w-full border-primary/50 text-foreground hover:bg-primary/10">
              Get order support
            </Button>
          </a>
          <Link href="/" className="w-full">
            <Button variant="ghost" className="w-full">
              Return to Home
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="container flex justify-center py-24"><div className="animate-pulse">Loading...</div></div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}

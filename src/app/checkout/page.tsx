"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { AlertTriangle } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [acceptedDisclaimer, setAcceptedDisclaimer] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
  });

  const cartItems = [
    {
      id: "1",
      name: "NeuroPulseAI",
      price: 2999,
      quantity: 1,
    }
  ];

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!acceptedDisclaimer) {
      toast.error("You must accept the legal and medical disclaimer to proceed.");
      return;
    }

    if (formData.phone.length < 10) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    if (formData.pincode.length < 6) {
       toast.error("Please enter a valid 6-digit pincode.");
       return;
    }

    setLoading(true);

    try {
      // 1. Create Razorpay Order
      const res = await fetch("/api/payments/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalAmount * 100 }), // Amount in paise
      });

      const orderData = await res.json();

      if (!res.ok) throw new Error(orderData.error || "Failed to create order");

      // 2. Initialize Razorpay Modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Debuggers Squad",
        description: "NeuroPulseAI Order",
        order_id: orderData.order_id,
        handler: async function (response: any) {
          try {
            toast.loading("Verifying payment and creating order...");
            // 3. Verify Payment on Backend
            const verifyRes = await fetch("/api/payments/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                customerDetails: formData,
                cartItems: cartItems,
                totalAmount: totalAmount,
                disclaimerAccepted: acceptedDisclaimer,
              }),
            });

            const verifyData = await verifyRes.json();
            
            if (verifyRes.ok) {
              toast.dismiss();
              toast.success("Payment successful! Order confirmed.");
              router.push(`/order-success?order_id=${verifyData.order_number}`);
            } else {
              throw new Error(verifyData.error || "Payment verification failed.");
            }
          } catch (err: any) {
             toast.dismiss();
             toast.error(err.message || "An error occurred during verification.");
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#00ffff", // Neon Cyan
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", function (response: any) {
        toast.error(`Payment failed: ${response.error.description}`);
      });
      rzp.open();

    } catch (error: any) {
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-6xl mx-auto py-12 px-4 md:px-8">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h1 className="text-3xl font-bold mb-8 text-neon-cyan">Checkout</h1>
          <form onSubmit={handlePayment} className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold border-b border-border pb-2">Shipping Details</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" name="name" required value={formData.name} onChange={handleInputChange} className="bg-card" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" name="phone" type="tel" required minLength={10} value={formData.phone} onChange={handleInputChange} className="bg-card" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input id="email" name="email" type="email" required value={formData.email} onChange={handleInputChange} className="bg-card" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Full Address *</Label>
                <Input id="address" name="address" required value={formData.address} onChange={handleInputChange} className="bg-card" />
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input id="city" name="city" required value={formData.city} onChange={handleInputChange} className="bg-card" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Input id="state" name="state" required value={formData.state} onChange={handleInputChange} className="bg-card" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode *</Label>
                  <Input id="pincode" name="pincode" required minLength={6} value={formData.pincode} onChange={handleInputChange} className="bg-card" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="landmark">Landmark (Optional)</Label>
                <Input id="landmark" name="landmark" value={formData.landmark} onChange={handleInputChange} className="bg-card" />
              </div>
            </div>

            <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
              <div className="flex gap-3 items-start">
                <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-destructive">Required Legal Disclaimer</p>
                  <p className="text-sm text-destructive-foreground">
                    By checking this box, I acknowledge that NeuroPulseAI is an educational, research, and innovation project-kit prototype. It is NOT a certified medical device and should not be used for medical diagnosis, treatment, or cure.
                  </p>
                  <label className="flex items-center gap-2 mt-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      required
                      className="h-4 w-4 rounded border-destructive/50 bg-background text-destructive focus:ring-destructive"
                      checked={acceptedDisclaimer}
                      onChange={(e) => setAcceptedDisclaimer(e.target.checked)}
                    />
                    <span className="text-sm font-medium text-destructive-foreground">I accept the disclaimer.</span>
                  </label>
                </div>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={loading}>
              {loading ? "Processing..." : `Pay ₹${totalAmount}`}
            </Button>
          </form>
        </div>

        <div>
          <Card className="bg-card/50 border-border sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>Review your items before payment.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b border-border/50">
                  <div className="flex flex-col">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-sm text-muted-foreground">Qty: {item.quantity}</span>
                  </div>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
              
              <div className="flex justify-between items-center pt-4 text-muted-foreground">
                <span>Subtotal</span>
                <span>₹{totalAmount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Estimated Shipping</span>
                <span className="text-emerald-500">Free</span>
              </div>
              
            </CardContent>
            <CardFooter className="flex justify-between border-t border-border pt-4">
              <span className="font-bold text-xl">Total</span>
              <span className="font-bold text-xl text-neon-cyan">₹{totalAmount}</span>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

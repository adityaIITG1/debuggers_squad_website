"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Mail, Phone, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [isDemo, setIsDemo] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    productInterest: "NeuroPulseAI",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          type: isDemo ? "demo" : "contact"
        }),
      });

      if (!res.ok) throw new Error("Failed to submit request.");

      toast.success(isDemo ? "Demo request sent successfully!" : "Message sent successfully!");
      setFormData({
        name: "", email: "", phone: "", organization: "", productInterest: "NeuroPulseAI", message: ""
      });
    } catch {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-6xl mx-auto py-16 px-4 md:px-8 flex-1">
      <div className="grid md:grid-cols-2 gap-12">
        
        {/* Contact Information */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter mb-4">Get in <span className="text-neon-cyan">Touch</span></h1>
            <p className="text-muted-foreground text-lg">
              Have questions about NeuroPulseAI? Looking to book a demonstration for your college or clinic? We are here to help.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg text-primary border border-primary/20">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Phone / WhatsApp</h3>
                <p className="text-muted-foreground">+91 8604684988</p>
                <a href="https://wa.me/918604684988" target="_blank" rel="noreferrer" className="text-sm text-neon-cyan hover:underline mt-1 inline-block">Message on WhatsApp</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-secondary/10 rounded-lg text-secondary border border-secondary/20">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Email</h3>
                <p className="text-muted-foreground">debuggerssquad@gmail.com</p>
                <a href="mailto:debuggerssquad@gmail.com" className="text-sm text-neon-purple hover:underline mt-1 inline-block">Send an Email</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-muted rounded-lg border border-border">
                <MessageSquare className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Social Media</h3>
                <p className="text-muted-foreground">Instagram: @debuggers_squad</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <div className="flex gap-4 mb-4">
                <Button 
                  variant={!isDemo ? "default" : "outline"} 
                  onClick={() => setIsDemo(false)}
                  className={!isDemo ? "bg-primary text-primary-foreground shadow-[0_0_10px_rgba(0,255,255,0.3)]" : ""}
                >
                  General Inquiry
                </Button>
                <Button 
                  variant={isDemo ? "default" : "outline"} 
                  onClick={() => setIsDemo(true)}
                  className={isDemo ? "bg-secondary text-secondary-foreground shadow-[0_0_10px_rgba(255,0,255,0.3)]" : ""}
                >
                  Book a Demo
                </Button>
              </div>
              <CardTitle>{isDemo ? "Request a Demonstration" : "Send a Message"}</CardTitle>
              <CardDescription>
                {isDemo 
                  ? "We offer remote and in-person (subject to location) demonstrations for educational institutes and clinics." 
                  : "Fill out the form below and we’ll get back to you as soon as possible."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" name="name" required value={formData.name} onChange={handleChange} className="bg-background" />
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className="bg-background" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone *</Label>
                    <Input id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange} className="bg-background" />
                  </div>
                </div>

                {isDemo && (
                  <div className="space-y-2">
                    <Label htmlFor="organization">College / Organization</Label>
                    <Input id="organization" name="organization" value={formData.organization} onChange={handleChange} className="bg-background" />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <textarea 
                    id="message" 
                    name="message" 
                    required 
                    value={formData.message} 
                    onChange={handleChange}
                    className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>

                <Button type="submit" className={`w-full ${isDemo ? 'bg-neon-gradient hover:opacity-90 text-white' : 'bg-primary'}`} disabled={loading}>
                  {loading ? "Sending..." : (isDemo ? "Submit Demo Request" : "Send Message")}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}

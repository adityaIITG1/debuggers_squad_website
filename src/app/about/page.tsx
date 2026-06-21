import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background py-16 md:py-24">
      <div className="container px-4 md:px-6 max-w-5xl mx-auto space-y-16">
        
        {/* About Debuggers Squad */}
        <section className="space-y-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">About <span className="text-neon-cyan">Debuggers Squad</span></h1>
          <p className="text-xl text-muted-foreground font-medium">Build • Innovate • Impact</p>
          <p className="max-w-[800px] mx-auto text-muted-foreground leading-relaxed">
            Debuggers Squad is a technology-driven innovation team focused on building affordable, impactful, and human-centered solutions in healthcare, neuroscience, education, and assistive technology. We transform practical ideas into real-world tools that help people and turn innovation into meaningful impact.
          </p>
        </section>

        {/* Vision & Goal */}
        <section className="grid md:grid-cols-2 gap-8">
          <Card className="bg-card/50 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl text-neon-cyan">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                To make advanced bio-signal and neurotechnology tools affordable, portable, and reachable for students, innovators, educators, small labs, and future rehabilitation-support ecosystems across India and beyond.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 border-secondary/20">
            <CardHeader>
              <CardTitle className="text-2xl text-neon-purple">Our Goal</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                To build low-cost, practical, and easy-to-use EMG, EOG, assistive, and rehabilitation-oriented project kits that bridge the gap between expensive laboratory systems and real-world learning, demonstration, and accessibility needs.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Founders */}
        <section className="space-y-8 pt-8 border-t border-border">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter">Meet The Founders</h2>
            <p className="text-muted-foreground">The minds driving the innovation forward.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 pt-8">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-48 h-48 rounded-full bg-card border-4 border-primary/50 shadow-[0_0_20px_rgba(0,255,255,0.2)] overflow-hidden flex items-center justify-center relative">
                <span className="text-muted-foreground">Photo Placeholder</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">Aditya Kumar Singh</h3>
                <p className="text-primary font-medium">Founder</p>
              </div>
              <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
                Aditya is focused on building affordable neurotechnology, bio-signal, and assistive innovation for India. His work includes EMG-based feedback systems, EOG assistive communication concepts, and low-cost research-oriented prototypes.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-48 h-48 rounded-full bg-card border-4 border-secondary/50 shadow-[0_0_20px_rgba(255,0,255,0.2)] overflow-hidden flex items-center justify-center relative">
                 <span className="text-muted-foreground">Photo Placeholder</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">Prakriti Jaiswal</h3>
                <p className="text-secondary font-medium">Co-founder</p>
              </div>
              <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
                Prakriti supports Debuggers Squad in operations, presentation, outreach, and brand-building for student-led innovation and impact-driven projects.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

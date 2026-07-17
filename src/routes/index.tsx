import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  HeartPulse,
  Brain,
  Shield,
  Sparkles,
  TrendingUp,
  Activity,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen">
      <header className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
            <HeartPulse className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-display font-bold text-lg leading-none">TwinCare</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">AI Health Twin</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/login"><Button variant="ghost" size="sm">Log in</Button></Link>
          <Link to="/register"><Button size="sm">Get Started</Button></Link>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-16 lg:py-24 text-center">
        <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6 text-xs">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span className="font-medium">Explainable AI · Not just a chatbot</span>
        </div>
        <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6">
          Your <span className="gradient-text">explainable</span><br />health twin
        </h1>
        <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          TwinCare AI understands your lifestyle, asks smart follow-up questions,
          and explains every recommendation transparently — so you always know why.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link to="/register">
            <Button size="lg" className="rounded-full h-12 px-6">
              Get Started <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
          <Link to="/login">
            <Button size="lg" variant="outline" className="rounded-full h-12 px-6">
              I have an account
            </Button>
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { icon: Activity, label: "Real-time Health Score" },
            { icon: Brain, label: "Follow-up Reasoning" },
            { icon: TrendingUp, label: "Future-Me Simulation" },
            { icon: Shield, label: "Emergency Detection" },
          ].map((s, i) => (
            <div key={i} className="glass rounded-2xl p-4 hover-lift">
              <s.icon className="w-6 h-6 text-primary mb-2 mx-auto" />
              <div className="text-xs font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-3">
          Transparent AI for real people
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Every recommendation includes its reasoning, evidence, and alternatives you can question.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Brain,
              title: "Smart Follow-ups",
              text: "Instead of jumping to conclusions, TwinCare asks clarifying questions like a doctor.",
            },
            {
              icon: Sparkles,
              title: "Explainability Dashboard",
              text: "See likely causes, confidence scores, evidence, and alternatives with a 'Why not?' button.",
            },
            {
              icon: TrendingUp,
              title: "Future-Me Simulation",
              text: "Adjust sleep, water, exercise — see how your future health score changes.",
            },
            {
              icon: Shield,
              title: "Emergency Detection",
              text: "Serious symptoms trigger an immediate alert with clear next steps.",
            },
            {
              icon: Activity,
              title: "Daily Wellness Coach",
              text: "A personalized plan that adapts to your check-ins and lifestyle.",
            },
            {
              icon: HeartPulse,
              title: "Health History",
              text: "Timeline of check-ins, symptoms, and recommendations for you and your doctor.",
            },
          ].map((f, i) => (
            <div key={i} className="glass rounded-2xl p-6 hover-lift">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="glass-strong rounded-3xl p-8 lg:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Start understanding your health today</h2>
          <p className="text-muted-foreground mb-6">
            Free to explore. Your health twin is built as you check in.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mb-6">
            {["No medical jargon", "Explainable AI", "Emergency-safe"].map((t) => (
              <div key={t} className="flex items-center gap-1.5 text-sm">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                {t}
              </div>
            ))}
          </div>
          <Link to="/register">
            <Button size="lg" className="rounded-full h-12 px-8">
              Create your health twin <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </section>

      <footer className="max-w-7xl mx-auto px-6 py-8 text-center text-xs text-muted-foreground">
        © 2026 TwinCare AI · Not a substitute for professional medical advice.
      </footer>
    </div>
  );
}

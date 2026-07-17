import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { storage, generateFollowUps, analyzeSymptoms, detectEmergency } from "@/lib/mock-data";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/analysis")({ component: Analysis });

type Session = { sleep: number; water: number; symptoms: string };
const checkin = storage<Session | null>("twincare_checkin", null);
const answerStore = storage<Record<string, string>>("twincare_followup_answers", {});

function Analysis() {
  const s = checkin.get() || { sleep: 6, water: 1.5, symptoms: "headache" };
  const questions = useMemo(() => generateFollowUps(s.symptoms), [s.symptoms]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const navigate = useNavigate();

  const q = questions[step];
  const answer = (v: string) => {
    const next = { ...answers, [q.id]: v };
    setAnswers(next);
    if (step + 1 < questions.length) setStep(step + 1);
    else {
      answerStore.set(next);
      setDone(true);
    }
  };

  const emergency = detectEmergency(s.symptoms);
  if (emergency.emergency) {
    navigate({ to: "/emergency" });
    return null;
  }

  const analysis = analyzeSymptoms(s.symptoms, s.sleep, s.water);

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Sparkles className="w-7 h-7 text-primary" /> AI Analysis
          </h1>
          <p className="text-muted-foreground">Your twin thinks before it recommends</p>
        </div>

        {!done ? (
          <div className="glass-strong rounded-3xl p-8">
            <div className="text-xs text-muted-foreground mb-3">
              Follow-up {step + 1} of {questions.length}
            </div>
            <div className="h-1.5 bg-muted rounded-full mb-6 overflow-hidden">
              <div className="h-full gradient-primary transition-all" style={{ width: `${((step + 1) / questions.length) * 100}%` }} />
            </div>
            <h2 className="text-2xl font-semibold mb-6">{q.question}</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {q.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => answer(opt)}
                  className="p-4 rounded-2xl border hover:border-primary hover:bg-accent/30 text-left transition"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="glass-strong rounded-3xl p-6">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span className="text-xs uppercase tracking-wider font-medium">Analysis Complete</span>
              </div>
              <div className="flex items-baseline gap-3 mb-4">
                <h2 className="text-2xl font-bold">{analysis.likelyCause}</h2>
                <span className="text-sm text-muted-foreground">confidence {analysis.confidence}%</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden mb-6">
                <div className="h-full gradient-primary" style={{ width: `${analysis.confidence}%` }} />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold mb-2">Reasons considered</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    {analysis.reasonsConsidered.map((r) => <li key={r}>• {r}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2">Evidence used</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    {analysis.evidence.map((r) => <li key={r}>• {r}</li>)}
                  </ul>
                </div>
              </div>
            </div>

            <div className="glass rounded-3xl p-6">
              <h4 className="font-semibold mb-3">Alternative possibilities</h4>
              <div className="space-y-3">
                {analysis.alternatives.map((a) => (
                  <div key={a.name} className="flex items-center justify-between p-3 rounded-xl bg-accent/20">
                    <div>
                      <div className="text-sm font-medium">{a.name}</div>
                      <div className="text-xs text-muted-foreground">{a.confidence}% likelihood</div>
                    </div>
                    <Link to="/explainability"><Button variant="outline" size="sm">Why not?</Button></Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-3xl p-6">
              <h4 className="font-semibold mb-2">Recommended next action</h4>
              <p className="text-sm text-muted-foreground mb-4">{analysis.nextAction}</p>
              <h4 className="font-semibold mb-2">Health tips</h4>
              <div className="flex flex-wrap gap-2">
                {analysis.tips.map((t) => (
                  <span key={t} className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium">{t}</span>
                ))}
              </div>
            </div>

            <div className="text-xs text-muted-foreground p-4 rounded-xl border border-dashed">
              <strong>Medical disclaimer:</strong> TwinCare AI provides educational information only and is not a substitute for professional medical advice, diagnosis, or treatment.
            </div>

            <div className="flex gap-3">
              <Link to="/explainability" className="flex-1">
                <Button className="w-full rounded-xl h-11">
                  Explainability Dashboard <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Link to="/coach" className="flex-1">
                <Button variant="outline" className="w-full rounded-xl h-11">Wellness plan</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}

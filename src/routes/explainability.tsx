import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { CircleProgress } from "@/components/CircleProgress";
import { storage, analyzeSymptoms } from "@/lib/mock-data";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Brain, Droplet, Moon, Activity, ShieldCheck, Lightbulb, XCircle } from "lucide-react";

export const Route = createFileRoute("/explainability")({ component: Explain });

const checkin = storage<{ sleep: number; water: number; symptoms: string } | null>("twincare_checkin", null);

function Explain() {
  const s = checkin.get() || { sleep: 4, water: 1, symptoms: "headache" };
  const a = analyzeSymptoms(s.symptoms, s.sleep, s.water);
  const [selected, setSelected] = useState<null | (typeof a.alternatives)[number]>(null);

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Brain className="w-7 h-7 text-primary" /> Explainability Dashboard
          </h1>
          <p className="text-muted-foreground">Every reason, every alternative — transparently.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="glass-strong rounded-3xl p-6 flex flex-col items-center text-center">
            <div className="text-xs text-muted-foreground mb-3">Likely cause</div>
            <h2 className="text-xl font-bold mb-4">{a.likelyCause}</h2>
            <CircleProgress value={a.confidence} size={140} stroke={12} sublabel="confidence" />
          </div>

          <div className="glass rounded-3xl p-6 lg:col-span-2">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-primary" /> Why this recommendation
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Symptoms considered</div>
                <ul className="text-sm space-y-1">
                  {a.reasonsConsidered.slice(0, 2).map((r) => <li key={r}>• {r}</li>)}
                </ul>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Lifestyle factors used</div>
                <ul className="text-sm space-y-1">
                  <li className="flex items-center gap-2"><Droplet className="w-3.5 h-3.5 text-sky" /> Water intake: {s.water}L</li>
                  <li className="flex items-center gap-2"><Moon className="w-3.5 h-3.5 text-lavender" /> Sleep: {s.sleep}h</li>
                  <li className="flex items-center gap-2"><Activity className="w-3.5 h-3.5 text-mint" /> Activity level</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="glass rounded-3xl p-6">
            <h3 className="font-semibold mb-4">Alternative possible causes</h3>
            <div className="space-y-3">
              {a.alternatives.map((alt) => (
                <div key={alt.name} className="p-4 rounded-2xl bg-accent/20">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">{alt.name}</div>
                    <span className="text-xs text-muted-foreground">{alt.confidence}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden mb-3">
                    <div className="h-full bg-primary/50" style={{ width: `${alt.confidence}%` }} />
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline" onClick={() => setSelected(alt)}>
                        Why not {alt.name}?
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <XCircle className="w-5 h-5 text-primary" />
                          Why not {selected?.name}?
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-2 mt-2">
                        {selected?.why.map((w) => (
                          <div key={w} className="flex items-start gap-2 text-sm">
                            <span className="text-primary">✓</span>
                            <span>{w}</span>
                          </div>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass rounded-3xl p-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" /> Evidence summary
              </h3>
              <ul className="text-sm space-y-2 text-muted-foreground">
                {a.evidence.map((e) => <li key={e}>• {e}</li>)}
              </ul>
            </div>
            <div className="glass-strong rounded-3xl p-6">
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Recommended next step</div>
              <p className="text-sm">{a.nextAction}</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

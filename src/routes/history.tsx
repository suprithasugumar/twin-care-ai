import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { mockHistory } from "@/lib/mock-data";
import { History as HistoryIcon } from "lucide-react";

export const Route = createFileRoute("/history")({ component: HistoryPage });

function HistoryPage() {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <HistoryIcon className="w-7 h-7 text-primary" /> Health History
          </h1>
          <p className="text-muted-foreground">Your twin's memory of your check-ins.</p>
        </div>

        <div className="relative pl-8 space-y-4">
          <div className="absolute left-3 top-2 bottom-2 w-px bg-border" />
          {mockHistory.map((c) => (
            <div key={c.id} className="relative">
              <div className="absolute -left-6 top-5 w-3 h-3 rounded-full gradient-primary ring-4 ring-background" />
              <div className="glass rounded-2xl p-5 hover-lift">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">{c.date}</div>
                  <div className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                    Score {c.healthScore}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
                  <div>Symptoms: <span className="text-foreground">{c.symptoms}</span></div>
                  <div>Mood: <span className="text-foreground">{c.mood}</span></div>
                  <div>Sleep: <span className="text-foreground">{c.sleep}h</span></div>
                  <div>Water: <span className="text-foreground">{c.water}L</span></div>
                </div>
                <div className="text-sm border-t pt-3">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">AI Recommendation</span>
                  <div>{c.recommendation}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

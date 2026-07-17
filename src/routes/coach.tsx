import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Droplet, Moon, Footprints, UtensilsCrossed, Brain, Leaf } from "lucide-react";
import { generateWellnessPlan } from "@/lib/mock-data";

export const Route = createFileRoute("/coach")({ component: Coach });

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  droplet: Droplet, moon: Moon, footprints: Footprints, utensils: UtensilsCrossed, brain: Brain,
};

function Coach() {
  const [tasks, setTasks] = useState(generateWellnessPlan());
  const doneCount = tasks.filter((t) => t.done).length;
  const pct = (doneCount / tasks.length) * 100;

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Leaf className="w-7 h-7 text-primary" /> Wellness Coach
          </h1>
          <p className="text-muted-foreground">A daily plan tailored to your twin.</p>
        </div>

        <div className="glass-strong rounded-3xl p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium">Today's Progress</div>
            <div className="text-sm text-muted-foreground">{doneCount}/{tasks.length}</div>
          </div>
          <div className="h-3 rounded-full bg-muted overflow-hidden">
            <div className="h-full gradient-primary transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>

        <div className="space-y-3">
          {tasks.map((t) => {
            const Icon = iconMap[t.icon] || Leaf;
            return (
              <button
                key={t.id}
                onClick={() => setTasks(tasks.map((x) => (x.id === t.id ? { ...x, done: !x.done } : x)))}
                className={`w-full glass rounded-2xl p-4 flex items-center gap-4 hover-lift text-left transition ${
                  t.done ? "opacity-60" : ""
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${t.done ? "bg-primary/20" : "bg-primary/10"}`}>
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className={`font-medium ${t.done ? "line-through" : ""}`}>{t.title}</div>
                  <div className="text-xs text-muted-foreground">{t.done ? "Completed" : "Tap to complete"}</div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${t.done ? "bg-primary border-primary" : "border-muted-foreground/30"}`}>
                  {t.done && <span className="text-primary-foreground text-xs">✓</span>}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}

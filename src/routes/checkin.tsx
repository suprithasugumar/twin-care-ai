import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { storage, detectEmergency } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/checkin")({ component: CheckIn });

type Session = {
  sleep: number; water: number; meals: string; mood: string;
  energy: number; symptoms: string; exercise: string; stress: number;
};

const store = storage<Session | null>("twincare_checkin", null);

function CheckIn() {
  const navigate = useNavigate();
  const [s, setS] = useState<Session>({
    sleep: 6, water: 1.5, meals: "", mood: "Okay",
    energy: 5, symptoms: "", exercise: "", stress: 5,
  });

  const submit = () => {
    store.set(s);
    const e = detectEmergency(s.symptoms);
    if (e.emergency) {
      toast.error("Emergency detected — routing to alert");
      navigate({ to: "/emergency" });
      return;
    }
    toast.success("Check-in submitted");
    navigate({ to: "/analysis" });
  };

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Daily Check-In</h1>
          <p className="text-muted-foreground">How are you feeling today?</p>
        </div>

        <div className="glass rounded-3xl p-6 space-y-6">
          <div>
            <Label>Sleep hours: {s.sleep}h</Label>
            <Slider value={[s.sleep]} min={0} max={12} step={0.5} onValueChange={(v) => setS({ ...s, sleep: v[0] })} />
          </div>
          <div>
            <Label>Water intake: {s.water}L</Label>
            <Slider value={[s.water]} min={0} max={5} step={0.25} onValueChange={(v) => setS({ ...s, water: v[0] })} />
          </div>
          <div>
            <Label>Meals</Label>
            <Input value={s.meals} onChange={(e) => setS({ ...s, meals: e.target.value })} placeholder="e.g. Skipped breakfast, salad, pasta" />
          </div>
          <div>
            <Label>Mood</Label>
            <div className="grid grid-cols-5 gap-2 mt-1">
              {["Great", "Good", "Okay", "Low", "Bad"].map((m) => (
                <button
                  key={m}
                  onClick={() => setS({ ...s, mood: m })}
                  className={`rounded-xl py-2 text-sm border transition ${
                    s.mood === m ? "bg-primary text-primary-foreground border-primary" : "bg-transparent hover:bg-accent/40"
                  }`}
                >{m}</button>
              ))}
            </div>
          </div>
          <div>
            <Label>Energy level: {s.energy}/10</Label>
            <Slider value={[s.energy]} min={0} max={10} step={1} onValueChange={(v) => setS({ ...s, energy: v[0] })} />
          </div>
          <div>
            <Label>Symptoms</Label>
            <Textarea value={s.symptoms} onChange={(e) => setS({ ...s, symptoms: e.target.value })} placeholder="e.g. Headache, tired" />
          </div>
          <div>
            <Label>Exercise</Label>
            <Input value={s.exercise} onChange={(e) => setS({ ...s, exercise: e.target.value })} placeholder="e.g. 30 min walk" />
          </div>
          <div>
            <Label>Stress level: {s.stress}/10</Label>
            <Slider value={[s.stress]} min={0} max={10} step={1} onValueChange={(v) => setS({ ...s, stress: v[0] })} />
          </div>
          <Button onClick={submit} size="lg" className="w-full rounded-xl">Submit to AI</Button>
        </div>
      </div>
    </AppLayout>
  );
}

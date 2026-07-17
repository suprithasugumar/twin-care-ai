import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { storage, type HealthProfile } from "@/lib/mock-data";

export const Route = createFileRoute("/profile")({ component: ProfilePage });

const store = storage<HealthProfile | null>("twincare_profile", null);

function ProfilePage() {
  const navigate = useNavigate();
  const [p, setP] = useState<HealthProfile>({
    name: "", age: 28, gender: "prefer_not", height: 170, weight: 70,
    allergies: "", medicalConditions: "", medications: "",
    avgSleep: 7, waterIntake: 2, exerciseFrequency: "2-3x/week", stressLevel: 4,
  });
  useEffect(() => { const s = store.get(); if (s) setP(s); }, []);

  const update = <K extends keyof HealthProfile>(k: K, v: HealthProfile[K]) => setP({ ...p, [k]: v });
  const save = () => {
    store.set(p);
    toast.success("Profile saved");
    navigate({ to: "/dashboard" });
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Health Profile</h1>
          <p className="text-muted-foreground">Help your twin understand you</p>
        </div>

        <div className="glass rounded-3xl p-6 space-y-5">
          <h3 className="font-semibold">Basic Info</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div><Label>Name</Label><Input value={p.name} onChange={(e) => update("name", e.target.value)} /></div>
            <div><Label>Age</Label><Input type="number" value={p.age} onChange={(e) => update("age", +e.target.value)} /></div>
            <div>
              <Label>Gender</Label>
              <select className="w-full h-9 rounded-md border border-input bg-transparent px-3 text-sm" value={p.gender} onChange={(e) => update("gender", e.target.value)}>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="non_binary">Non-binary</option>
                <option value="prefer_not">Prefer not to say</option>
              </select>
            </div>
            <div><Label>Height (cm)</Label><Input type="number" value={p.height} onChange={(e) => update("height", +e.target.value)} /></div>
            <div><Label>Weight (kg)</Label><Input type="number" value={p.weight} onChange={(e) => update("weight", +e.target.value)} /></div>
          </div>
        </div>

        <div className="glass rounded-3xl p-6 space-y-5">
          <h3 className="font-semibold">Medical</h3>
          <div><Label>Allergies</Label><Textarea value={p.allergies} onChange={(e) => update("allergies", e.target.value)} placeholder="e.g. Peanuts, penicillin" /></div>
          <div><Label>Medical Conditions</Label><Textarea value={p.medicalConditions} onChange={(e) => update("medicalConditions", e.target.value)} placeholder="e.g. Asthma" /></div>
          <div><Label>Current Medications</Label><Textarea value={p.medications} onChange={(e) => update("medications", e.target.value)} placeholder="e.g. Vitamin D, ibuprofen" /></div>
        </div>

        <div className="glass rounded-3xl p-6 space-y-5">
          <h3 className="font-semibold">Lifestyle</h3>
          <div>
            <Label>Average Sleep: {p.avgSleep}h</Label>
            <Slider value={[p.avgSleep]} min={3} max={12} step={0.5} onValueChange={(v) => update("avgSleep", v[0])} />
          </div>
          <div>
            <Label>Water Intake: {p.waterIntake}L</Label>
            <Slider value={[p.waterIntake]} min={0.5} max={5} step={0.5} onValueChange={(v) => update("waterIntake", v[0])} />
          </div>
          <div>
            <Label>Exercise Frequency</Label>
            <select className="w-full h-9 rounded-md border border-input bg-transparent px-3 text-sm" value={p.exerciseFrequency} onChange={(e) => update("exerciseFrequency", e.target.value)}>
              <option>Never</option>
              <option>1x/week</option>
              <option>2-3x/week</option>
              <option>4-5x/week</option>
              <option>Daily</option>
            </select>
          </div>
          <div>
            <Label>Stress Level: {p.stressLevel}/10</Label>
            <Slider value={[p.stressLevel]} min={0} max={10} step={1} onValueChange={(v) => update("stressLevel", v[0])} />
          </div>
        </div>

        <Button onClick={save} size="lg" className="w-full rounded-xl">Save Profile</Button>
      </div>
    </AppLayout>
  );
}

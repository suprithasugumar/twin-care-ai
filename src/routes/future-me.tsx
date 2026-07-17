import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { CircleProgress } from "@/components/CircleProgress";
import { TrendingUp, TrendingDown, Sparkles } from "lucide-react";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";

export const Route = createFileRoute("/future-me")({ component: FutureMe });

function score(sleep: number, water: number, exercise: number, stress: number, meals: number) {
  const sleepS = Math.min(100, (sleep / 8) * 100);
  const waterS = Math.min(100, (water / 2.5) * 100);
  const exS = Math.min(100, (exercise / 5) * 100);
  const stressS = Math.max(0, 100 - stress * 10);
  const mealsS = Math.min(100, meals * 20);
  return Math.round(sleepS * 0.25 + waterS * 0.2 + exS * 0.2 + stressS * 0.2 + mealsS * 0.15);
}

function FutureMe() {
  const [sleep, setSleep] = useState(5);
  const [water, setWater] = useState(1.5);
  const [exercise, setExercise] = useState(1);
  const [stress, setStress] = useState(7);
  const [meals, setMeals] = useState(2);

  const current = useMemo(() => score(sleep, water, exercise, stress, meals), [sleep, water, exercise, stress, meals]);
  const improved = useMemo(() => score(Math.max(sleep, 7.5), Math.max(water, 2.5), Math.max(exercise, 4), Math.min(stress, 3), Math.max(meals, 3)), [sleep, water, exercise, stress, meals]);

  const chartData = [
    { metric: "Energy", current: current - 5, improved: improved - 2 },
    { metric: "Hydration", current: (water / 2.5) * 100, improved: 100 },
    { metric: "Stress", current: 100 - stress * 10, improved: 70 },
    { metric: "Wellness", current, improved },
  ];

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <TrendingUp className="w-7 h-7 text-primary" /> Future Me Simulation
          </h1>
          <p className="text-muted-foreground">Move the sliders. See your future health twin change.</p>
        </div>

        <div className="glass rounded-3xl p-6 space-y-5">
          <div>
            <Label>Sleep: {sleep}h</Label>
            <Slider value={[sleep]} min={3} max={10} step={0.5} onValueChange={(v) => setSleep(v[0])} />
          </div>
          <div>
            <Label>Water intake: {water}L</Label>
            <Slider value={[water]} min={0.5} max={4} step={0.25} onValueChange={(v) => setWater(v[0])} />
          </div>
          <div>
            <Label>Exercise: {exercise}x/week</Label>
            <Slider value={[exercise]} min={0} max={7} step={1} onValueChange={(v) => setExercise(v[0])} />
          </div>
          <div>
            <Label>Stress: {stress}/10</Label>
            <Slider value={[stress]} min={0} max={10} step={1} onValueChange={(v) => setStress(v[0])} />
          </div>
          <div>
            <Label>Healthy meals: {meals}/day</Label>
            <Slider value={[meals]} min={0} max={5} step={1} onValueChange={(v) => setMeals(v[0])} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass rounded-3xl p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingDown className="w-4 h-4 text-muted-foreground" />
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Continue Current</div>
            </div>
            <CircleProgress value={current} size={160} stroke={14} sublabel="future score" />
            <div className="text-sm text-muted-foreground mt-3">If you keep your current habits</div>
          </div>
          <div className="glass-strong rounded-3xl p-6 text-center relative overflow-hidden">
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full gradient-primary opacity-30 blur-2xl" />
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <div className="text-xs uppercase tracking-wider">Improved Lifestyle</div>
            </div>
            <CircleProgress value={improved} size={160} stroke={14} sublabel="future score" color="var(--mint)" />
            <div className="text-sm text-muted-foreground mt-3">
              +{improved - current} points with small improvements
            </div>
          </div>
        </div>

        <div className="glass rounded-3xl p-6">
          <h3 className="font-semibold mb-4">Predicted metrics</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="metric" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
                <Legend />
                <Bar dataKey="current" fill="var(--muted-foreground)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="improved" fill="var(--primary)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

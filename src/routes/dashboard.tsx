import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { CircleProgress } from "@/components/CircleProgress";
import { Button } from "@/components/ui/button";
import { useUser } from "@/lib/auth";
import { mockHistory } from "@/lib/mock-data";
import {
  Droplet,
  Moon,
  Smile,
  Zap,
  Sparkles,
  ArrowRight,
  Activity,
} from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, Tooltip } from "recharts";

export const Route = createFileRoute("/dashboard")({ component: Dashboard });

function Dashboard() {
  const user = useUser();
  const latest = mockHistory[0];
  const trend = [...mockHistory].reverse().map((h) => ({ date: h.date.slice(5), score: h.healthScore }));

  const stats = [
    { icon: Droplet, label: "Water Intake", value: `${latest.water}L`, sub: "Goal 2.5L", color: "text-sky" },
    { icon: Moon, label: "Sleep", value: `${latest.sleep}h`, sub: "Goal 8h", color: "text-lavender" },
    { icon: Smile, label: "Mood", value: latest.mood, sub: "Today", color: "text-mint" },
    { icon: Zap, label: "Stress", value: `${latest.stress}/10`, sub: "Low is better", color: "text-primary" },
  ];

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back{user ? `, ${user.name}` : ""} 👋
          </h1>
          <p className="text-muted-foreground">Here's your health twin snapshot for today.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="glass rounded-3xl p-6 flex flex-col items-center justify-center">
            <div className="text-sm text-muted-foreground mb-2">Today's Health Score</div>
            <CircleProgress value={latest.healthScore} size={160} stroke={14} sublabel="of 100" />
            <div className="text-xs text-muted-foreground mt-3 text-center">
              Based on sleep, hydration, mood & stress
            </div>
          </div>

          <div className="glass rounded-3xl p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold">Health Score Trend</h3>
                <p className="text-xs text-muted-foreground">Last 5 check-ins</p>
              </div>
              <Activity className="w-5 h-5 text-primary" />
            </div>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trend}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="var(--sky)" />
                      <stop offset="100%" stopColor="var(--mint)" />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
                  <Line type="monotone" dataKey="score" stroke="url(#g1)" strokeWidth={3} dot={{ r: 4, fill: "var(--primary)" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="glass rounded-2xl p-5 hover-lift">
              <s.icon className={`w-6 h-6 ${s.color} mb-3`} />
              <div className="text-xs text-muted-foreground">{s.label}</div>
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-[10px] text-muted-foreground">{s.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="glass rounded-3xl p-6">
            <h3 className="font-semibold mb-4">Daily Goal Progress</h3>
            <div className="space-y-4">
              {[
                { label: "Hydration", value: (latest.water / 2.5) * 100 },
                { label: "Sleep", value: (latest.sleep / 8) * 100 },
                { label: "Activity", value: 70 },
                { label: "Mindfulness", value: 40 },
              ].map((g) => (
                <div key={g.label}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span>{g.label}</span>
                    <span className="text-muted-foreground">{Math.round(g.value)}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full gradient-primary transition-all"
                      style={{ width: `${Math.min(100, g.value)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-strong rounded-3xl p-6 relative overflow-hidden">
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full gradient-primary opacity-20 blur-2xl" />
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-xs font-medium uppercase tracking-wider">AI Recommendation</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Your twin suggests: Wind down early tonight</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Your sleep debt this week is 4h. Sleeping before 11 PM tonight would raise your predicted health score to <span className="font-semibold text-foreground">92</span>.
            </p>
            <Link to="/analysis">
              <Button className="rounded-full">
                See reasoning <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="glass rounded-3xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Recent Check-ins</h3>
            <Link to="/history"><Button variant="ghost" size="sm">View all</Button></Link>
          </div>
          <div className="space-y-2">
            {mockHistory.slice(0, 3).map((c) => (
              <div key={c.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-accent/30 transition">
                <div>
                  <div className="text-sm font-medium">{c.date}</div>
                  <div className="text-xs text-muted-foreground">{c.symptoms} · {c.mood}</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-lg font-bold">{c.healthScore}</div>
                  <div className="text-xs text-muted-foreground">/100</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

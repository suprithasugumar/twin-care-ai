import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { type ReactNode } from "react";
import {
  LayoutDashboard,
  User,
  ClipboardList,
  Sparkles,
  BarChart3,
  TrendingUp,
  Leaf,
  History,
  Settings,
  Moon,
  Sun,
  LogOut,
  HeartPulse,
} from "lucide-react";
import { setUser, useTheme, useUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/profile", label: "Health Profile", icon: User },
  { to: "/checkin", label: "Daily Check-In", icon: ClipboardList },
  { to: "/analysis", label: "AI Analysis", icon: Sparkles },
  { to: "/explainability", label: "Explainability", icon: BarChart3 },
  { to: "/future-me", label: "Future Me", icon: TrendingUp },
  { to: "/coach", label: "Wellness Coach", icon: Leaf },
  { to: "/history", label: "History", icon: History },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function AppLayout({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { theme, toggle } = useTheme();
  const user = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate({ to: "/login" });
  };

  return (
    <div className="min-h-screen flex w-full">
      <aside className="hidden lg:flex w-64 flex-col glass-strong m-3 rounded-3xl p-4 sticky top-3 h-[calc(100vh-1.5rem)]">
        <Link to="/" className="flex items-center gap-2 px-3 py-2 mb-4">
          <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
            <HeartPulse className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-display font-bold text-lg leading-none">TwinCare</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">AI Health Twin</div>
          </div>
        </Link>
        <nav className="flex-1 space-y-1 overflow-y-auto">
          {nav.map((item) => {
            const active = pathname === item.to;
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                  active
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-foreground/70 hover:bg-accent/40 hover:text-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-4 pt-4 border-t space-y-2">
          {user && (
            <div className="px-3 py-2 text-xs">
              <div className="font-medium">{user.name}</div>
              <div className="text-muted-foreground truncate">{user.email}</div>
            </div>
          )}
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={toggle} className="flex-1">
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout} className="flex-1">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </aside>
      <main className="flex-1 p-4 lg:p-8 min-w-0">
        <div className="lg:hidden mb-4 flex items-center justify-between glass rounded-2xl p-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <HeartPulse className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold">TwinCare</span>
          </Link>
          <Button variant="ghost" size="sm" onClick={toggle}>
            {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </Button>
        </div>
        {children}
      </main>
    </div>
  );
}

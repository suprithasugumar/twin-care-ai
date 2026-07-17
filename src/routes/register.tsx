import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HeartPulse } from "lucide-react";
import { setUser } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/register")({ component: RegisterPage });

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return toast.error("Fill in your details");
    setUser({ email, name });
    toast.success("Your health twin is ready!");
    navigate({ to: "/profile" });
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="glass-strong rounded-3xl p-8 w-full max-w-md">
        <Link to="/" className="flex items-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
            <HeartPulse className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-lg">TwinCare</span>
        </Link>
        <h1 className="text-2xl font-bold mb-1">Create your health twin</h1>
        <p className="text-sm text-muted-foreground mb-6">Explainable AI, tailored to you</p>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Alex Rivera" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          </div>
          <Button type="submit" className="w-full h-11 rounded-xl">Create account</Button>
        </form>
        <p className="text-sm text-muted-foreground mt-6 text-center">
          Have an account? <Link to="/login" className="text-primary font-medium">Log in</Link>
        </p>
      </div>
    </div>
  );
}

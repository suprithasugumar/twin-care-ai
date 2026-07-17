import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTheme, setUser } from "@/lib/auth";
import { Moon, Sun, Bell, Shield, LogOut } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({ component: SettingsPage });

function SettingsPage() {
  const { theme, toggle } = useTheme();
  const [notifs, setNotifs] = useState(true);
  const [priv, setPriv] = useState(true);
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Personalize your twin</p>
        </div>

        <div className="glass rounded-3xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {theme === "light" ? <Sun className="w-5 h-5 text-primary" /> : <Moon className="w-5 h-5 text-primary" />}
              <div>
                <Label>Theme</Label>
                <div className="text-xs text-muted-foreground">Switch between light and dark</div>
              </div>
            </div>
            <Switch checked={theme === "dark"} onCheckedChange={toggle} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-primary" />
              <div>
                <Label>Notifications</Label>
                <div className="text-xs text-muted-foreground">Daily check-in reminders</div>
              </div>
            </div>
            <Switch checked={notifs} onCheckedChange={setNotifs} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-primary" />
              <div>
                <Label>Private mode</Label>
                <div className="text-xs text-muted-foreground">Keep health data local</div>
              </div>
            </div>
            <Switch checked={priv} onCheckedChange={setPriv} />
          </div>
        </div>

        <Button
          variant="destructive"
          className="w-full rounded-xl h-11"
          onClick={() => {
            setUser(null);
            toast.success("Logged out");
            navigate({ to: "/" });
          }}
        >
          <LogOut className="w-4 h-4 mr-2" /> Log out
        </Button>
      </div>
    </AppLayout>
  );
}

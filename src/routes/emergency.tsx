import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { AlertOctagon, Phone, MapPin } from "lucide-react";
import { storage, detectEmergency } from "@/lib/mock-data";

export const Route = createFileRoute("/emergency")({ component: EmergencyPage });

const checkin = storage<{ symptoms: string } | null>("twincare_checkin", null);

function EmergencyPage() {
  const s = checkin.get() || { symptoms: "chest pain" };
  const { reasons } = detectEmergency(s.symptoms);

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        <div className="rounded-3xl p-8 border-2 border-destructive bg-destructive/5 shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-destructive flex items-center justify-center animate-pulse">
              <AlertOctagon className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-destructive font-semibold">Alert</div>
              <h1 className="text-2xl font-bold text-destructive">Potential Medical Emergency</h1>
            </div>
          </div>

          <div className="glass rounded-2xl p-4 mb-4">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Reason</div>
            <ul className="text-sm space-y-1">
              {reasons.length > 0 ? (
                reasons.map((r) => <li key={r}>• Reported: <strong>{r}</strong></li>)
              ) : (
                <li>• Symptoms suggest a possible emergency.</li>
              )}
            </ul>
          </div>

          <div className="glass rounded-2xl p-4 mb-6">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Recommended Action</div>
            <p className="text-sm">
              Seek immediate medical attention. Call your local emergency number or go to the nearest hospital.
              Do not drive yourself if you are alone or feel faint.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="lg" className="flex-1 bg-destructive hover:bg-destructive/90 text-white rounded-xl h-12">
              <Phone className="w-4 h-4 mr-2" /> Call Emergency
            </Button>
            <Button size="lg" variant="outline" className="flex-1 rounded-xl h-12">
              <MapPin className="w-4 h-4 mr-2" /> Nearest Hospital
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mt-6">
            TwinCare AI does not provide treatment instructions in emergencies. This alert is based on symptom keywords and is not a diagnosis.
          </p>

          <div className="mt-6 text-center">
            <Link to="/dashboard" className="text-sm underline text-muted-foreground">Back to dashboard</Link>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

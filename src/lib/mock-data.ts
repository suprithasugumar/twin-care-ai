// Mock data & services for TwinCare AI

export type HealthProfile = {
  name: string;
  age: number;
  gender: string;
  height: number;
  weight: number;
  allergies: string;
  medicalConditions: string;
  medications: string;
  avgSleep: number;
  waterIntake: number;
  exerciseFrequency: string;
  stressLevel: number;
};

export type CheckIn = {
  id: string;
  date: string;
  sleep: number;
  water: number;
  meals: string;
  mood: string;
  energy: number;
  symptoms: string;
  exercise: string;
  stress: number;
  healthScore: number;
  recommendation: string;
};

export type FollowUpQuestion = {
  id: string;
  question: string;
  options: string[];
};

export const EMERGENCY_KEYWORDS = [
  "chest pain",
  "difficulty breathing",
  "can't breathe",
  "severe bleeding",
  "loss of consciousness",
  "unconscious",
  "stroke",
];

export function detectEmergency(text: string): { emergency: boolean; reasons: string[] } {
  const t = text.toLowerCase();
  const reasons = EMERGENCY_KEYWORDS.filter((k) => t.includes(k));
  return { emergency: reasons.length > 0, reasons };
}

export function generateFollowUps(symptoms: string): FollowUpQuestion[] {
  const s = symptoms.toLowerCase();
  const qs: FollowUpQuestion[] = [];
  if (s.includes("headache") || s.includes("head")) {
    qs.push(
      { id: "loc", question: "Where is the pain located?", options: ["Forehead", "Temples", "Back of head", "All over"] },
      { id: "fever", question: "Do you have a fever?", options: ["Yes", "No", "Not sure"] },
      { id: "dizzy", question: "Are you feeling dizzy?", options: ["Yes", "No", "A little"] },
      { id: "before", question: "Have you experienced this before?", options: ["Often", "Sometimes", "First time"] },
    );
  }
  if (s.includes("stomach") || s.includes("nausea")) {
    qs.push(
      { id: "when", question: "When did it start?", options: ["Just now", "A few hours ago", "Yesterday"] },
      { id: "food", question: "Did you eat something unusual?", options: ["Yes", "No", "Maybe"] },
    );
  }
  if (qs.length === 0) {
    qs.push(
      { id: "duration", question: "How long have you felt this way?", options: ["<1 hour", "A few hours", "All day", "Days"] },
      { id: "severity", question: "How severe is it?", options: ["Mild", "Moderate", "Severe"] },
    );
  }
  qs.push({ id: "meds", question: "Are you taking any medication?", options: ["Yes", "No"] });
  return qs;
}

export function analyzeSymptoms(symptoms: string, sleep: number, water: number) {
  const s = symptoms.toLowerCase();
  if (s.includes("headache")) {
    const dehydrated = water < 3;
    const undersleep = sleep < 6;
    return {
      likelyCause: dehydrated ? "Dehydration & Sleep Deprivation" : "Tension Headache",
      confidence: dehydrated && undersleep ? 87 : 72,
      reasonsConsidered: [
        `Water intake: ${water}L (recommended 2.5L+)`,
        `Sleep: ${sleep}h (recommended 7-9h)`,
        "Reported symptom: headache",
        "No fever reported",
      ],
      evidence: [
        "Low hydration correlates strongly with tension headaches (Mayo Clinic)",
        "Sleep debt increases pain sensitivity",
        "No neurological red flags",
      ],
      alternatives: [
        { name: "Migraine", confidence: 15, why: ["No aura reported", "No light sensitivity", "No prior migraine history"] },
        { name: "Sinus Infection", confidence: 8, why: ["No facial pressure", "No congestion"] },
        { name: "Hospital Visit", confidence: 2, why: ["No chest pain", "No breathing difficulty", "Symptoms recent & mild"] },
      ],
      nextAction: "Drink 500ml of water now, rest in a dim room for 20 minutes, and reassess in 1 hour.",
      tips: [
        "Aim for 2.5L water daily",
        "Sleep before 11 PM tonight",
        "Eat a balanced breakfast tomorrow",
        "Reduce screen time",
      ],
    };
  }
  return {
    likelyCause: "Lifestyle Imbalance",
    confidence: 65,
    reasonsConsidered: [
      `Sleep: ${sleep}h`,
      `Water: ${water}L`,
      `Symptoms: ${symptoms || "none reported"}`,
    ],
    evidence: ["Recent lifestyle patterns from your health twin", "No emergency indicators"],
    alternatives: [
      { name: "Stress Response", confidence: 20, why: ["Moderate stress levels", "No physical symptoms"] },
      { name: "Viral Infection", confidence: 10, why: ["No fever", "No body aches"] },
    ],
    nextAction: "Monitor for 24 hours. Improve hydration and sleep tonight.",
    tips: ["Hydrate", "Sleep 7-8h", "Light exercise", "Balanced meals"],
  };
}

export function generateWellnessPlan() {
  return [
    { id: "1", title: "Drink 2.5L Water", icon: "droplet", done: false },
    { id: "2", title: "Sleep Before 11 PM", icon: "moon", done: false },
    { id: "3", title: "Walk 30 Minutes", icon: "footprints", done: false },
    { id: "4", title: "Eat a Balanced Breakfast", icon: "utensils", done: false },
    { id: "5", title: "Meditate 10 Minutes", icon: "brain", done: false },
  ];
}

export const mockHistory: CheckIn[] = [
  { id: "1", date: "2026-07-16", sleep: 7, water: 2.5, meals: "3 balanced", mood: "Good", energy: 8, symptoms: "None", exercise: "30min walk", stress: 3, healthScore: 88, recommendation: "Keep it up!" },
  { id: "2", date: "2026-07-15", sleep: 5, water: 1.5, meals: "Skipped breakfast", mood: "Tired", energy: 4, symptoms: "Headache", exercise: "None", stress: 7, healthScore: 62, recommendation: "Hydrate & rest" },
  { id: "3", date: "2026-07-14", sleep: 8, water: 3, meals: "3 balanced", mood: "Great", energy: 9, symptoms: "None", exercise: "Gym 45min", stress: 2, healthScore: 94, recommendation: "Excellent day" },
  { id: "4", date: "2026-07-13", sleep: 6, water: 2, meals: "2 meals", mood: "Okay", energy: 6, symptoms: "Slight fatigue", exercise: "20min", stress: 5, healthScore: 74, recommendation: "Sleep earlier" },
  { id: "5", date: "2026-07-12", sleep: 7.5, water: 2.8, meals: "3 meals", mood: "Good", energy: 8, symptoms: "None", exercise: "Yoga", stress: 3, healthScore: 86, recommendation: "Well balanced" },
];

// Simple localStorage helpers
export function storage<T>(key: string, fallback: T): { get: () => T; set: (v: T) => void } {
  return {
    get: () => {
      if (typeof window === "undefined") return fallback;
      try {
        const v = window.localStorage.getItem(key);
        return v ? (JSON.parse(v) as T) : fallback;
      } catch {
        return fallback;
      }
    },
    set: (v: T) => {
      if (typeof window === "undefined") return;
      window.localStorage.setItem(key, JSON.stringify(v));
    },
  };
}

import { useEffect, useState } from "react";

const KEY = "twincare_user";

export type User = { email: string; name: string };

export function getUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(KEY);
    return v ? JSON.parse(v) : null;
  } catch {
    return null;
  }
}

export function setUser(u: User | null) {
  if (typeof window === "undefined") return;
  if (u) window.localStorage.setItem(KEY, JSON.stringify(u));
  else window.localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("twincare-auth"));
}

export function useUser() {
  const [user, setU] = useState<User | null>(null);
  useEffect(() => {
    setU(getUser());
    const h = () => setU(getUser());
    window.addEventListener("twincare-auth", h);
    return () => window.removeEventListener("twincare-auth", h);
  }, []);
  return user;
}

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    const saved = (window.localStorage.getItem("twincare_theme") as "light" | "dark") || "light";
    setTheme(saved);
    document.documentElement.classList.toggle("dark", saved === "dark");
  }, []);
  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    window.localStorage.setItem("twincare_theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  };
  return { theme, toggle };
}

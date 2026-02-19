"use client";

import { useEffect, useState, startTransition } from "react";
import { type Theme, ThemeContext } from "./ThemeContext"; // Import from the other file

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const initial = stored ?? (systemDark ? "dark" : "light");

    startTransition(() => {
      setTheme(initial);
      setMounted(true);
    });
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  const toggle = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // React 19: Pass value directly to the Context
  return (
    <ThemeContext value={{ theme, toggle, mounted }}>{children}</ThemeContext>
  );
}

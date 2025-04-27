"use client"

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="justify-start flex items-center gap-2 px-2 py-2">
        Toggle theme
      </Button>
    );
  }

  const isDark = theme === "dark";
  const nextTheme = isDark ? "light" : "dark";
  const label = isDark ? "Light mode" : "Dark mode";
  const Icon = isDark ? Sun : Moon;

  return (
    <Button
      variant="ghost"
      size="sm"
      className="w-full justify-start flex items-center gap-2 px-2 py-2 hover:bg-transparent dark:hover:bg-slate-700 text-gray-300 hover:text-gray-300 dark:text-gray-300 dark:hover:text-white"
      onClick={() => setTheme(nextTheme)}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Button>
  );
}

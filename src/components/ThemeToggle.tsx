"use client";

import { useTheme } from "@/providers/ThemeProvider";
import { Button } from "./Button";

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle = ({ className = "" }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();
  
  const isDark = theme.colors.background === "#111827";

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className={className}
    >
      {isDark ? "☀️" : "🌙"}
    </Button>
  );
};
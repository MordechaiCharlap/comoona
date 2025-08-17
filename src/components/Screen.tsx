"use client";

import { useTheme } from "@/providers/ThemeProvider";
import { ReactNode } from "react";

interface ScreenProps {
  children: ReactNode;
  className?: string;
}

export const Screen = ({ children, className = "" }: ScreenProps) => {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen transition-colors ${className}`}
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.text
      }}
    >
      {children}
    </div>
  );
};
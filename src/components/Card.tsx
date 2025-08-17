"use client";

import { useTheme } from "@/providers/ThemeProvider";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  padding?: "sm" | "md" | "lg";
}

export const Card = ({ children, className = "", onClick, padding = "md" }: CardProps) => {
  const { theme } = useTheme();
  
  const paddingClasses = {
    sm: "p-3",
    md: "p-4",
    lg: "p-6"
  };

  return (
    <div
      className={`rounded-lg border transition-colors ${paddingClasses[padding]} ${
        onClick ? "cursor-pointer hover:opacity-80" : ""
      } ${className}`}
      style={{
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.border,
        boxShadow: theme.shadows.sm,
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
"use client";

import { useTheme } from "@/providers/ThemeProvider";
import { ReactNode } from "react";

interface TextProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "muted";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  weight?: "normal" | "medium" | "semibold" | "bold";
  className?: string;
}

export const Text = ({ 
  children, 
  variant = "primary", 
  size = "md", 
  weight = "normal",
  className = ""
}: TextProps) => {
  const { theme } = useTheme();
  
  const sizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl"
  };
  
  const weightClasses = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold"
  };
  
  const getTextColor = () => {
    switch (variant) {
      case "primary":
        return theme.colors.text;
      case "secondary":
        return theme.colors.textSecondary;
      case "muted":
        return theme.colors.secondary;
      default:
        return theme.colors.text;
    }
  };

  return (
    <span
      className={`${sizeClasses[size]} ${weightClasses[weight]} ${className}`}
      style={{ color: getTextColor() }}
    >
      {children}
    </span>
  );
};
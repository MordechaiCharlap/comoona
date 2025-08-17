"use client";

import { useTheme } from "@/providers/ThemeProvider";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
}

export const Button = ({ 
  children, 
  onClick, 
  variant = "primary", 
  size = "md", 
  disabled = false,
  className = ""
}: ButtonProps) => {
  const { theme } = useTheme();
  
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg"
  };
  
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return {
          backgroundColor: theme.colors.primary,
          color: "white",
          border: "none"
        };
      case "secondary":
        return {
          backgroundColor: "transparent",
          color: theme.colors.text,
          border: `1px solid ${theme.colors.border}`
        };
      case "ghost":
        return {
          backgroundColor: "transparent",
          color: theme.colors.primary,
          border: "none"
        };
      default:
        return {};
    }
  };

  return (
    <button
      className={`rounded-lg font-medium transition-all hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses[size]} ${className}`}
      style={getVariantStyles()}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
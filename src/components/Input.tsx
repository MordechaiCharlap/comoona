"use client";

import { useTheme } from "@/providers/ThemeProvider";
import { InputHTMLAttributes } from "react";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  size?: "sm" | "md" | "lg";
}

export const Input = ({ 
  label, 
  error, 
  size = "md", 
  className = "",
  ...props 
}: InputProps) => {
  const { theme } = useTheme();
  
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-4 py-3 text-lg"
  };

  return (
    <div className="w-full">
      {label && (
        <label 
          className="block text-sm font-medium mb-2"
          style={{ color: theme.colors.text }}
        >
          {label}
        </label>
      )}
      <input
        className={`w-full rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50 ${sizeClasses[size]} ${className}`}
        style={{
          backgroundColor: theme.colors.surface,
          borderColor: error ? "#ef4444" : theme.colors.border,
          color: theme.colors.text,
          focusRingColor: theme.colors.primary
        }}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};
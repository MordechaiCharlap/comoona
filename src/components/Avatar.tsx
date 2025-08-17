"use client";

import { useTheme } from "@/providers/ThemeProvider";
import Image from "next/image";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg" | "xl";
  fallback?: string;
  className?: string;
}

export const Avatar = ({ 
  src, 
  alt = "Avatar", 
  size = "md", 
  fallback,
  className = ""
}: AvatarProps) => {
  const { theme } = useTheme();
  
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-16 h-16 text-lg"
  };
  
  const sizeValues = {
    sm: 32,
    md: 40,
    lg: 48,
    xl: 64
  };

  if (src) {
    return (
      <div className={`relative rounded-full overflow-hidden ${sizeClasses[size]} ${className}`}>
        <Image
          src={src}
          alt={alt}
          width={sizeValues[size]}
          height={sizeValues[size]}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`rounded-full flex items-center justify-center font-medium ${sizeClasses[size]} ${className}`}
      style={{
        backgroundColor: theme.colors.primary,
        color: "white"
      }}
    >
      {fallback || alt.charAt(0).toUpperCase()}
    </div>
  );
};
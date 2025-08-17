import React, { ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider>
      {/* Wrap other providers here */}
      {children}
    </ThemeProvider>
  );
};

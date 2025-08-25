import React, { ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";
import { AuthProvider } from "./AuthProvider";
import { UserProvider } from "./UserProvider";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <UserProvider>
          {children}
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

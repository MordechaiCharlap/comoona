"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { lightTheme, darkTheme } from "@/styles/theme";

type ThemeContextType = {
  theme: typeof lightTheme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: darkTheme,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState(darkTheme);

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

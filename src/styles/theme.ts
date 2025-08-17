// src/styles/theme.ts
export const lightTheme = {
  colors: {
    background: "#f7f7f8", // main background
    surface: "#ffffff", // cards, panels
    primary: "#10a37f", // main action color (buttons/links)
    secondary: "#5c5c5c", // secondary actions/text
    text: "#111827", // main text
    textSecondary: "#6b7280", // muted text
    border: "#e5e7eb", // card/input borders
    hover: "#f0f0f0", // hover for buttons/cards
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
  },
  fontSizes: {
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.5rem",
  },
  borderRadius: "12px",
  shadows: {
    sm: "0 1px 2px rgba(0,0,0,0.05)",
    md: "0 4px 6px rgba(0,0,0,0.1)",
    lg: "0 10px 15px rgba(0,0,0,0.15)",
  },
};

export const darkTheme = {
  colors: {
    background: "#111827", // main dark background
    surface: "#1f2937", // dark panels/cards
    primary: "#10a37f", // action color remains same for contrast
    secondary: "#d1d5db", // muted text in dark
    text: "#f9fafb", // main text in dark
    textSecondary: "#9ca3af", // secondary text in dark
    border: "#374151", // panel/input borders
    hover: "#374151", // hover for dark buttons/cards
  },
  spacing: lightTheme.spacing,
  fontSizes: lightTheme.fontSizes,
  borderRadius: lightTheme.borderRadius,
  shadows: lightTheme.shadows,
};

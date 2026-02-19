// ThemeContext.tsx
import { createContext, useContext } from "react";

export type Theme = "light" | "dark";

export interface ThemeContextType {
  theme: Theme;
  toggle: () => void;
  mounted: boolean;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};

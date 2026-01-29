import { createContext, useContext } from "react";

export const ThemeContext = createContext<{
    setTheme: (theme: any) => void;
} | null>(null);

export const useThemeContext = () => {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error("ThemeContext not found");
    return ctx;
};
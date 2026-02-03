import { createContext, useContext } from "react";

/**
 * Context for updating the app theme.
 */
export const ThemeContext = createContext<{
    setTheme: (theme: any) => void;
} | null>(null);

/**
 * Hook for accessing ThemeContext.
 */
export const useThemeContext = () => {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error("ThemeContext not found");
    return ctx;
};
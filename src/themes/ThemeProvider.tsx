import React, { createContext, useContext } from "react";
import { StyleSheet } from "react-native";
import type { Theme, ThemeMode, ColorScheme } from "./types";
import { useThemeStore } from "../store/themeStore";

interface ThemeContextType {
  theme: Theme;
  setThemeMode: (mode: ThemeMode) => Promise<void>;
  setColorScheme: (scheme: ColorScheme) => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useThemeStore((state) => state.theme);
  const setThemeMode = useThemeStore((state) => state.setThemeMode);
  const setColorScheme = useThemeStore((state) => state.setColorScheme);

  const value = {
    theme,
    setThemeMode,
    setColorScheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

// 保持旧的 useThemeContext 以保证兼容性
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};

// 新的 useTheme hook（可选使用）
export const useTheme = () => {
  const theme = useThemeStore((state) => state.theme);
  const setThemeMode = useThemeStore((state) => state.setThemeMode);
  const setColorScheme = useThemeStore((state) => state.setColorScheme);

  return {
    theme,
    setThemeMode,
    setColorScheme,
  };
};

const createThemedStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    card: {
      backgroundColor: theme.surface,
      borderRadius: 12,
      padding: 16,
    },
    shadow: {
      shadowColor: theme.text.primary,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
  });
};

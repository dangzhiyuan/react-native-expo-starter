import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { ThemeMode, ColorScheme, Theme } from "../themes/types";
import { createTheme } from "../themes/themeBuilder";

interface ThemeState {
  mode: ThemeMode;
  scheme: ColorScheme;
  theme: Theme;
  setThemeMode: (mode: ThemeMode) => Promise<void>;
  setColorScheme: (scheme: ColorScheme) => Promise<void>;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: "light",
      scheme: "default",
      theme: createTheme("light", "default"),
      setThemeMode: async (mode) => {
        set((state) => ({
          mode,
          theme: createTheme(mode, state.scheme),
        }));
      },
      setColorScheme: async (scheme) => {
        set((state) => ({
          scheme,
          theme: createTheme(state.mode, scheme),
        }));
      },
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

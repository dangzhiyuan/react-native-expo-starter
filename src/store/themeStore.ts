import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../themes/colors';
import type { SupportedTheme } from '../constants';

const THEME_STORAGE_KEY = '@app_theme';

interface ThemeState {
  theme: SupportedTheme;
  colors: typeof colors.default;
  setTheme: (theme: SupportedTheme) => Promise<void>;
  initializeTheme: () => Promise<void>;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'default',
  colors: colors.default,
  setTheme: async (theme) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, theme);
      set({ theme, colors: colors[theme] });
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  },
  initializeTheme: async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme && savedTheme in colors) {
        set({ 
          theme: savedTheme as SupportedTheme, 
          colors: colors[savedTheme as SupportedTheme] 
        });
      }
    } catch (error) {
      console.error('Failed to load theme:', error);
    }
  },
})); 
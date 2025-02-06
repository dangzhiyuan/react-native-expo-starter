import React, { createContext, useContext, useEffect, useState } from 'react';
import { StyleSheet, useColorScheme, Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTheme } from './themes';
import type { DisplayMode, ColorTheme, Theme } from './types';

const THEME_MODE_KEY = '@app_display_mode';
const COLOR_THEME_KEY = '@app_color_theme';

interface ThemeContextValue {
  theme: Theme;
  styles: ReturnType<typeof createThemedStyles>;
  setDisplayMode: (mode: DisplayMode) => Promise<void>;
  setColorTheme: (theme: ColorTheme) => Promise<void>;
  displayMode: DisplayMode;
  colorTheme: ColorTheme;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [displayMode, setDisplayModeState] = useState<DisplayMode>('system');
  const [colorTheme, setColorThemeState] = useState<ColorTheme>('default');
  const [theme, setTheme] = useState<Theme>(
    getTheme(systemColorScheme === 'dark' ? 'dark' : 'light', 'default')
  );

  // 加载保存的主题设置
  useEffect(() => {
    const loadSavedTheme = async () => {
      try {
        const [savedMode, savedColor] = await Promise.all([
          AsyncStorage.getItem(THEME_MODE_KEY),
          AsyncStorage.getItem(COLOR_THEME_KEY),
        ]);
        if (savedMode) setDisplayModeState(savedMode as DisplayMode);
        if (savedColor) setColorThemeState(savedColor as ColorTheme);
      } catch (error) {
        console.error('Failed to load theme settings:', error);
      }
    };

    loadSavedTheme();
  }, []);

  // 监听系统主题变化
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (displayMode === 'system') {
        setTheme(getTheme(colorScheme === 'dark' ? 'dark' : 'light', colorTheme));
      }
    });

    return () => subscription.remove();
  }, [displayMode, colorTheme]);

  // 更新主题
  useEffect(() => {
    const mode = displayMode === 'system' 
      ? (systemColorScheme === 'dark' ? 'dark' : 'light')
      : displayMode;
    setTheme(getTheme(mode, colorTheme));
  }, [displayMode, colorTheme, systemColorScheme]);

  const setDisplayMode = async (mode: DisplayMode) => {
    try {
      await AsyncStorage.setItem(THEME_MODE_KEY, mode);
      setDisplayModeState(mode);
    } catch (error) {
      console.error('Failed to save display mode:', error);
    }
  };

  const setColorTheme = async (color: ColorTheme) => {
    try {
      await AsyncStorage.setItem(COLOR_THEME_KEY, color);
      setColorThemeState(color);
    } catch (error) {
      console.error('Failed to save color theme:', error);
    }
  };

  const styles = createThemedStyles(theme);

  return (
    <ThemeContext.Provider 
      value={{ 
        theme,
        styles,
        displayMode,
        colorTheme,
        setDisplayMode,
        setColorTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

const createThemedStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      padding: 16,
    },
    shadow: {
      shadowColor: theme.colors.text.primary,
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
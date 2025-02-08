import { DarkTheme, DefaultTheme, Theme } from "@react-navigation/native";
import { useThemeContext } from "../themes/ThemeProvider";

export const useNavigationTheme = () => {
  const { theme } = useThemeContext();

  const navigationTheme: Theme = {
    dark: theme.isDark,
    colors: {
      primary: theme.primary,
      background: theme.background,
      card: theme.surface,
      text: theme.text.primary,
      border: theme.border,
      notification: theme.error,
    },
    fonts: DefaultTheme.fonts,
  };

  return navigationTheme;
};

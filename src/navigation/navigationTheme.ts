import { DarkTheme, DefaultTheme, Theme } from '@react-navigation/native';
import { useThemeContext } from '../themes/ThemeProvider';

export const useNavigationTheme = () => {
  const { theme } = useThemeContext();

  const navigationTheme: Theme = {
    dark: false,
    colors: {
      primary: theme.colors.primary,
      background: theme.colors.background,
      card: theme.colors.surface,
      text: theme.colors.text.primary,
      border: theme.colors.border,
      notification: theme.colors.error,
    },
    fonts: DefaultTheme.fonts,
  };

  return navigationTheme;
}; 
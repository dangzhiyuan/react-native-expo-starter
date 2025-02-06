import { useThemeStore } from '../store/themeStore';
import { spacing, getResponsiveSpacing } from '../themes/spacing';
import { typography } from '../themes/typography';

export const useTheme = () => {
  const { theme, colors, setTheme, initializeTheme } = useThemeStore();

  return {
    theme,
    colors,
    spacing,
    getResponsiveSpacing,
    typography: typography[theme],
    setTheme,
    initializeTheme,
  };
}; 
import type { Theme, ThemeMode, ColorScheme } from "./types";
import { typography } from "./typography";
import { lightDefault, darkDefault } from "./colors/default";
import { lightBlue, darkBlue } from "./colors/blue";
import { lightOrange, darkOrange } from "./colors/orange";
import { lightGray, darkGray } from "./colors/gray";
import { lightPink, darkPink } from "./colors/pink";
import { lightPastel, darkPastel } from "./colors/pastel";

// 主题映射
const themes: Record<ColorScheme, Record<ThemeMode, typeof lightDefault>> = {
  default: {
    light: lightDefault,
    dark: darkDefault,
  },
  blue: {
    light: lightBlue,
    dark: darkBlue,
  },
  orange: {
    light: lightOrange,
    dark: darkOrange,
  },
  gray: {
    light: lightGray,
    dark: darkGray,
  },
  pink: {
    light: lightPink,
    dark: darkPink,
  },
  pastel: {
    light: lightPastel,
    dark: darkPastel,
  },
};

export const createTheme = (mode: ThemeMode, scheme: ColorScheme): Theme => {
  const themeColors = themes[scheme][mode];

  return {
    isDark: mode === "dark",
    colorScheme: scheme,
    ...themeColors,
    typography,
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
    },
  };
};

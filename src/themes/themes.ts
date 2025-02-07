import type { Theme, ColorTheme } from "./types";
import {
  fontSizes,
  spacing,
  moderateScale,
  isTablet,
} from "../utils/responsive";

const getResponsiveTypography = () => ({
  sizes: {
    h1: moderateScale(isTablet ? 32 : 24),
    h2: moderateScale(isTablet ? 28 : 20),
    h3: moderateScale(isTablet ? 24 : 18),
    body: moderateScale(isTablet ? 18 : 16),
    small: moderateScale(isTablet ? 16 : 14),
  },
  spacing: {
    xs: moderateScale(4),
    sm: moderateScale(8),
    md: moderateScale(16),
    lg: moderateScale(24),
    xl: moderateScale(32),
  },
});

const typography = {
  sizes: fontSizes,
  spacing: spacing,
  weights: {
    h1: "600",
    h2: "600",
    h3: "500",
    body: "normal",
    small: "normal",
  } as const,
};

const colorThemes = {
  default: {
    primary: "#60a5fa",
    secondary: "#232838",
  },
  blue: {
    primary: "#0A84FF",
    secondary: "#5E5CE6",
  },
  orange: {
    primary: "#FF9500",
    secondary: "#FF3B30",
  },
};

const createTheme = (isDark: boolean, colorTheme: ColorTheme): Theme => {
  const baseColors = colorThemes[colorTheme];

  return {
    isDark,
    colorTheme,
    colors: {
      ...baseColors,
      shadowColor: isDark ? "#ffffff" : "#000000",
      background: isDark ? "#000000" : "#F2F2F7",
      // 改动过
      surface: isDark ? "#232838" : "#FFFFFF",
      error: isDark ? "#FF453A" : "#FF3B30",
      success: isDark ? "#32D74B" : "#34C759",
      warning: isDark ? "#FF9F0A" : "#FF9500",
      border: isDark ? "#38383A" : "#C7C7CC",
      hover: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
      text: {
        primary: isDark ? "#FFFFFF" : "#000000",
        secondary: "#8E8E93",
        disabled: isDark ? "#48484A" : "#C7C7CC",
        inverse: isDark ? "#000000" : "#FFFFFF",
        error: isDark ? "#FF453A" : "#FF3B30",
      },
    },
    typography,
    shadows: {
      small: {
        shadowColor: "string",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
        elevation: 2,
      },
      medium: {
        shadowColor: "string",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3.5,
        elevation: 5,
      },
      large: {
        shadowColor: "string",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 10,
      },
    },
  };
};

export const getTheme = (
  displayMode: "light" | "dark",
  colorTheme: ColorTheme
): Theme => {
  return createTheme(displayMode === "dark", colorTheme);
};

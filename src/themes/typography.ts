import { isTablet } from "../utils/platform";
import type { SupportedTheme } from "../constants";
import { fontSizes, spacing } from "../utils/responsive";

type FontWeight = "400" | "500" | "600" | "700" | "800" | "900";

const baseTypography = {
  sizes: {
    h1: isTablet() ? 32 : 24,
    h2: isTablet() ? 28 : 20,
    h3: isTablet() ? 24 : 18,
    body: isTablet() ? 18 : 16,
    small: isTablet() ? 16 : 14,
  },
};

export const typography = {
  sizes: fontSizes,
  spacing: spacing,
  weights: {
    h1: "600" as const,
    h2: "600" as const,
    h3: "500" as const,
    body: "normal" as const,
    small: "normal" as const,
  },
  default: {
    ...baseTypography,
    weights: {
      h1: "700" as FontWeight,
      h2: "600" as FontWeight,
      h3: "600" as FontWeight,
      body: "400" as FontWeight,
      small: "400" as FontWeight,
    },
    fontFamily: {
      regular: "System",
      medium: "System",
      bold: "System",
    },
  },
  blue: {
    ...baseTypography,
    weights: {
      h1: "800" as FontWeight,
      h2: "700" as FontWeight,
      h3: "600" as FontWeight,
      body: "500" as FontWeight,
      small: "400" as FontWeight,
    },
    fontFamily: {
      regular: "System",
      medium: "System",
      bold: "System",
    },
  },
  orange: {
    ...baseTypography,
    weights: {
      h1: "900" as FontWeight,
      h2: "700" as FontWeight,
      h3: "700" as FontWeight,
      body: "500" as FontWeight,
      small: "400" as FontWeight,
    },
    fontFamily: {
      regular: "System",
      medium: "System",
      bold: "System",
    },
  },
};

export type ThemeTypography = typeof typography.default;

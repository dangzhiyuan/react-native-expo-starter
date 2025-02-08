import { alpha } from "../../utils/theme";

// 默认主题的基础色板
const defaultPalette = {
  white: "#FFFFFF",
  black: "#000000",
  gray50: "#F9FAFB",
  gray100: "#F3F4F6",
  gray700: "#374151",
  gray800: "#1F2937",
  gray900: "#111827",
  blue500: "#3B82F6",
  blue600: "#2563EB",
  red500: "#EF4444",
  yellow500: "#F59E0B",
  green500: "#10B981",
};

// 浅色模式
export const lightDefault = {
  primary: defaultPalette.blue600,
  secondary: defaultPalette.blue500,
  surface: defaultPalette.white,
  background: defaultPalette.gray50,
  border: defaultPalette.gray100,
  hover: alpha(defaultPalette.blue500, 0.08),
  error: defaultPalette.red500,
  warning: defaultPalette.yellow500,
  success: defaultPalette.green500,
  text: {
    primary: defaultPalette.gray900,
    secondary: defaultPalette.gray700,
    disabled: defaultPalette.gray100,
    inverse: defaultPalette.white,
    error: defaultPalette.red500,
  },
};

// 深色模式
export const darkDefault = {
  primary: defaultPalette.blue500,
  secondary: defaultPalette.blue600,
  surface: defaultPalette.gray900,
  background: defaultPalette.gray800,
  border: defaultPalette.gray700,
  hover: alpha(defaultPalette.blue500, 0.08),
  error: defaultPalette.red500,
  warning: defaultPalette.yellow500,
  success: defaultPalette.green500,
  text: {
    primary: defaultPalette.white,
    secondary: defaultPalette.gray100,
    disabled: defaultPalette.gray700,
    inverse: defaultPalette.gray900,
    error: defaultPalette.red500,
  },
};

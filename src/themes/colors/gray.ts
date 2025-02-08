import { alpha } from "../../utils/theme";

// 灰色主题的基础色板
const grayPalette = {
  gray50: "#F9FAFB",
  gray100: "#F3F4F6",
  gray200: "#E5E7EB",
  gray300: "#D1D5DB",
  gray400: "#9CA3AF",
  gray500: "#6B7280",
  gray600: "#4B5563",
  gray700: "#374151",
  gray800: "#1F2937",
  gray900: "#111827",
};

// 浅色模式
export const lightGray = {
  primary: grayPalette.gray700,
  secondary: grayPalette.gray500,
  surface: grayPalette.gray50,
  background: grayPalette.gray100,
  border: grayPalette.gray200,
  hover: alpha(grayPalette.gray500, 0.08),
  error: "#DC2626",
  warning: "#F59E0B",
  success: "#10B981",
  text: {
    primary: grayPalette.gray900,
    secondary: grayPalette.gray600,
    disabled: grayPalette.gray400,
    inverse: grayPalette.gray50,
    error: "#DC2626",
  },
};

// 深色模式
export const darkGray = {
  primary: grayPalette.gray300,
  secondary: grayPalette.gray400,
  surface: grayPalette.gray900,
  background: grayPalette.gray800,
  border: grayPalette.gray700,
  hover: alpha(grayPalette.gray300, 0.08),
  error: "#EF4444",
  warning: "#F59E0B",
  success: "#10B981",
  text: {
    primary: grayPalette.gray50,
    secondary: grayPalette.gray400,
    disabled: grayPalette.gray600,
    inverse: grayPalette.gray900,
    error: "#EF4444",
  },
};

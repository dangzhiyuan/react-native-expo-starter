import { alpha } from "../../utils/theme";

// 蓝色主题的基础色板
const bluePalette = {
  blue50: "#EFF6FF",
  blue100: "#DBEAFE",
  blue200: "#BFDBFE",
  blue300: "#93C5FD",
  blue400: "#60A5FA",
  blue500: "#3B82F6",
  blue600: "#2563EB",
  blue700: "#1D4ED8",
  blue800: "#1E40AF",
  blue900: "#1E3A8A",
};

// 浅色模式
export const lightBlue = {
  primary: bluePalette.blue600,
  secondary: bluePalette.blue500,
  surface: bluePalette.blue50,
  background: bluePalette.blue100,
  border: bluePalette.blue200,
  hover: alpha(bluePalette.blue500, 0.08),
  error: "#DC2626",
  warning: "#F59E0B",
  success: "#10B981",
  text: {
    primary: bluePalette.blue900,
    secondary: bluePalette.blue700,
    disabled: bluePalette.blue300,
    inverse: bluePalette.blue50,
    error: "#DC2626",
  },
};

// 深色模式
export const darkBlue = {
  primary: bluePalette.blue400,
  secondary: bluePalette.blue500,
  surface: bluePalette.blue900,
  background: bluePalette.blue800,
  border: bluePalette.blue700,
  hover: alpha(bluePalette.blue400, 0.08),
  error: "#EF4444",
  warning: "#F59E0B",
  success: "#10B981",
  text: {
    primary: bluePalette.blue50,
    secondary: bluePalette.blue200,
    disabled: bluePalette.blue600,
    inverse: bluePalette.blue900,
    error: "#EF4444",
  },
};

import { alpha } from "../../utils/theme";

// 橙色主题的基础色板
const orangePalette = {
  orange50: "#FFF7ED",
  orange100: "#FFEDD5",
  orange200: "#FED7AA",
  orange300: "#FDBA74",
  orange400: "#FB923C",
  orange500: "#F97316",
  orange600: "#EA580C",
  orange700: "#C2410C",
  orange800: "#9A3412",
  orange900: "#7C2D12",
};

// 浅色模式
export const lightOrange = {
  primary: orangePalette.orange600,
  secondary: orangePalette.orange500,
  surface: orangePalette.orange50,
  background: orangePalette.orange100,
  border: orangePalette.orange200,
  hover: alpha(orangePalette.orange500, 0.08),
  error: "#DC2626",
  warning: "#F59E0B",
  success: "#10B981",
  text: {
    primary: orangePalette.orange900,
    secondary: orangePalette.orange700,
    disabled: orangePalette.orange300,
    inverse: orangePalette.orange50,
    error: "#DC2626",
  },
};

// 深色模式
export const darkOrange = {
  primary: orangePalette.orange400,
  secondary: orangePalette.orange500,
  surface: orangePalette.orange900,
  background: orangePalette.orange800,
  border: orangePalette.orange700,
  hover: alpha(orangePalette.orange400, 0.08),
  error: "#EF4444",
  warning: "#F59E0B",
  success: "#10B981",
  text: {
    primary: orangePalette.orange50,
    secondary: orangePalette.orange200,
    disabled: orangePalette.orange600,
    inverse: orangePalette.orange900,
    error: "#EF4444",
  },
};

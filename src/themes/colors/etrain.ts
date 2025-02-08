import { alpha } from "../../utils/theme";

// etrain主题的基础色板
const etrainPalette = {
  primary: "#c5cdde",
  secondary: "#8290ae",
  secondaryDark: "#5b21b6",
  secondaryLight: "#a78bfa",
  tertiary: "#999999",
  dark: "#191d28",
  gray: "#2e3242",
  background: "#232838",
  white: "#f3f4f8",
  lightWhite: "#cccccc",
  button1: "#5a91cc",
  button2: "#5ac4cc",
  button3: "#60a5fa",
  button4: "#a78bfa",
  primaryDark: "#1e40af",
  primaryLight: "#60a5fa",
  grayDark: "#1f2937",
  black: "#000000",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#3B82F6",
};

// 浅色模式
export const lightEtrain = {
  primary: etrainPalette.primary,
  secondary: etrainPalette.secondary,
  surface: etrainPalette.white,
  background: etrainPalette.background,
  border: etrainPalette.gray,
  hover: alpha(etrainPalette.primary, 0.08),
  error: etrainPalette.danger,
  warning: etrainPalette.warning,
  success: etrainPalette.success,
  text: {
    primary: etrainPalette.black,
    secondary: etrainPalette.tertiary,
    disabled: etrainPalette.lightWhite,
    inverse: etrainPalette.white,
    error: etrainPalette.danger,
  },
};

// 深色模式
export const darkEtrain = {
  primary: etrainPalette.primaryDark,
  secondary: etrainPalette.secondaryDark,
  surface: etrainPalette.dark,
  background: etrainPalette.grayDark,
  border: etrainPalette.gray,
  hover: alpha(etrainPalette.primaryLight, 0.08),
  error: etrainPalette.danger,
  warning: etrainPalette.warning,
  success: etrainPalette.success,
  text: {
    primary: etrainPalette.white,
    secondary: etrainPalette.lightWhite,
    disabled: etrainPalette.tertiary,
    inverse: etrainPalette.dark,
    error: etrainPalette.danger,
  },
};

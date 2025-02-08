import { alpha } from "../../utils/theme";

// 粉色主题的基础色板
const pinkPalette = {
  pink50: "#FDF2F8",
  pink100: "#FCE7F3",
  pink200: "#FBCFE8",
  pink300: "#F9A8D4",
  pink400: "#F472B6",
  pink500: "#EC4899",
  pink600: "#DB2777",
  pink700: "#BE185D",
  pink800: "#9D174D",
  pink900: "#831843",
};

// 浅色模式
export const lightPink = {
  primary: pinkPalette.pink600,
  secondary: pinkPalette.pink500,
  surface: pinkPalette.pink50,
  background: pinkPalette.pink100,
  border: pinkPalette.pink200,
  hover: alpha(pinkPalette.pink500, 0.08),
  error: "#DC2626",
  warning: "#F59E0B",
  success: "#10B981",
  text: {
    primary: pinkPalette.pink900,
    secondary: pinkPalette.pink700,
    disabled: pinkPalette.pink300,
    inverse: pinkPalette.pink50,
    error: "#DC2626",
  },
};

// 深色模式
export const darkPink = {
  primary: pinkPalette.pink400,
  secondary: pinkPalette.pink500,
  surface: pinkPalette.pink900,
  background: pinkPalette.pink800,
  border: pinkPalette.pink700,
  hover: alpha(pinkPalette.pink400, 0.08),
  error: "#EF4444",
  warning: "#F59E0B",
  success: "#10B981",
  text: {
    primary: pinkPalette.pink50,
    secondary: pinkPalette.pink200,
    disabled: pinkPalette.pink600,
    inverse: pinkPalette.pink900,
    error: "#EF4444",
  },
};

import { alpha } from "../../utils/theme";

// 日系小清新主题的基础色板
const pastelPalette = {
  mint50: "#F0FDF9",
  mint100: "#CCFBEF",
  mint200: "#99F6E0",
  mint300: "#5EEAD4",
  mint400: "#2DD4BF",
  mint500: "#14B8A6",
  mint600: "#0D9488",
  mint700: "#0F766E",
  mint800: "#115E59",
  mint900: "#134E4A",
  sakura50: "#FDF2F8",
  sakura100: "#FCE7F3",
  sakura200: "#FBCFE8",
  sakura300: "#F9A8D4",
  sakura400: "#F472B6",
  sakura500: "#EC4899",
  sakura600: "#DB2777",
};

// 浅色模式
export const lightPastel = {
  primary: pastelPalette.mint600,
  secondary: pastelPalette.sakura400,
  surface: pastelPalette.mint50,
  background: "#FFFFFF",
  border: pastelPalette.mint100,
  hover: alpha(pastelPalette.mint500, 0.08),
  error: "#FF6B6B",
  warning: "#FFD93D",
  success: "#95E1D3",
  text: {
    primary: pastelPalette.mint900,
    secondary: pastelPalette.mint700,
    disabled: pastelPalette.mint300,
    inverse: pastelPalette.mint50,
    error: "#FF6B6B",
  },
};

// 深色模式
export const darkPastel = {
  primary: pastelPalette.mint400,
  secondary: pastelPalette.sakura300,
  surface: pastelPalette.mint900,
  background: pastelPalette.mint800,
  border: pastelPalette.mint700,
  hover: alpha(pastelPalette.mint400, 0.08),
  error: "#FF8787",
  warning: "#FFE066",
  success: "#A5E6D3",
  text: {
    primary: pastelPalette.mint50,
    secondary: pastelPalette.mint200,
    disabled: pastelPalette.mint600,
    inverse: pastelPalette.mint900,
    error: "#FF8787",
  },
};

// 主题模式
export type ThemeMode = "light" | "dark";

// 主题色系
export type ColorScheme =
  | "default"
  | "blue"
  | "orange"
  | "gray"
  | "pink"
  | "pastel";

// 基础颜色主题接口
export interface BaseTheme {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  error: string;
  success: string;
  warning: string;
  border: string;
  hover: string;
  text: {
    primary: string;
    secondary: string;
    disabled: string;
    inverse: string;
    error: string;
  };
}

// 完整主题接口
export interface Theme extends BaseTheme {
  isDark: boolean;
  colorScheme: ColorScheme;
  typography: {
    sizes: {
      h1: number;
      h2: number;
      h3: number;
      body: number;
      small: number;
    };
    weights: {
      h1: string;
      h2: string;
      h3: string;
      body: string;
      small: string;
    };
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
}

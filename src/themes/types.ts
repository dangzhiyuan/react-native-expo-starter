export type ColorTheme = 'default' | 'blue' | 'orange';
export type DisplayMode = 'light' | 'dark' | 'system';
export type FontWeight = '400' | '500' | '600' | 'normal' | 'bold';

export interface Theme {
  isDark: boolean;
  colorTheme: ColorTheme;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    error: string;
    success: string;
    warning: string;
    border: string;
    text: {
      primary: string;
      secondary: string;
      disabled: string;
      inverse: string;
      error: string;
    };
  };
  typography: {
    sizes: {
      h1: number;
      h2: number;
      h3: number;
      body: number;
      small: number;
    };
    weights: {
      h1: FontWeight;
      h2: FontWeight;
      h3: FontWeight;
      body: FontWeight;
      small: FontWeight;
    };
  };
} 
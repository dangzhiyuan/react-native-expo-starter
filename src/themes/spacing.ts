import { isTablet } from "../utils/platform";

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// 响应式间距
export const getResponsiveSpacing = (size: keyof typeof spacing) => {
  const baseSpacing = spacing[size];
  return isTablet() ? baseSpacing * 1.5 : baseSpacing;
}; 
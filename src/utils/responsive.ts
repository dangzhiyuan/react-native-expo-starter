import { Dimensions, ScaledSize, DimensionValue } from 'react-native';
import { useState, useEffect } from 'react';

const { width, height } = Dimensions.get('window');

// 基准尺寸（以iPhone 11为例）
const baseWidth = 375;
const baseHeight = 812;

// 计算缩放比例
export const scale = (size: number) => (width / baseWidth) * size;
export const verticalScale = (size: number) => (height / baseHeight) * size;
export const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;

// 屏幕尺寸工具
export const screenWidth = width;
export const screenHeight = height;
export const isSmallDevice = width < 375;
export const isTablet = width >= 768;

// 响应式间距
export const spacing = {
  xs: moderateScale(4),
  sm: moderateScale(8),
  md: moderateScale(16),
  lg: moderateScale(24),
  xl: moderateScale(32),
};

// 响应式字体大小
export const fontSizes = {
  h1: moderateScale(24),
  h2: moderateScale(20),
  h3: moderateScale(18),
  body: moderateScale(16),
  small: moderateScale(14),
};

// 添加设备尺寸断点
export const breakpoints = {
  phone: 0,
  tablet: 768,
  desktop: 1024,
};

// 添加设备类型检测
export const getDeviceType = (width: number) => {
  if (width >= breakpoints.desktop) return 'desktop';
  if (width >= breakpoints.tablet) return 'tablet';
  return 'phone';
};

interface ResponsiveLayout {
  maxWidth: number;  // 改为明确的 number 类型
  columns: number;
  gutter: number;
  padding: number;
}

// 添加响应式布局工具
export const getResponsiveLayout = (width: number): ResponsiveLayout => {
  const device = getDeviceType(width);
  
  switch (device) {
    case 'desktop':
      return {
        maxWidth: 1200,  // 使用数字
        columns: 3,
        gutter: 32,
        padding: 40,
      };
    case 'tablet':
      return {
        maxWidth: 768,  // 使用数字
        columns: 2,
        gutter: 24,
        padding: 32,
      };
    default:
      return {
        maxWidth: width,  // 使用屏幕宽度
        columns: 1,
        gutter: 16,
        padding: 16,
      };
  }
};

// 添加响应式Hook
export const useResponsive = () => {
  const [dimensions, setDimensions] = useState(() => Dimensions.get('window'));
  
  useEffect(() => {
    const onChange = ({ window }: { window: ScaledSize }) => {
      setDimensions(window);
    };

    const subscription = Dimensions.addEventListener('change', onChange);
    return () => subscription.remove();
  }, []);

  const { width, height } = dimensions;
  const device = getDeviceType(width);
  const layout = getResponsiveLayout(width);
  
  return {
    width,
    height,
    device,
    layout,
    isPhone: device === 'phone',
    isTablet: device === 'tablet',
    isDesktop: device === 'desktop',
    isLandscape: width > height,
  };
}; 
import { Dimensions, ScaledSize, DimensionValue } from "react-native";
import { useState, useEffect } from "react";

const { width, height } = Dimensions.get("window");

// 基准尺寸（以iPhone 11为例）
const baseWidth = 375;
const baseHeight = 812;

// 计算缩放比例
export const scale = (size: number) => (width / baseWidth) * size;
export const verticalScale = (size: number) => (height / baseHeight) * size;
export const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

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
  if (width >= breakpoints.desktop) return "desktop";
  if (width >= breakpoints.tablet) return "tablet";
  return "phone";
};

export type DeviceType = "phone" | "tablet";

export interface ResponsiveLayout {
  width: number;
  height: number;
  padding: number;
  gutter: number;
  drawerWidth: number;
}

export interface ResponsiveConfig {
  device: DeviceType;
  layout: ResponsiveLayout;
}

// 添加响应式布局工具
export const getResponsiveLayout = (width: number): ResponsiveLayout => {
  const device = getDeviceType(width);

  switch (device) {
    case "desktop":
      return {
        width: 1200, // 使用数字
        height: 1200, // 使用数字
        padding: 40,
        gutter: 32,
        drawerWidth: 1200, // 使用数字
      };
    case "tablet":
      return {
        width: 768, // 使用数字
        height: 768, // 使用数字
        padding: 32,
        gutter: 24,
        drawerWidth: width * 0.3, // 使用屏幕30%的宽度
      };
    default:
      return {
        width: width, // 使用屏幕宽度
        height: height, // 使用屏幕高度
        padding: 16,
        gutter: 16,
        drawerWidth: width * 0.85, // 使用屏幕85%的宽度
      };
  }
};

// 添加响应式Hook
export const useResponsive = (): ResponsiveConfig => {
  const device: DeviceType = isTablet ? "tablet" : "phone";

  const layout: ResponsiveLayout = {
    width,
    height,
    padding: moderateScale(16),
    gutter: moderateScale(16),
    drawerWidth: isTablet ? width * 0.3 : width * 0.85,
  };

  return {
    device,
    layout,
  };
};

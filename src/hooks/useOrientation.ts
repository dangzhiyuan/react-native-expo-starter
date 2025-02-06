import { useLayout } from './useLayout';

export const useOrientation = () => {
  const { width, height, isLandscape } = useLayout();

  return {
    width,
    height,
    isLandscape,
    isPortrait: !isLandscape,
    // 根据方向返回不同的样式
    getOrientationStyle: (portrait: any, landscape: any) => {
      return isLandscape ? landscape : portrait;
    },
  };
}; 
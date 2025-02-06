import { Dimensions, Platform, StatusBar } from 'react-native';
import { isTablet } from './responsive';

const { width, height } = Dimensions.get('window');

export const layout = {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  isTablet,
  statusBarHeight: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight || 0,
  bottomSpace: Platform.OS === 'ios' ? 34 : 0,
  getResponsiveWidth: (percent: number) => width * (percent / 100),
  getResponsiveHeight: (percent: number) => height * (percent / 100),
};

export const getResponsivePadding = () => {
  if (layout.isTablet) {
    return {
      paddingHorizontal: 32,
      maxWidth: 800,
    };
  }
  return {
    paddingHorizontal: 16,
    maxWidth: '100%',
  };
}; 
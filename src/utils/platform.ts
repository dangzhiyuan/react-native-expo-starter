import { Platform, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export const window = Dimensions.get('window');
export const screen = Dimensions.get('screen');

// 响应式布局工具函数
export const getWidth = (percentage: number) => wp(percentage);
export const getHeight = (percentage: number) => hp(percentage);

// 判断是否是平板
export const isTablet = () => {
  const { width, height } = window;
  return Math.min(width, height) >= 600;
}; 
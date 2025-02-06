import { StyleSheet } from 'react-native';
import { getWidth, getHeight } from '../utils/platform';
import type { ThemeColors } from './colors';

export const createSharedStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    // 阴影样式
    shadow: {
      shadowColor: colors.text.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    // 卡片样式
    card: {
      backgroundColor: colors.surface,
      borderRadius: 8,
      padding: getWidth(4),
      margin: getWidth(2),
    },
    // 基础容器
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    // 居中容器
    centerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
    // 行布局
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    // 分隔线
    divider: {
      height: 1,
      backgroundColor: colors.border,
      width: '100%',
      marginVertical: getHeight(1),
    },
  }); 
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useThemeContext } from '../../themes/ThemeProvider';

interface Props {
  vertical?: boolean;
  size?: number;
  color?: string;
}

export const Divider = ({ 
  vertical = false, 
  size = 1,
  color,
}: Props) => {
  const { theme } = useThemeContext();

  const styles = StyleSheet.create({
    divider: {
      backgroundColor: color ?? theme.colors.border,
      ...(vertical
        ? { width: size, height: '100%' }
        : { height: size, width: '100%' }),
    },
  });

  return <View style={styles.divider} />;
}; 
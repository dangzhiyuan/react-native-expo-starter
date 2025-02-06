import React from 'react';
import { View, StyleSheet, ViewStyle, DimensionValue } from 'react-native';
import { useResponsive } from '../../utils/responsive';

interface Props {
  children: React.ReactNode;
  width?: DimensionValue;
  spacing?: number;
  style?: ViewStyle;
}

export const Column = ({ 
  children, 
  width = '100%',
  spacing,
  style 
}: Props) => {
  const { layout } = useResponsive();
  
  const styles = StyleSheet.create({
    column: {
      width: width as DimensionValue,
      gap: spacing ?? layout.gutter,
    },
  });

  return <View style={[styles.column, style]}>{children}</View>;
}; 
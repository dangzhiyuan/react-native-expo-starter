import React from 'react';
import { View, StyleSheet, DimensionValue } from 'react-native';
import { useResponsive } from '../../utils/responsive';

interface Props {
  children: React.ReactNode;
  fluid?: boolean;
}

export const ResponsiveContainer = ({ children, fluid = false }: Props) => {
  const { layout, width } = useResponsive();
  
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      maxWidth: fluid ? width : layout.maxWidth as DimensionValue,
      paddingHorizontal: layout.padding,
      alignSelf: 'center',
    },
  });

  return <View style={styles.container}>{children}</View>;
}; 
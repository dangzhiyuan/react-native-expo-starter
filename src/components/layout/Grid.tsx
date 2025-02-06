import React from 'react';
import { View, StyleSheet, ViewStyle, DimensionValue } from 'react-native';
import { useResponsive } from '../../utils/responsive';

interface Props {
  children: React.ReactNode;
  spacing?: number;
  columns?: number;
}

interface GridItemProps {
  children: React.ReactNode;
  span?: number;  // 添加 span 属性来控制跨列
  style?: ViewStyle;
}

export const GridItem = ({ children, span = 1, style }: GridItemProps) => {
  const { layout } = useResponsive();
  
  const styles = StyleSheet.create({
    item: {
      padding: layout.gutter / 2,
    },
  });

  return <View style={[styles.item, style]}>{children}</View>;
};

export const Grid = ({ children, spacing, columns = 1 }: Props) => {
  const { layout } = useResponsive();
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      margin: -(spacing ?? layout.gutter) / 2,
    },
  });

  return (
    <View style={styles.container}>
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) return null;
        
        const span = child.props.span || 1;
        const width = `${(100 / columns) * span}%` as DimensionValue;
        
        return React.cloneElement(child, {
          style: {
            ...child.props.style,
            width,
          },
        });
      })}
    </View>
  );
}; 
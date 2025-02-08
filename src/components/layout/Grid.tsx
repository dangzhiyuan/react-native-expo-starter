import React from "react";
import { View, StyleSheet, ViewStyle, StyleProp } from "react-native";
import { useResponsive } from "../../utils/responsive";

interface GridProps {
  children: React.ReactNode;
  columns?: number;
  spacing?: number;
  style?: StyleProp<ViewStyle>;
}

interface GridItemProps {
  children: React.ReactNode;
  span?: number; // 添加 span 属性来控制跨列
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

export const Grid = ({
  children,
  columns = 1,
  spacing = 16,
  style,
}: GridProps) => {
  const { layout } = useResponsive();

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      flexWrap: "wrap",
      margin: -spacing / 2,
    },
    item: {
      width: `${100 / columns}%`,
      padding: spacing / 2,
    },
  });

  const childrenArray = React.Children.toArray(children);

  return (
    <View style={[styles.container, style]}>
      {childrenArray.map((child, index) => (
        <View key={index} style={styles.item}>
          {child}
        </View>
      ))}
    </View>
  );
};

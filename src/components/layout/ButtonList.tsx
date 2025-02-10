import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { useResponsive } from "../../utils/responsive";

interface ButtonListProps {
  children: React.ReactNode;
  vertical?: boolean;
  spacing?: number;
  style?: ViewStyle;
}

export const ButtonList = ({
  children,
  vertical = false,
  spacing,
  style,
}: ButtonListProps) => {
  const { layout } = useResponsive();

  const styles = StyleSheet.create({
    container: {
      flexDirection: vertical ? "column" : "row",
      flexWrap: "wrap",
      gap: spacing ?? layout.gutter,
    },
  });

  return <View style={[styles.container, style]}>{children}</View>;
};

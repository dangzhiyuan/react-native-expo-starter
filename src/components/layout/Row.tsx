import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { useResponsive } from "../../utils/responsive";
import { useTheme } from "../../themes/ThemeProvider";

interface Props {
  children: React.ReactNode;
  spacing?: number;
  align?: "flex-start" | "center" | "flex-end" | "stretch";
  justify?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around";
  wrap?: boolean;
  style?: ViewStyle;
}

export const Row = ({
  children,
  spacing,
  align = "center",
  justify = "flex-start",
  wrap = false,
  style,
}: Props) => {
  const { theme } = useTheme();
  const { layout } = useResponsive();

  const styles = StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: align,
      justifyContent: justify,
      flexWrap: wrap ? "wrap" : "nowrap",
      gap: spacing ?? layout.gutter,
    },
  });

  return <View style={[styles.row, style]}>{children}</View>;
};

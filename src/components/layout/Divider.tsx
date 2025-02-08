import React from "react";
import { View, StyleSheet, ViewStyle, StyleProp } from "react-native";
import { useTheme } from "../../themes/ThemeProvider";
import { useResponsive } from "../../utils/responsive";

interface DividerProps {
  vertical?: boolean;
  spacing?: number;
  style?: StyleProp<ViewStyle>;
}

export const Divider = ({
  vertical = false,
  spacing = 0,
  style,
}: DividerProps) => {
  const { theme } = useTheme();
  const { layout } = useResponsive();

  const styles = StyleSheet.create({
    divider: {
      backgroundColor: theme.border,
      ...(vertical
        ? {
            width: 1,
            height: "100%",
            marginHorizontal: spacing || layout.gutter,
          }
        : {
            height: 1,
            width: "100%",
            marginVertical: spacing || layout.gutter,
          }),
    },
  });

  return <View style={[styles.divider, style]} />;
};

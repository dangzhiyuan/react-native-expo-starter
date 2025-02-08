import React from "react";
import { View, StyleSheet, ViewStyle, DimensionValue } from "react-native";
import { useResponsive } from "../../utils/responsive";
import { useTheme } from "../../themes/ThemeProvider";

interface Props {
  children: React.ReactNode;
  maxWidth?: DimensionValue;
  center?: boolean;
  style?: ViewStyle;
}

export const Container = ({
  children,
  maxWidth,
  center = true,
  style,
}: Props) => {
  const { layout } = useResponsive();

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      maxWidth: maxWidth ?? layout.maxWidth,
      marginHorizontal: "auto",
      alignItems: center ? "center" : "flex-start",
      padding: layout.padding,
    },
  });

  return <View style={[styles.container, style]}>{children}</View>;
};

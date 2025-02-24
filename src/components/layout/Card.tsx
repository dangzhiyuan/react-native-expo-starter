import React, { useMemo } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { useTheme } from "../../themes/ThemeProvider";
import { useResponsive } from "../../utils/responsive";

interface Props {
  children: React.ReactNode;
  variant?: "elevated" | "outlined" | "filled";
  style?: ViewStyle;
}

export const Card = ({ children, variant = "elevated", style }: Props) => {
  const { theme } = useTheme();
  const { layout } = useResponsive();

  const cardStyle = useMemo(() => {
    return StyleSheet.create({
      card: {
        padding: layout.padding,
        borderRadius: 20,
        backgroundColor: theme.surface,
        ...(variant === "elevated" && {
          shadowColor: theme.surface,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
        }),
        ...(variant === "outlined" && {
          borderWidth: 1,
          borderColor: theme.border,
        }),
      },
    });
  }, [variant, theme, layout.padding]);

  return <View style={[cardStyle.card, style]}>{children}</View>;
};

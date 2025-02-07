import React, { useMemo } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { useThemeContext } from "../../themes/ThemeProvider";
import { useResponsive } from "../../utils/responsive";

interface Props {
  children: React.ReactNode;
  variant?: "elevated" | "outlined" | "filled";
  style?: ViewStyle;
}

export const Card = ({ children, variant = "elevated", style }: Props) => {
  const { theme } = useThemeContext();
  const { layout } = useResponsive();

  console.log("Card rendered", theme);

  const styles = useMemo(() => {
    return StyleSheet.create({
      card: {
        padding: layout.padding,

        borderRadius: 8,

        backgroundColor: theme.colors.surface,

        ...getVariantStyles(variant, theme),
      },
    });
  }, [variant, theme, layout.padding]);

  return <View style={[styles.card, style]}>{children}</View>;
};

const getVariantStyles = (variant: Props["variant"], theme: any) => {
  switch (variant) {
    case "elevated":
      return {
        shadowColor: theme.colors.shadowColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
      };
    case "outlined":
      return {
        borderWidth: 1,
        borderColor: theme.colors.border,
      };
    case "filled":
      return {
        backgroundColor: theme.colors.background,
      };
    default:
      return {};
  }
};

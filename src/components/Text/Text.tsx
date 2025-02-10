import React from "react";
import { Text as RNText, StyleSheet, TextStyle, StyleProp } from "react-native";
import { useTheme } from "../../themes/ThemeProvider";

export interface TextProps {
  children: React.ReactNode;
  variant?: "h1" | "h2" | "h3" | "body" | "small";
  color?: "primary" | "secondary" | "disabled" | "inverse" | "error";
  style?: StyleProp<TextStyle>;
}

export const Text = ({
  children,
  variant = "body",
  color = "primary",
  style,
}: TextProps) => {
  const { theme } = useTheme();

  console.log("Theme in Text:", {
    typography: theme.typography,
    text: theme.text,
    variant,
    color,
  });

  const textStyle = StyleSheet.create({
    text: {
      fontSize: theme.typography.sizes[variant],
      fontWeight: theme.typography.weights[variant] as TextStyle["fontWeight"],
      color: theme.text[color],
    },
  });

  return <RNText style={[textStyle.text, style]}>{children}</RNText>;
};

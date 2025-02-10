import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "../Text/Text";
import { useTheme } from "../../themes/ThemeProvider";

interface BadgeProps {
  count?: number | string;
  dot?: boolean;
  maxCount?: number;
  color?: string;
  size?: "small" | "default" | "large";
}

export const Badge = ({
  count,
  dot = false,
  maxCount = 99,
  color,
  size = "default",
}: BadgeProps) => {
  const { theme } = useTheme();

  const getSize = () => {
    switch (size) {
      case "small":
        return 6;
      case "large":
        return 10;
      default:
        return 8;
    }
  };

  const styles = StyleSheet.create({
    badge: {
      backgroundColor: color || theme.error,
      borderRadius: 100,
      padding: dot ? 0 : 4,
      minWidth: dot ? getSize() : 20,
      height: dot ? getSize() : 20,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      color: theme.text.inverse,
      fontSize: 12,
      lineHeight: 12,
    },
  });

  const getDisplayCount = () => {
    if (dot) return "";
    if (typeof count === "string") return count;
    if (typeof count === "number") {
      return count > maxCount ? `${maxCount}+` : count.toString();
    }
    return "";
  };

  return (
    <View style={styles.badge}>
      {!dot && (
        <Text style={styles.text} variant="small">
          {getDisplayCount()}
        </Text>
      )}
    </View>
  );
};

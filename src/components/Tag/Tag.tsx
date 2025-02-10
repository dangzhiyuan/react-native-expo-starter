import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Text } from "../Text/Text";
import { useTheme } from "../../themes/ThemeProvider";
import { MaterialIcons } from "@expo/vector-icons";

interface TagProps {
  label: string;
  color?: string;
  variant?: "solid" | "outline";
  size?: "small" | "medium" | "large";
  onClose?: () => void;
  onPress?: () => void;
}

export const Tag = ({
  label,
  color,
  variant = "solid",
  size = "medium",
  onClose,
  onPress,
}: TagProps) => {
  const { theme } = useTheme();

  const getSize = () => {
    switch (size) {
      case "small":
        return { padding: 4, fontSize: 12 };
      case "large":
        return { padding: 8, fontSize: 16 };
      default:
        return { padding: 6, fontSize: 14 };
    }
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 4,
      paddingVertical: getSize().padding,
      paddingHorizontal: getSize().padding * 2,
      backgroundColor:
        variant === "solid" ? color || theme.primary : "transparent",
      borderWidth: variant === "outline" ? 1 : 0,
      borderColor: color || theme.primary,
    },
    text: {
      color: variant === "solid" ? theme.text.inverse : color || theme.primary,
      fontSize: getSize().fontSize,
    },
    closeIcon: {
      marginLeft: 4,
    },
  });

  const content = (
    <>
      <Text style={styles.text}>{label}</Text>
      {onClose && (
        <MaterialIcons
          name="close"
          size={getSize().fontSize + 2}
          color={styles.text.color}
          style={styles.closeIcon}
          onPress={onClose}
        />
      )}
    </>
  );

  return onPress ? (
    <Pressable style={styles.container} onPress={onPress}>
      {content}
    </Pressable>
  ) : (
    <View style={styles.container}>{content}</View>
  );
};

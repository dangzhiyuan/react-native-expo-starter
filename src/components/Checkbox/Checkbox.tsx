import React from "react";
import { Pressable, StyleSheet, Animated } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../themes/ThemeProvider";
import { Text } from "../Text/Text";

interface CheckboxProps {
  checked: boolean;
  onValueChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  color?: string;
}

export const Checkbox = ({
  checked,
  onValueChange,
  label,
  disabled = false,
  size = "medium",
  color,
}: CheckboxProps) => {
  const { theme } = useTheme();
  const scale = React.useRef(new Animated.Value(1)).current;

  const getSize = () => {
    switch (size) {
      case "small":
        return { box: 16, icon: 14, text: 12 };
      case "large":
        return { box: 24, icon: 20, text: 16 };
      default:
        return { box: 20, icon: 16, text: 14 };
    }
  };

  const dimensions = getSize();

  const handlePress = () => {
    if (disabled) return;

    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    onValueChange(!checked);
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      opacity: disabled ? 0.5 : 1,
    },
    box: {
      width: dimensions.box,
      height: dimensions.box,
      borderRadius: 4,
      borderWidth: 2,
      borderColor: checked ? color || theme.primary : theme.border,
      backgroundColor: checked ? color || theme.primary : "transparent",
      alignItems: "center",
      justifyContent: "center",
    },
    label: {
      marginLeft: 8,
      fontSize: dimensions.text,
    },
  });

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <Animated.View style={[styles.box, { transform: [{ scale }] }]}>
        {checked && (
          <MaterialIcons
            name="check"
            size={dimensions.icon}
            color={theme.text.inverse}
          />
        )}
      </Animated.View>
      {label && (
        <Text variant="body" style={styles.label}>
          {label}
        </Text>
      )}
    </Pressable>
  );
};

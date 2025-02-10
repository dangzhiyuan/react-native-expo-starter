import React from "react";
import { Pressable, StyleSheet, Animated } from "react-native";
import { useTheme } from "../../themes/ThemeProvider";

interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  activeColor?: string;
  inactiveColor?: string;
}

export const Switch = ({
  value,
  onValueChange,
  disabled = false,
  size = "medium",
  activeColor,
  inactiveColor,
}: SwitchProps) => {
  const { theme } = useTheme();
  const translateX = React.useRef(new Animated.Value(0)).current;

  const getSize = () => {
    switch (size) {
      case "small":
        return { width: 36, height: 20, circle: 16 };
      case "large":
        return { width: 56, height: 32, circle: 28 };
      default:
        return { width: 46, height: 26, circle: 22 };
    }
  };

  const dimensions = getSize();

  React.useEffect(() => {
    Animated.spring(translateX, {
      toValue: value ? dimensions.width - dimensions.circle - 4 : 0,
      useNativeDriver: true,
    }).start();
  }, [value]);

  const styles = StyleSheet.create({
    container: {
      width: dimensions.width,
      height: dimensions.height,
      borderRadius: dimensions.height / 2,
      padding: 2,
      backgroundColor: value
        ? activeColor || theme.primary
        : inactiveColor || theme.border,
      opacity: disabled ? 0.5 : 1,
    },
    circle: {
      width: dimensions.circle,
      height: dimensions.circle,
      borderRadius: dimensions.circle / 2,
      backgroundColor: theme.background,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2.5,
      elevation: 2,
    },
  });

  return (
    <Pressable
      style={styles.container}
      onPress={() => !disabled && onValueChange(!value)}
    >
      <Animated.View style={[styles.circle, { transform: [{ translateX }] }]} />
    </Pressable>
  );
};

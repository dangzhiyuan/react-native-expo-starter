import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { Text } from "../Text";
import { useThemeContext } from "../../themes/ThemeProvider";

interface ToastProps {
  message: string;
  onHide: () => void;
  type?: "success" | "error" | "warning";
  duration?: number;
}

export const Toast = ({
  message,
  onHide,
  type = "success",
  duration = 3000,
}: ToastProps) => {
  const { theme } = useThemeContext();
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(duration),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => onHide());
  }, []);

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return theme.success;
      case "error":
        return theme.error;
      case "warning":
        return theme.warning;
      default:
        return theme.success;
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: getBackgroundColor(), opacity },
      ]}
    >
      <Text variant="body" color="inverse">
        {message}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 50,
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});

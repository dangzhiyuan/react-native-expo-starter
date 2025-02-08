import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";
import { Text } from "./Text";
import { useTheme } from "../themes/ThemeProvider";

interface ToastProps {
  message: string;
  duration?: number;
  onHide: () => void;
  type?: "success" | "error" | "warning" | "info";
}

export const Toast = ({
  message,
  duration = 2000,
  onHide,
  type = "success",
}: ToastProps) => {
  const { theme } = useTheme();
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
      case "info":
        return theme.primary;
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
      <Text variant="body" color="inverse" style={styles.text}>
        {message}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 100,
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  text: {
    textAlign: "center",
  },
});

import React, { useEffect } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { Text } from "../Text/Text";
import { useTheme } from "../../themes/ThemeProvider";
import { moderateScale } from "../../utils/responsive";

interface ToastProps {
  message: string;
  duration?: number;
  onHide: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  duration = 2000,
  onHide,
}) => {
  const { theme } = useTheme();
  const opacity = new Animated.Value(0);

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
    ]).start(() => {
      onHide();
    });
  }, []);

  return (
    <Animated.View
      style={[styles.container, { backgroundColor: theme.surface, opacity }]}
    >
      <Text color="primary">{message}</Text>
    </Animated.View>
  );
};

// 创建一个全局的 toast 显示函数
let toastTimeout: NodeJS.Timeout;

export const showToast = (message: string, duration = 2000) => {
  if (toastTimeout) {
    clearTimeout(toastTimeout);
  }

  // 触发显示 toast 的事件
  const event = new CustomEvent("showToast", { detail: { message, duration } });
  document.dispatchEvent(event);

  toastTimeout = setTimeout(() => {
    // 触发隐藏 toast 的事件
    document.dispatchEvent(new CustomEvent("hideToast"));
  }, duration);
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: moderateScale(50),
    left: moderateScale(20),
    right: moderateScale(20),
    padding: moderateScale(16),
    borderRadius: moderateScale(8),
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

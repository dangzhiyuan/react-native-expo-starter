import React from "react";
import { View, StyleSheet, Animated } from "react-native";
import { Text } from "./Text";
import { useTheme } from "../themes/ThemeProvider";
import { useResponsive } from "../utils/responsive";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const OfflineNotice = () => {
  const { theme } = useTheme();
  const { layout } = useResponsive();
  const insets = useSafeAreaInsets();
  const translateY = new Animated.Value(-100);

  React.useEffect(() => {
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
      bounciness: 8,
    }).start();
  }, []);

  const styles = StyleSheet.create({
    container: {
      position: "absolute",
      top: insets.top,
      left: 0,
      right: 0,
      backgroundColor: theme.error,
      padding: layout.padding,
      zIndex: 999,
    },
    content: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    icon: {
      marginRight: layout.gutter,
      fontSize: 20,
      color: theme.text.inverse,
    },
    text: {
      color: theme.text.inverse,
    },
  });

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
      <View style={styles.content}>
        <Text style={styles.icon}>📶</Text>
        <Text variant="body" style={styles.text}>
          网络连接已断开
        </Text>
      </View>
    </Animated.View>
  );
};

import React from "react";
import { Animated, StyleSheet, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import { useTheme } from "../themes/ThemeProvider";

interface Props {
  children: React.ReactNode;
  leftActions?: React.ReactNode;
  rightActions?: React.ReactNode;
}

export const SwipeableRow: React.FC<Props> = ({
  children,
  leftActions,
  rightActions,
}) => {
  const { theme } = useTheme();
  const translateX = React.useRef(new Animated.Value(0)).current;

  const handleGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: true }
  );

  const styles = StyleSheet.create({
    container: {
      overflow: "hidden",
    },
    content: {
      backgroundColor: theme.background,
    },
    actions: {
      position: "absolute",
      top: 0,
      bottom: 0,
    },
    leftActions: {
      left: 0,
    },
    rightActions: {
      right: 0,
    },
  });

  return (
    <View style={styles.container}>
      {leftActions && (
        <View style={[styles.actions, styles.leftActions]}>{leftActions}</View>
      )}
      {rightActions && (
        <View style={[styles.actions, styles.rightActions]}>
          {rightActions}
        </View>
      )}
      <PanGestureHandler onGestureEvent={handleGestureEvent}>
        <Animated.View
          style={[
            styles.content,
            {
              transform: [{ translateX }],
            },
          ]}
        >
          {children}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

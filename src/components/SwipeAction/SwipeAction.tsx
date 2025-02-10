import React from "react";
import {
  Animated,
  StyleSheet,
  View,
  PanResponder,
  ViewStyle,
  Pressable,
} from "react-native";
import { useTheme } from "../../themes/ThemeProvider";

interface SwipeActionProps {
  children: React.ReactNode;
  rightActions?: React.ReactNode;
  leftActions?: React.ReactNode;
  actionWidth?: number;
  style?: ViewStyle;
}

interface ActionButtonProps {
  children: React.ReactNode;
  backgroundColor: string;
  onPress?: () => void;
}

const ActionButton = ({
  children,
  backgroundColor,
  onPress,
}: ActionButtonProps) => {
  const styles = StyleSheet.create({
    button: {
      flex: 1,
      backgroundColor,
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
  });

  return (
    <Pressable style={styles.button} onPress={onPress}>
      {children}
    </Pressable>
  );
};

export const SwipeAction = ({
  children,
  rightActions,
  leftActions,
  actionWidth = 80,
  style,
}: SwipeActionProps) => {
  const { theme } = useTheme();
  const pan = React.useRef(new Animated.Value(0)).current;

  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const { dx } = gestureState;
        const maxLeft = leftActions ? -actionWidth : 0;
        const maxRight = rightActions ? actionWidth : 0;
        const newValue = Math.min(Math.max(dx, maxLeft), maxRight);
        pan.setValue(newValue);
      },
      onPanResponderRelease: (_, gestureState) => {
        const { dx, vx } = gestureState;
        const threshold = actionWidth / 2;
        let toValue = 0;

        if (dx > threshold || vx > 0.5) {
          toValue = actionWidth;
        } else if (dx < -threshold || vx < -0.5) {
          toValue = -actionWidth;
        }

        Animated.spring(pan, {
          toValue,
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  const styles = StyleSheet.create({
    container: {
      position: "relative",
      overflow: "hidden",
      borderRadius: 8,
    },
    content: {
      backgroundColor: theme.background,
      zIndex: 2,
    },
    actions: {
      position: "absolute",
      top: 0,
      bottom: 0,
      width: actionWidth,
      flexDirection: "row",
      alignItems: "stretch",
    },
    leftActions: {
      left: 0,
    },
    rightActions: {
      right: 0,
    },
  });

  return (
    <View style={[styles.container, style]}>
      {leftActions && (
        <Animated.View
          style={[
            styles.actions,
            styles.leftActions,
            {
              transform: [
                {
                  translateX: pan.interpolate({
                    inputRange: [-actionWidth, 0],
                    outputRange: [-actionWidth, 0],
                    extrapolate: "clamp",
                  }),
                },
              ],
            },
          ]}
        >
          {leftActions}
        </Animated.View>
      )}
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.content,
          {
            transform: [{ translateX: pan }],
          },
        ]}
      >
        {children}
      </Animated.View>
      {rightActions && (
        <Animated.View
          style={[
            styles.actions,
            styles.rightActions,
            {
              transform: [
                {
                  translateX: pan.interpolate({
                    inputRange: [0, actionWidth],
                    outputRange: [0, actionWidth],
                    extrapolate: "clamp",
                  }),
                },
              ],
            },
          ]}
        >
          {rightActions}
        </Animated.View>
      )}
    </View>
  );
};

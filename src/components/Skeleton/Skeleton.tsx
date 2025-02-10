import React from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";
import { useTheme } from "../../themes/ThemeProvider";

interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  animated?: boolean;
}

export const Skeleton = ({
  width = "100%",
  height = 20,
  borderRadius = 4,
  animated = true,
}: SkeletonProps) => {
  const { theme } = useTheme();
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (animated) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 1000,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 1000,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [animated]);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  const styles = StyleSheet.create({
    skeleton: {
      width,
      height,
      borderRadius,
      backgroundColor: theme.border,
      overflow: "hidden",
    },
  });

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          opacity: animated ? opacity : 0.5,
        },
      ]}
    />
  );
};

export const SkeletonGroup = {
  Text: ({ lines = 3, spacing = 8 }: { lines?: number; spacing?: number }) => (
    <View style={{ gap: spacing }}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          width={index === lines - 1 ? "60%" : "100%"}
          height={16}
        />
      ))}
    </View>
  ),

  Avatar: ({ size = 40 }: { size?: number }) => (
    <Skeleton width={size} height={size} borderRadius={size / 2} />
  ),

  Card: ({ height = 200 }: { height?: number }) => (
    <Skeleton height={height} borderRadius={8} />
  ),
};

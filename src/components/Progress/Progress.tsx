import React from "react";
import { View, StyleSheet, Animated } from "react-native";
import { useTheme } from "../../themes/ThemeProvider";

interface ProgressProps {
  progress: number;
  color?: string;
  height?: number;
  animated?: boolean;
  showInfo?: boolean;
}

export const Progress = ({
  progress,
  color,
  height = 4,
  animated = true,
  showInfo = false,
}: ProgressProps) => {
  const { theme } = useTheme();
  const animatedWidth = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (animated) {
      Animated.timing(animatedWidth, {
        toValue: progress,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      animatedWidth.setValue(progress);
    }
  }, [progress, animated]);

  const styles = StyleSheet.create({
    container: {
      height,
      backgroundColor: theme.border,
      borderRadius: height / 2,
      overflow: "hidden",
    },
    progress: {
      height: "100%",
      backgroundColor: color || theme.primary,
      borderRadius: height / 2,
    },
    info: {
      position: "absolute",
      right: 0,
      top: height + 4,
      fontSize: 12,
      color: theme.text.secondary,
    },
  });

  const width = animated
    ? animatedWidth.interpolate({
        inputRange: [0, 100],
        outputRange: ["0%", "100%"],
      })
    : `${progress}%`;

  return (
    <View>
      <View style={styles.container}>
        <Animated.View style={[styles.progress, { width }]} />
      </View>
      {showInfo && (
        <Animated.Text style={styles.info}>{`${Math.round(
          progress
        )}%`}</Animated.Text>
      )}
    </View>
  );
};

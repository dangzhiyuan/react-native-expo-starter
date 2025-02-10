import React from "react";
import { View, StyleSheet, Pressable, Animated } from "react-native";
import { useTheme } from "../../themes/ThemeProvider";
import { Text } from "../Text/Text";

interface RadioProps {
  selected: boolean;
  onSelect: () => void;
  label?: string;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  color?: string;
}

export const Radio = ({
  selected,
  onSelect,
  label,
  disabled = false,
  size = "medium",
  color,
}: RadioProps) => {
  const { theme } = useTheme();
  const scale = React.useRef(new Animated.Value(1)).current;

  const getSize = () => {
    switch (size) {
      case "small":
        return { outer: 16, inner: 8, text: 12 };
      case "large":
        return { outer: 24, inner: 12, text: 16 };
      default:
        return { outer: 20, inner: 10, text: 14 };
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

    onSelect();
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      opacity: disabled ? 0.5 : 1,
    },
    outer: {
      width: dimensions.outer,
      height: dimensions.outer,
      borderRadius: dimensions.outer / 2,
      borderWidth: 2,
      borderColor: selected ? color || theme.primary : theme.border,
      alignItems: "center",
      justifyContent: "center",
    },
    inner: {
      width: dimensions.inner,
      height: dimensions.inner,
      borderRadius: dimensions.inner / 2,
      backgroundColor: selected ? color || theme.primary : "transparent",
    },
    label: {
      marginLeft: 8,
      fontSize: dimensions.text,
    },
  });

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <Animated.View style={[styles.outer, { transform: [{ scale }] }]}>
        <View style={styles.inner} />
      </Animated.View>
      {label && (
        <Text variant="body" style={styles.label}>
          {label}
        </Text>
      )}
    </Pressable>
  );
};

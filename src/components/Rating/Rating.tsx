import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../themes/ThemeProvider";

interface RatingProps {
  value: number;
  onChange?: (value: number) => void;
  size?: number;
  color?: string;
  disabled?: boolean;
  count?: number;
}

export const Rating = ({
  value,
  onChange,
  size = 24,
  color,
  disabled = false,
  count = 5,
}: RatingProps) => {
  const { theme } = useTheme();
  const activeColor = color || theme.warning;

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
    },
    star: {
      padding: 2,
    },
  });

  const handlePress = (index: number) => {
    if (!disabled && onChange) {
      onChange(index + 1);
    }
  };

  return (
    <View style={styles.container}>
      {Array.from({ length: count }).map((_, index) => (
        <Pressable
          key={index}
          style={styles.star}
          onPress={() => handlePress(index)}
        >
          <MaterialIcons
            name={index < value ? "star" : "star-border"}
            size={size}
            color={activeColor}
          />
        </Pressable>
      ))}
    </View>
  );
};

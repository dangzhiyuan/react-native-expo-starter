import React from "react";
import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../themes/ThemeProvider";
import { useResponsive } from "../../utils/responsive";

interface ColorPickerProps {
  value?: string;
  onChange?: (color: string) => void;
  colors?: string[];
  swatchSize?: number;
}

const DEFAULT_COLORS = [
  "#f44336",
  "#e91e63",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#2196f3",
  "#03a9f4",
  "#00bcd4",
  "#009688",
  "#4caf50",
  "#8bc34a",
  "#cddc39",
  "#ffeb3b",
  "#ffc107",
  "#ff9800",
  "#ff5722",
  "#795548",
  "#9e9e9e",
  "#607d8b",
];

export const ColorPicker = ({
  value,
  onChange,
  colors = DEFAULT_COLORS,
  swatchSize = 40,
}: ColorPickerProps) => {
  const { theme } = useTheme();
  const { layout } = useResponsive();

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: layout.gutter,
    },
    swatch: {
      width: swatchSize,
      height: swatchSize,
      borderRadius: swatchSize / 2,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 2,
      borderColor: "transparent",
    },
    selectedSwatch: {
      borderColor: theme.text.primary,
    },
    checkIcon: {
      color: "#fff",
      textShadowColor: "rgba(0, 0, 0, 0.3)",
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
    },
  });

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {colors.map((color) => (
          <Pressable
            key={color}
            style={[
              styles.swatch,
              { backgroundColor: color },
              value === color && styles.selectedSwatch,
            ]}
            onPress={() => onChange?.(color)}
          >
            {value === color && (
              <MaterialIcons
                name="check"
                size={swatchSize * 0.6}
                style={styles.checkIcon}
              />
            )}
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

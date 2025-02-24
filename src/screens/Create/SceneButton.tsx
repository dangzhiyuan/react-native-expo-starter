import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTheme } from "@/themes/ThemeProvider";

interface SceneButtonProps {
  item: { id: string; name: string };
  isSelected: boolean;
  onPress: () => void;
}

const SceneButton: React.FC<SceneButtonProps> = ({
  item,
  isSelected,
  onPress,
}) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.button, isSelected ? styles.selectedButton : null]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.buttonText,
          isSelected ? { color: theme.text.inverse } : null,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 176,
    height: 70,
    top: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 10,
    margin: 5,
    backgroundColor: "rgba(35, 40, 56, 1)",
  },
  selectedButton: {
    backgroundColor: "rgba(90, 145, 204, 1)",
  },
  buttonText: {
    fontSize: 16,
    color: "rgba(130, 144, 174, 1)",
  },
});

export default SceneButton;

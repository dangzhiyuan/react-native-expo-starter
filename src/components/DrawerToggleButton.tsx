import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { useDrawerStatus } from "@react-navigation/drawer";
import { useTheme } from "../themes/ThemeProvider";

export const DrawerToggleButton = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const isDrawerOpen = useDrawerStatus() === "open";

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
    >
      <MaterialIcons
        name={isDrawerOpen ? "close" : "menu"}
        size={24}
        color={theme.text.inverse}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginRight: 16,
    padding: 8,
  },
});

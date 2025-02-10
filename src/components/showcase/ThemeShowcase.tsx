import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "../../themes/ThemeProvider";
import { Text } from "../Text/Text";
import Button from "../Button";
import { useResponsive } from "../../utils/responsive";
import type { ColorScheme, ThemeMode } from "../../themes/types";

export const ThemeShowcase = () => {
  const { theme, setThemeMode, setColorScheme } = useTheme();
  const { layout } = useResponsive();
  const [isChanging, setIsChanging] = useState(false);

  const handleThemeChange = async (scheme: ColorScheme) => {
    setIsChanging(true);
    try {
      await setColorScheme(scheme);
    } finally {
      setIsChanging(false);
    }
  };

  const handleModeChange = async (mode: ThemeMode) => {
    setIsChanging(true);
    try {
      await setThemeMode(mode);
    } finally {
      setIsChanging(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      padding: layout.padding,
    },
    section: {
      marginBottom: layout.gutter * 2,
    },
    buttonContainer: {
      gap: layout.gutter,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text variant="h2" style={{ marginBottom: layout.gutter }}>
          主题切换
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            title="默认主题"
            variant={theme.colorScheme === "default" ? "primary" : "outline"}
            onPress={() => handleThemeChange("default")}
            loading={isChanging}
          />
          <Button
            title="蓝色主题"
            variant={theme.colorScheme === "blue" ? "primary" : "outline"}
            onPress={() => handleThemeChange("blue")}
            loading={isChanging}
          />
          <Button
            title="橙色主题"
            variant={theme.colorScheme === "orange" ? "primary" : "outline"}
            onPress={() => handleThemeChange("orange")}
            loading={isChanging}
          />
          <Button
            title="灰色主题"
            variant={theme.colorScheme === "gray" ? "primary" : "outline"}
            onPress={() => handleThemeChange("gray")}
            loading={isChanging}
          />
          <Button
            title="粉色主题"
            variant={theme.colorScheme === "pink" ? "primary" : "outline"}
            onPress={() => handleThemeChange("pink")}
            loading={isChanging}
          />
          <Button
            title="小清新主题"
            variant={theme.colorScheme === "pastel" ? "primary" : "outline"}
            onPress={() => handleThemeChange("pastel")}
            loading={isChanging}
          />
          <Button
            title="Etrain主题"
            variant={theme.colorScheme === "etrain" ? "primary" : "outline"}
            onPress={() => handleThemeChange("etrain")}
            loading={isChanging}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="h2" style={{ marginBottom: layout.gutter }}>
          显示模式
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            title="浅色模式"
            variant={!theme.isDark ? "primary" : "outline"}
            onPress={() => handleModeChange("light")}
            loading={isChanging}
          />
          <Button
            title="深色模式"
            variant={theme.isDark ? "primary" : "outline"}
            onPress={() => handleModeChange("dark")}
            loading={isChanging}
          />
        </View>
      </View>
    </View>
  );
};

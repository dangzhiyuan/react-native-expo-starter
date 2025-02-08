import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { ScreenContainer } from "../components/layout/ScreenContainer";
import { Container } from "../components/layout/Container";
import { Card } from "../components/layout/Card";
import { Column } from "../components/layout/Column";
import { Row } from "../components/layout/Row";
import { Divider } from "../components/layout/Divider";
import { Text } from "../components/Text";
import Button from "../components/Button";
import { useTheme } from "../themes/ThemeProvider";
import type { ThemeMode, ColorScheme } from "../themes/types";
import { useResponsive } from "../utils/responsive";

export const SettingsScreen = () => {
  const { theme, setThemeMode, setColorScheme } = useTheme();
  const { layout, device } = useResponsive();
  const [isChanging, setIsChanging] = useState(false);

  const handleDisplayModeChange = async (mode: ThemeMode) => {
    try {
      setIsChanging(true);
      await setThemeMode(mode);
    } catch (error) {
      console.error("Theme change error:", error);
    } finally {
      setIsChanging(false);
    }
  };

  const handleColorThemeChange = async (scheme: ColorScheme) => {
    try {
      setIsChanging(true);
      await setColorScheme(scheme);
    } catch (error) {
      console.error("Theme change error:", error);
    } finally {
      setIsChanging(false);
    }
  };

  const displayModeOptions: Array<{ label: string; value: ThemeMode }> = [
    { label: "浅色模式", value: "light" },
    { label: "深色模式", value: "dark" },
  ];

  const colorThemeOptions: Array<{ label: string; value: ColorScheme }> = [
    { label: "默认主题", value: "default" },
    { label: "蓝色主题", value: "blue" },
    { label: "橙色主题", value: "orange" },
    { label: "灰色主题", value: "gray" },
    { label: "粉色主题", value: "pink" },
    { label: "小清新主题", value: "pastel" },
  ];

  return (
    <ScreenContainer>
      <Container maxWidth={device === "phone" ? "100%" : 600}>
        <Column spacing={layout.gutter}>
          <Card variant="elevated">
            <Text variant="h2">显示模式</Text>
            <Column spacing={layout.gutter / 2}>
              {displayModeOptions.map((option) => (
                <Button
                  key={option.value}
                  title={option.label}
                  variant={
                    theme.isDark === (option.value === "dark")
                      ? "primary"
                      : "outline"
                  }
                  loading={isChanging}
                  onPress={() => handleDisplayModeChange(option.value)}
                />
              ))}
            </Column>
          </Card>

          <Card variant="elevated">
            <Text variant="h2">主题颜色</Text>
            <Column spacing={layout.gutter / 2}>
              {colorThemeOptions.map((option) => (
                <Button
                  key={option.value}
                  title={option.label}
                  variant={
                    theme.colorScheme === option.value ? "primary" : "outline"
                  }
                  loading={isChanging}
                  onPress={() => handleColorThemeChange(option.value)}
                />
              ))}
            </Column>
          </Card>

          <Card variant="elevated">
            <Text variant="h2">关于</Text>
            <Column spacing={layout.gutter / 2}>
              <Text variant="body">版本: 1.0.0</Text>
              <Text variant="small" color="secondary">
                React Native 主题化启动模板
              </Text>
            </Column>
          </Card>
        </Column>
      </Container>
    </ScreenContainer>
  );
};

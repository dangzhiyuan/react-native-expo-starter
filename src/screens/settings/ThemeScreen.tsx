import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "../../components/Text";
import Button from "../../components/Button";
import { useTheme } from "../../themes/ThemeProvider";
import { useResponsive } from "../../utils/responsive";
import { useTranslation } from "react-i18next";
import { Card } from "../../components/layout/Card";
import { SettingsLayout } from "../../components/layout/SettingsLayout";
import type { ThemeMode, ColorScheme } from "../../themes/types";

export const ThemeScreen = () => {
  const { t } = useTranslation();
  const { theme, setThemeMode, setColorScheme } = useTheme();
  const { layout } = useResponsive();
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

  const styles = StyleSheet.create({
    section: {
      marginBottom: layout.gutter * 2,
    },
    optionCard: {
      marginBottom: layout.gutter,
      padding: layout.padding,
      borderRadius: 12,
    },
    sectionTitle: {
      marginBottom: layout.gutter * 1.5,
    },
    optionTitle: {
      marginBottom: layout.gutter / 2,
    },
    optionDescription: {
      marginBottom: layout.gutter,
      opacity: 0.7,
    },
  });

  return (
    <SettingsLayout
      title={t("settings.theme.title")}
      description={t("settings.theme.description")}
    >
      <View style={styles.section}>
        <Text variant="h2" style={styles.sectionTitle}>
          {t("settings.theme.displayMode")}
        </Text>
        {["light", "dark"].map((mode) => (
          <Card key={mode} variant="elevated" style={styles.optionCard}>
            <Text variant="h3" style={styles.optionTitle}>
              {t(`settings.theme.${mode}`)}
            </Text>
            <Text
              variant="body"
              color="secondary"
              style={styles.optionDescription}
            >
              {t(`settings.theme.${mode}Description`)}
            </Text>
            <Button
              title={
                theme.isDark === (mode === "dark")
                  ? t("settings.theme.current")
                  : t("settings.theme.select")
              }
              variant={
                theme.isDark === (mode === "dark") ? "outline" : "primary"
              }
              loading={isChanging}
              onPress={() => handleDisplayModeChange(mode as ThemeMode)}
              leftIcon={
                theme.isDark === (mode === "dark") ? "check" : "palette"
              }
            />
          </Card>
        ))}
      </View>

      <View style={styles.section}>
        <Text variant="h2" style={styles.sectionTitle}>
          {t("settings.theme.colorScheme")}
        </Text>
        {["default", "blue", "orange", "gray", "pink", "pastel", "etrain"].map(
          (scheme) => (
            <Card key={scheme} variant="elevated" style={styles.optionCard}>
              <Text variant="h3" style={styles.optionTitle}>
                {t(`settings.theme.${scheme}`)}
              </Text>
              <Text
                variant="body"
                color="secondary"
                style={styles.optionDescription}
              >
                {t(`settings.theme.${scheme}Description`)}
              </Text>
              <Button
                title={
                  theme.colorScheme === scheme
                    ? t("settings.theme.current")
                    : t("settings.theme.select")
                }
                variant={theme.colorScheme === scheme ? "outline" : "primary"}
                loading={isChanging}
                onPress={() => handleColorThemeChange(scheme as ColorScheme)}
                leftIcon={theme.colorScheme === scheme ? "check" : "palette"}
              />
            </Card>
          )
        )}
      </View>
    </SettingsLayout>
  );
};

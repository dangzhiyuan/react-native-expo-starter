import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "../../components/Text";
import Button from "../../components/Button";
import { useTheme } from "../../themes/ThemeProvider";
import { useLanguageStore } from "../../store/languageStore";
import { useResponsive } from "../../utils/responsive";
import { useTranslation } from "react-i18next";
import { Card } from "../../components/layout/Card";
import { SettingsLayout } from "../../components/layout/SettingsLayout";
import type { Language } from "../../i18n";

export const LanguageScreen = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { layout } = useResponsive();
  const { currentLanguage, setLanguage } = useLanguageStore();

  const languageOptions: Array<{
    label: string;
    value: Language;
    description: string;
  }> = [
    {
      label: t("settings.language.zh"),
      value: "zh",
      description: t("settings.language.zhDescription"),
    },
    {
      label: t("settings.language.en"),
      value: "en",
      description: t("settings.language.enDescription"),
    },
  ];

  const styles = StyleSheet.create({
    optionCard: {
      marginBottom: layout.gutter,
      padding: layout.padding,
      borderRadius: 12,
    },
    languageOption: {
      marginBottom: layout.gutter,
    },
    languageTitle: {
      marginBottom: layout.gutter / 2,
    },
    languageDescription: {
      marginBottom: layout.gutter,
      opacity: 0.7,
    },
  });

  return (
    <SettingsLayout
      title={t("settings.language.title")}
      description={t("settings.language.description")}
    >
      {languageOptions.map((option) => (
        <Card key={option.value} variant="elevated" style={styles.optionCard}>
          <Text variant="h3" style={styles.languageTitle}>
            {option.label}
          </Text>
          <Text
            variant="body"
            color="secondary"
            style={styles.languageDescription}
          >
            {option.description}
          </Text>
          <Button
            title={
              currentLanguage === option.value
                ? t("settings.language.current")
                : t("settings.language.select")
            }
            variant={currentLanguage === option.value ? "outline" : "primary"}
            onPress={() => setLanguage(option.value)}
            leftIcon={currentLanguage === option.value ? "check" : "language"}
          />
        </Card>
      ))}
    </SettingsLayout>
  );
};

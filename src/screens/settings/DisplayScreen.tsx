import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "../../components/Text/Text";
import Button from "../../components/Button";
import { useTheme } from "../../themes/ThemeProvider";
import { useUIStore } from "../../store/uiStore";
import { useResponsive } from "../../utils/responsive";
import { useTranslation } from "react-i18next";
import { Card } from "../../components/layout/Card";
import { SettingsLayout } from "../../components/layout/SettingsLayout";

export const DisplayScreen = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { layout } = useResponsive();
  const { isHeaderVisible, toggleHeader } = useUIStore();

  const styles = StyleSheet.create({
    optionCard: {
      marginBottom: layout.gutter,
      padding: layout.padding,
      borderRadius: 12,
    },
    optionTitle: {
      marginBottom: layout.gutter,
    },
    optionDescription: {
      marginBottom: layout.gutter * 1.5,
      opacity: 0.7,
    },
  });

  return (
    <SettingsLayout
      title={t("settings.display.title")}
      description={t("settings.display.description")}
    >
      <Card variant="elevated" style={styles.optionCard}>
        <Text variant="h3" style={styles.optionTitle}>
          {t("settings.header.title")}
        </Text>
        <Text variant="body" color="secondary" style={styles.optionDescription}>
          {t("settings.header.description")}
        </Text>
        <Button
          title={
            isHeaderVisible
              ? t("settings.header.hide")
              : t("settings.header.show")
          }
          variant={isHeaderVisible ? "outline" : "primary"}
          onPress={toggleHeader}
          leftIcon={isHeaderVisible ? "visibility-off" : "visibility"}
        />
      </Card>
    </SettingsLayout>
  );
};

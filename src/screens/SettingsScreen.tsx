import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Text } from "../components/Text";
import Button from "../components/Button";
import { useTheme } from "../themes/ThemeProvider";
import { useUIStore } from "../store/uiStore";
import { useLanguageStore } from "../store/languageStore";
import { useResponsive } from "../utils/responsive";
import { useTranslation } from "react-i18next";
import { Card } from "../components/layout/Card";
import { ScreenContainer } from "../components/layout/ScreenContainer";
import { Container } from "../components/layout/Container";
import type { Language } from "../i18n";
import type { ThemeMode, ColorScheme } from "../themes/types";

export const SettingsScreen = () => {
  const { t } = useTranslation();
  const { theme, setThemeMode, setColorScheme } = useTheme();
  const { layout, device } = useResponsive();
  const { isHeaderVisible, toggleHeader } = useUIStore();
  const { currentLanguage, setLanguage } = useLanguageStore();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      padding: layout.padding,
    },
    section: {
      marginBottom: layout.gutter * 2,
    },
    sectionTitle: {
      marginBottom: layout.gutter,
    },
    sectionDescription: {
      marginBottom: layout.gutter * 1.5,
      opacity: 0.7,
    },
    optionCard: {
      marginBottom: layout.gutter,
      padding: layout.padding,
      borderRadius: 12,
    },
    optionTitle: {
      marginBottom: layout.gutter / 2,
    },
    optionDescription: {
      marginBottom: layout.gutter,
      opacity: 0.7,
    },
  });

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

  return (
    <ScreenContainer>
      <Container maxWidth={device === "phone" ? "100%" : 600}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* 显示设置 */}
          <View style={styles.section}>
            <Text variant="h2" style={styles.sectionTitle}>
              {t("settings.display.title")}
            </Text>
            <Text
              variant="body"
              color="secondary"
              style={styles.sectionDescription}
            >
              {t("settings.display.description")}
            </Text>
            <Card variant="elevated" style={styles.optionCard}>
              <Text variant="h3" style={styles.optionTitle}>
                {t("settings.header.title")}
              </Text>
              <Text
                variant="body"
                color="secondary"
                style={styles.optionDescription}
              >
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
          </View>

          {/* 语言设置 */}
          <View style={styles.section}>
            <Text variant="h2" style={styles.sectionTitle}>
              {t("settings.language.title")}
            </Text>
            <Text
              variant="body"
              color="secondary"
              style={styles.sectionDescription}
            >
              {t("settings.language.description")}
            </Text>
            {languageOptions.map((option) => (
              <Card
                key={option.value}
                variant="elevated"
                style={styles.optionCard}
              >
                <Text variant="h3" style={styles.optionTitle}>
                  {option.label}
                </Text>
                <Text
                  variant="body"
                  color="secondary"
                  style={styles.optionDescription}
                >
                  {option.description}
                </Text>
                <Button
                  title={
                    currentLanguage === option.value
                      ? t("settings.language.current")
                      : t("settings.language.select")
                  }
                  variant={
                    currentLanguage === option.value ? "outline" : "primary"
                  }
                  onPress={() => setLanguage(option.value)}
                  leftIcon={
                    currentLanguage === option.value ? "check" : "language"
                  }
                />
              </Card>
            ))}
          </View>

          {/* 主题设置 */}
          <View style={styles.section}>
            <Text variant="h2" style={styles.sectionTitle}>
              {t("settings.theme.title")}
            </Text>
            <Text
              variant="body"
              color="secondary"
              style={styles.sectionDescription}
            >
              {t("settings.theme.description")}
            </Text>

            {/* 显示模式 */}
            <Text
              variant="h3"
              style={[styles.sectionTitle, { marginTop: layout.gutter }]}
            >
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
                  onPress={() => setThemeMode(mode as ThemeMode)}
                  leftIcon={
                    theme.isDark === (mode === "dark") ? "check" : "palette"
                  }
                />
              </Card>
            ))}

            {/* 主题颜色 */}
            <Text
              variant="h3"
              style={[styles.sectionTitle, { marginTop: layout.gutter * 2 }]}
            >
              {t("settings.theme.colorScheme")}
            </Text>
            {[
              "default",
              "blue",
              "orange",
              "gray",
              "pink",
              "pastel",
              "etrain",
            ].map((scheme) => (
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
                  onPress={() => setColorScheme(scheme as ColorScheme)}
                  leftIcon={theme.colorScheme === scheme ? "check" : "palette"}
                />
              </Card>
            ))}
          </View>
        </ScrollView>
      </Container>
    </ScreenContainer>
  );
};

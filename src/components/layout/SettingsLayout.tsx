import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { ScreenContainer } from "./ScreenContainer";
import { Container } from "./Container";
import { useResponsive } from "../../utils/responsive";
import { useTheme } from "../../themes/ThemeProvider";
import { Text } from "../Text";

interface SettingsLayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const SettingsLayout = ({
  title,
  description,
  children,
}: SettingsLayoutProps) => {
  const { layout, device } = useResponsive();
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      padding: layout.padding,
    },
    header: {
      marginBottom: layout.gutter * 2,
    },
    title: {
      marginBottom: layout.gutter / 2,
    },
    description: {
      opacity: 0.7,
    },
  });

  return (
    <ScreenContainer>
      <Container maxWidth={device === "phone" ? "100%" : 600}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text variant="h1" style={styles.title}>
              {title}
            </Text>
            {description && (
              <Text variant="body" color="secondary" style={styles.description}>
                {description}
              </Text>
            )}
          </View>
          {children}
        </ScrollView>
      </Container>
    </ScreenContainer>
  );
};

import React from "react";
import { View, StyleSheet, Image, Pressable } from "react-native";
import type { DrawerContentComponentProps } from "@react-navigation/drawer";
import { DrawerItem } from "@react-navigation/drawer";
import { Text } from "../Text/Text";
import { useTheme } from "../../themes/ThemeProvider";
import { useAuthStore } from "../../store/authStore";
import { MaterialIcons } from "@expo/vector-icons";
import { moderateScale, spacing, isTablet } from "../../utils/responsive";
import { useTranslation } from "react-i18next";

export const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { user, logout } = useAuthStore();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: spacing.md,
    },
    userSection: {
      padding: 16,
      marginBottom: 8,
      alignItems: "center",
      backgroundColor: theme.primary,
      borderRadius: 12,
    },
    avatarContainer: {
      width: moderateScale(isTablet ? 100 : 80),
      height: moderateScale(isTablet ? 100 : 80),
      borderRadius: moderateScale(isTablet ? 50 : 40),
      backgroundColor: "#FFFFFF",
      padding: 2,
      marginBottom: 12,
      elevation: 4,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    avatar: {
      width: "100%",
      height: "100%",
      borderRadius: moderateScale(isTablet ? 50 : 40),
    },
    username: {
      marginBottom: spacing.xs,
    },
    email: {
      marginBottom: spacing.md,
      opacity: 0.9,
    },
    section: {
      marginBottom: spacing.md,
    },
    sectionTitle: {
      paddingHorizontal: spacing.sm,
      marginBottom: spacing.xs,
      opacity: 0.7,
    },
  });

  const renderDrawerItem = (
    label: string,
    icon: keyof typeof MaterialIcons.glyphMap,
    route: string
  ) => (
    <DrawerItem
      label={label}
      icon={({ color, size }) => (
        <MaterialIcons name={icon} color={color} size={size} />
      )}
      activeBackgroundColor={theme.primary + "20"}
      activeTintColor={theme.primary}
      inactiveTintColor={theme.text.secondary}
      onPress={() => props.navigation.navigate(route)}
    />
  );

  return (
    <View style={styles.container}>
      <Pressable style={styles.userSection}>
        <View style={styles.avatarContainer}>
          <Image
            source={
              user?.avatar
                ? { uri: user.avatar }
                : require("../../../assets/logo.png")
            }
            style={styles.avatar}
            resizeMode="cover"
          />
        </View>
        <Text variant="h3" color="inverse" style={styles.username}>
          {user?.name || "用户名"}
        </Text>
        <Text variant="small" color="inverse" style={styles.email}>
          {user?.email || "user@example.com"}
        </Text>
      </Pressable>

      <View style={styles.section}>
        <Text variant="small" color="secondary" style={styles.sectionTitle}>
          {t("navigation.main")}
        </Text>
        {renderDrawerItem(t("navigation.home"), "home", "Home")}
        {renderDrawerItem(t("navigation.profile"), "person", "Profile")}
        {renderDrawerItem(t("navigation.components"), "widgets", "Components")}
        {renderDrawerItem(t("navigation.settings"), "settings", "Settings")}
      </View>

      <DrawerItem
        label={t("auth.logout")}
        icon={({ size }) => (
          <MaterialIcons name="logout" size={size} color={theme.error} />
        )}
        labelStyle={{ color: theme.error }}
        onPress={logout}
      />
    </View>
  );
};

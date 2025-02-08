import React from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import type { DrawerContentComponentProps } from "@react-navigation/drawer";
import { Text } from "./Text";
import { useTheme } from "../themes/ThemeProvider";
import { useAuthStore } from "../store/authStore";
import { MaterialIcons } from "@expo/vector-icons";
import { moderateScale, spacing, isTablet } from "../utils/responsive";

const { height } = Dimensions.get("window");

// 使用本地头像图片
const mockUserData = {
  avatar: require("../../assets/logo.png"),
  username: "DemoUser",
  email: "demo@example.com",
};

export const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const { theme } = useTheme();
  const logout = useAuthStore((state) => state.logout);

  return (
    <View style={styles.container}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={[styles.userSection, { backgroundColor: theme.primary }]}>
          <View style={styles.avatarContainer}>
            <Image
              source={mockUserData.avatar}
              style={styles.avatar}
              resizeMode="cover"
            />
          </View>
          <Text variant="h3" color="inverse" style={styles.username}>
            {mockUserData.username}
          </Text>
          <Text variant="small" color="inverse" style={styles.email}>
            {mockUserData.email}
          </Text>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <View style={[styles.logoutSection, { borderTopColor: theme.border }]}>
        <DrawerItem
          label="退出登录"
          onPress={logout}
          icon={({ color, size }) => (
            <MaterialIcons name="logout" size={size} color={theme.error} />
          )}
          labelStyle={{ color: theme.error }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
  },
  scrollContent: {
    flexGrow: 1,
  },
  userSection: {
    padding: 16,
    marginBottom: 8,
    alignItems: "center",
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
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
    width: moderateScale(isTablet ? 100 : 80),
    height: moderateScale(isTablet ? 100 : 80),
    borderRadius: moderateScale(isTablet ? 50 : 40),
    marginBottom: spacing.sm,
  },
  username: {
    marginBottom: spacing.xs,
  },
  email: {
    marginBottom: spacing.md,
  },
  logoutSection: {
    borderTopWidth: 1,
    paddingVertical: 8,
    marginTop: "auto", // 将退出按钮推到底部
  },
  divider: {
    height: 1,
    marginVertical: spacing.md,
  },
});

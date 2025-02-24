import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Text } from "../Text/Text";
import { useTheme } from "../../themes/ThemeProvider";
import { spacing, fontSizes, scale } from "../../utils/responsive";
import { useTranslation } from "react-i18next";

interface User {
  name: string;
  avatar?: string;
  role?: string;
}

interface ProfileHeaderProps {
  user?: User;
}

export const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  // 模拟用户数据
  const mockUser: User = {
    name: "Demo User",
    role: "Engineer",
    avatar: undefined, // 使用默认头像
  };

  const currentUser = user || mockUser;

  const styles = StyleSheet.create({
    header: {
      marginBottom: spacing.xl,
    },
    userSection: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: spacing.xl,
    },
    avatar: {
      width: scale(50),
      height: scale(50),
      borderRadius: scale(25),
      overflow: "hidden",
      marginRight: spacing.md,
    },
    userInfo: {
      flex: 1,
    },
    title: {
      fontSize: fontSizes.h2,
      fontWeight: "bold",
      marginBottom: spacing.xs,
    },
    subtitle: {
      fontSize: fontSizes.body,
      opacity: 0.7,
    },
  });

  return (
    <View style={styles.header}>
      <View style={styles.userSection}>
        <View style={styles.avatar}>
          <Image
            source={
              currentUser.avatar
                ? { uri: currentUser.avatar }
                : require("../../../assets/icon2.png")
            }
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <View style={styles.userInfo}>
          <Text style={[styles.title, { color: theme.text.primary }]}>
            {t("hello")} {currentUser.name}
          </Text>
          <Text style={[styles.subtitle, { color: theme.text.primary }]}>
            {currentUser.role ? currentUser.role : t("helloInfo")}
          </Text>
        </View>
      </View>
    </View>
  );
};

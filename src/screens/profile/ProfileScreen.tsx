import { Container, Card, Divider } from "@/components";
import { Column } from "@/components/layout/Column";
import { ResponsiveImage } from "@/components/layout/ResponsiveImage";
import { Row } from "@/components/layout/Row";
import { withAuthGuard } from "@/navigation/guards/AuthGuard";
import { useAuthStore } from "@/store/authStore";
import { useThemeContext } from "@/themes/ThemeProvider";
import { useResponsive } from "@/utils";
import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Text } from "@/components/Text/Text";
import Button from "@/components/Button/Button";
import { MaterialIcons } from "@expo/vector-icons";

// 模拟用户数据
const mockUserData = {
  avatar: "https://via.placeholder.com/100",
  username: "DemoUser",
  email: "demo@example.com",
  joinDate: "2024-03-01",
  stats: {
    posts: 42,
    followers: 128,
    following: 97,
  },
};

type StatItemProps = {
  label: string;
  value: number;
};

const StatItem = ({ label, value }: StatItemProps) => {
  const { theme } = useThemeContext();

  return (
    <View style={styles.statItem}>
      <Text variant="h2" style={{ color: theme.primary }}>
        {value}
      </Text>
      <Text variant="small" color="secondary">
        {label}
      </Text>
    </View>
  );
};

const ProfileScreen = () => {
  const { layout, device } = useResponsive();
  const { theme } = useThemeContext();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Container>
        <Card variant="elevated">
          <Column spacing={layout.gutter}>
            <Row justify="center">
              <ResponsiveImage
                source={require("../../../assets/logo.png")}
                aspectRatio={1}
                maxWidth={device === "phone" ? 120 : 160}
                style={styles.avatar}
              />
            </Row>

            <Divider />

            <Row justify="space-around">
              <StatItem label="帖子" value={42} />
              <Divider vertical />
              <StatItem label="关注者" value={128} />
              <Divider vertical />
              <StatItem label="关注" value={97} />
            </Row>

            <View style={styles.section}>
              <Text variant="h3">账户信息</Text>
              <View style={styles.infoItem}>
                <MaterialIcons
                  name="person"
                  size={20}
                  color={theme.text.secondary}
                />
                <Text variant="body" style={styles.infoText}>
                  {mockUserData.username}
                </Text>
              </View>
              <View style={styles.infoItem}>
                <MaterialIcons
                  name="email"
                  size={20}
                  color={theme.text.secondary}
                />
                <Text variant="body" style={styles.infoText}>
                  {mockUserData.email}
                </Text>
              </View>
              <View style={styles.infoItem}>
                <MaterialIcons
                  name="calendar-today"
                  size={20}
                  color={theme.text.secondary}
                />
                <Text variant="body" style={styles.infoText}>
                  加入时间：{mockUserData.joinDate}
                </Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text variant="h3">账户操作</Text>
              <Button
                title="编辑资料"
                variant="outline"
                style={styles.actionButton}
                onPress={() => {}}
              />
              <Button
                title="修改密码"
                variant="outline"
                style={styles.actionButton}
                onPress={() => {}}
              />
              <Button
                title="退出登录"
                variant="primary"
                style={[styles.actionButton, styles.logoutButton]}
                onPress={handleLogout}
              />
            </View>
          </Column>
        </Card>
      </Container>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileCard: {
    margin: 16,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 16,
    marginBottom: 24,
  },
  statItem: {
    alignItems: "center",
  },
  statsDivider: {
    width: 1,
    height: 40,
  },
  section: {
    marginBottom: 24,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  infoText: {
    marginLeft: 12,
  },
  actionButton: {
    marginTop: 12,
  },
  logoutButton: {
    backgroundColor: "#dc3545", // 使用红色表示危险操作
  },
});

// 使用 AuthGuard 包装组件，确保只有登录用户才能访问
export default withAuthGuard(ProfileScreen);

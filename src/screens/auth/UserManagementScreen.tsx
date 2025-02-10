import React from "react";
import { View, StyleSheet } from "react-native";
import { withRoleGuard } from "@/navigation/guards/RoleGuard";
import { Text } from "@/components/Text/Text";

function UserManagementScreen() {
  return (
    <View style={styles.container}>
      <Text variant="h1">用户管理</Text>

      <View style={styles.content}>{/* 用户管理功能 */}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  content: {
    marginTop: 24,
  },
});

//角色路由守卫示例
// 使用 RoleGuard 包装组件，只允许管理员访问
export default withRoleGuard(UserManagementScreen, ["admin"]);

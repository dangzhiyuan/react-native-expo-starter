import React from "react";
import { useAuthStore } from "@/store/authStore";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { View } from "react-native";

// 角色守卫，用于控制特定角色才能访问的页面
export function withRoleGuard<T extends object>(
  WrappedComponent: React.ComponentType<T>,
  allowedRoles: any[] // 允许的角色数组
) {
  return function RoleGuardComponent(props: T) {
    const navigation = useNavigation<NavigationProp<any>>();
    const user = useAuthStore((state) => state.user);

    React.useEffect(() => {
      if (!user || !allowedRoles.includes(user.role)) {
        // 如果用户角色不符，重定向到无权限页面
        navigation.navigate("NoPermission");
      }
    }, [user]);

    if (!user || !allowedRoles.includes(user.role)) return null;

    return <WrappedComponent {...props} />;
  };
}

// 使用示例
function AdminPanel() {
  return <View>{/* 管理员面板内容 */}</View>;
}

// 只允许管理员访问
export default withRoleGuard(AdminPanel, ["admin"]);

import React from "react";
import { useAuthStore } from "@/store/authStore";
import { NavigationProp, useNavigation } from "@react-navigation/native";

// 高阶组件，用于包装需要认证的页面组件
export function withAuthGuard<T extends object>(
  WrappedComponent: React.ComponentType<T>
) {
  return function AuthGuardComponent(props: T) {
    const navigation = useNavigation<NavigationProp<any>>();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    // 监听认证状态变化
    React.useEffect(() => {
      if (!isAuthenticated) {
        // 如果未认证，重定向到登录页
        navigation.navigate("Login");
      }
    }, [isAuthenticated]);

    // 未认证时不渲染组件
    if (!isAuthenticated) return null;

    // 认证通过则渲染原始组件
    return <WrappedComponent {...props} />;
  };
}

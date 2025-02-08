import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { DrawerNavigator } from "./DrawerNavigator";
import { AuthNavigator } from "./AuthNavigator";
import { useAuthStore } from "../store/authStore";
import { navigationRef } from "./navigationRef";
import { useNetworkToast } from "../hooks/useNetworkToast";
import { reportError } from "../services/errorReporting";
import type { NavigationState } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  useNetworkToast();

  const handleStateChange = (state: NavigationState | undefined) => {
    if (state) {
      const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;
      if (currentRouteName) {
        // 可以在这里添加路由分析或日志记录
        console.log("Current route:", currentRouteName);
      }
    }
  };

  const handleNavigationError = (error: any) => {
    reportError(new Error(error.message || "Navigation error"), {
      route: navigationRef.current?.getCurrentRoute()?.name || "未知路由",
    });
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={handleStateChange}
      onUnhandledAction={handleNavigationError}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="Main" component={DrawerNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

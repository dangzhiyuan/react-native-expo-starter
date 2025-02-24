import React, { useSyncExternalStore } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { userStore } from "../stroages/userStorage";
import MainNavigation from "./MainNavigation";
import LoginScreen from "../screens/LoginScreen";

const Stack = createNativeStackNavigator();
export default function RootNavigation() {
  const userStatus = useSyncExternalStore(
    userStore.subscribe,
    () => userStore.getState().status
  );

  const userLoading = useSyncExternalStore(
    userStore.subscribe,
    () => userStore.getState().loading
  );

  console.log("启动完成标识：", userLoading);
  console.log("当前登录状态：", userStatus);

  const renderScreens = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {userStatus === "signIn" ? (
          <Stack.Screen name="MainApp" component={MainNavigation} />
        ) : (
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
        )}
      </Stack.Navigator>
    );
  };

  return (
    // <ThemeProvider>
    <NavigationContainer>{renderScreens()}</NavigationContainer>
    // </ThemeProvider>
  );
}

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";

const AuthStack = createNativeStackNavigator();

export default function StartNavigation() {
  return (
    <AuthStack.Navigator
      initialRouteName="StartScreen"
      screenOptions={{
        headerShown: false,
        animation: "flip",
      }}
    >
      <AuthStack.Screen
        name={"LoginScreen"}
        component={LoginScreen}
        options={{
          headerTitle: "",
        }}
      />
    </AuthStack.Navigator>
  );
}

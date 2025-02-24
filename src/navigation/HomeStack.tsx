import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "@/screens/Home/HomeScreen";
import CreateTrain from "@/screens/Create/CreateTrain";
import type { HomeStackParamList } from "./types";
import { useTheme } from "@/themes/ThemeProvider";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { BackHandlerWrapper } from "@/components/BackHandler/BackHandlerWrapper";

const Stack = createNativeStackNavigator<HomeStackParamList>();

export const HomeStack = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <BackHandlerWrapper>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.background,
          },
          headerTintColor: theme.text.primary,
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateTrain"
          component={CreateTrain}
          options={{
            title: t("home.createTrain"),
          }}
        />
      </Stack.Navigator>
    </BackHandlerWrapper>
  );
};

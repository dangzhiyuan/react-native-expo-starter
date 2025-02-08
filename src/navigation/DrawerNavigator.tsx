import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import type {
  DrawerContentComponentProps,
  DrawerNavigationOptions,
} from "@react-navigation/drawer";
import { TextStyle } from "react-native";
import { useTheme } from "../themes/ThemeProvider";
import { useResponsive } from "../utils/responsive";
import { useBreakpoint } from "../hooks/useBreakpoint";
import { ComponentsScreen } from "../screens/ComponentsScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { SettingsScreen } from "../screens/SettingsScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { MaterialIcons } from "@expo/vector-icons";
import { CustomDrawerContent } from "../components/CustomDrawerContent";
import { DrawerToggleButton } from "../components/DrawerToggleButton";

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  const { theme } = useTheme();
  const { layout } = useResponsive();
  const { up } = useBreakpoint();

  if (!theme) {
    return null; // 或者返回一个加载指示器
  }

  const getDrawerWidth = () => {
    if (up("xl")) return "20%";
    if (up("lg")) return "25%";
    if (up("md")) return "30%";
    return "80%";
  };

  const renderDrawerIcon = (name: keyof typeof MaterialIcons.glyphMap) => {
    return ({ color, size }: { color: string; size: number }) => (
      <MaterialIcons name={name} size={size} color={color} />
    );
  };

  const screenOptions: DrawerNavigationOptions = {
    headerStyle: {
      backgroundColor: theme.surface,
      height: layout.gutter * 3.5,
    },
    headerTintColor: theme.text.primary,
    headerTitleStyle: {
      fontWeight: theme.typography.weights.h2 as TextStyle["fontWeight"],
      fontSize: theme.typography.sizes.h3,
    },
    drawerStyle: {
      backgroundColor: theme.surface,
      width: getDrawerWidth(),
    },
    drawerType: up("md") ? "permanent" : "front",
    drawerPosition: "right",
    drawerActiveTintColor: theme.primary,
    drawerInactiveTintColor: theme.text.secondary,
    headerLeft: () => null,
    headerRight: ({ tintColor }: { tintColor?: string }) =>
      !up("md") && <DrawerToggleButton tintColor={tintColor} />,
  };

  return (
    <Drawer.Navigator
      screenOptions={screenOptions}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "首页",
          drawerIcon: renderDrawerIcon("home"),
        }}
      />
      <Drawer.Screen
        name="Components"
        component={ComponentsScreen}
        options={{
          title: "组件",
          drawerIcon: renderDrawerIcon("widgets"),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "个人资料",
          drawerIcon: renderDrawerIcon("person"),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: "设置",
          drawerIcon: renderDrawerIcon("settings"),
        }}
      />
    </Drawer.Navigator>
  );
};

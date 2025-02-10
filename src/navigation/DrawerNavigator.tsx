import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useTheme } from "../themes/ThemeProvider";
import { useResponsive } from "../utils/responsive";
import { ComponentsScreen } from "../screens/ComponentsScreen";
import ProfileScreen from "@/screens/profile/ProfileScreen";
import { CustomDrawerContent } from "../components/drawer/CustomDrawerContent";
import { DrawerToggleButton } from "../components/DrawerToggleButton";
import { useTranslation } from "react-i18next";
import { HomeScreen } from "../screens/HomeScreen";
import { SettingsScreen } from "../screens/SettingsScreen";
import { useUIStore } from "../store/uiStore";

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  const { t } = useTranslation();
  const { layout, device } = useResponsive();
  const { theme } = useTheme();
  const isHeaderVisible = useUIStore((state) => state.isHeaderVisible);

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ navigation }) => ({
        headerShown: isHeaderVisible,
        drawerType: device === "tablet" ? "permanent" : "front",
        drawerStyle: {
          width: device === "tablet" ? layout.drawerWidth : "85%",
          backgroundColor: theme.surface,
        },
        drawerPosition: "right",
        overlayColor: theme.text.primary + "40",
        headerLeft: () => null,
        headerRight: () =>
          device !== "tablet" ? <DrawerToggleButton /> : null,
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: "600",
          color: theme.text.inverse,
        },
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: theme.primary,
          elevation: 4,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        },
      })}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: t("navigation.home"),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "个人资料",
        }}
      />
      <Drawer.Screen
        name="Components"
        component={ComponentsScreen}
        options={{
          title: t("navigation.components"),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: t("navigation.settings"),
        }}
      />
    </Drawer.Navigator>
  );
};

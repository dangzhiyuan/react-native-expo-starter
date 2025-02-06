import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import type { 
  DrawerContentComponentProps, 
  DrawerNavigationOptions 
} from '@react-navigation/drawer';
import { useThemeContext } from '../themes/ThemeProvider';
import { ComponentsScreen } from '../screens/ComponentsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { MaterialIcons } from '@expo/vector-icons';
import { CustomDrawerContent } from '../components/CustomDrawerContent';
import { DrawerToggleButton } from '../components/DrawerToggleButton';
import { moderateScale, isTablet } from '../utils/responsive';
import { HomeScreen } from '../screens/HomeScreen';

const Drawer = createDrawerNavigator();

interface DrawerIconProps {
  color: string;
  size: number;
}

export const DrawerNavigator = () => {
  const { theme } = useThemeContext();

  const renderDrawerIcon = (name: keyof typeof MaterialIcons.glyphMap) => {
    return ({ color, size }: DrawerIconProps) => (
      <MaterialIcons name={name} size={size} color={color} />
    );
  };

  return (
    <Drawer.Navigator
      drawerContent={(props: DrawerContentComponentProps) => (
        <CustomDrawerContent {...props} />
      )}
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.text.inverse,
        headerTitleStyle: {
          fontWeight: theme.typography.weights.h2,
        },
        drawerStyle: {
          backgroundColor: theme.colors.background,
          width: isTablet ? '40%' : '75%',
        },
        drawerPosition: 'right',
        drawerActiveTintColor: theme.colors.primary,
        drawerInactiveTintColor: theme.colors.text.secondary,
        headerLeft: () => null,
        headerRight: ({ tintColor }: { tintColor?: string }) => (
          <DrawerToggleButton tintColor={tintColor} />
        ),
      }}
    >
      <Drawer.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          title: '首页',
          drawerIcon: renderDrawerIcon('home'),
        }}
      />
      <Drawer.Screen 
        name="Components" 
        component={ComponentsScreen}
        options={{
          title: '组件',
          drawerIcon: renderDrawerIcon('widgets'),
        }}
      />
      <Drawer.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          title: '个人资料',
          drawerIcon: renderDrawerIcon('person'),
        }}
      />
      <Drawer.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{
          title: '设置',
          drawerIcon: renderDrawerIcon('settings'),
        }}
      />
    </Drawer.Navigator>
  );
}; 
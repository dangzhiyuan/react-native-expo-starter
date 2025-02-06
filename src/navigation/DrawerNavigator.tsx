import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import type { 
  DrawerContentComponentProps, 
  DrawerNavigationOptions 
} from '@react-navigation/drawer';
import { useThemeContext } from '../themes/ThemeProvider';
import { useResponsive } from '../utils/responsive';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { ComponentsScreen } from '../screens/ComponentsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { MaterialIcons } from '@expo/vector-icons';
import { CustomDrawerContent } from '../components/CustomDrawerContent';
import { DrawerToggleButton } from '../components/DrawerToggleButton';

const Drawer = createDrawerNavigator();

interface DrawerIconProps {
  color: string;
  size: number;
}

export const DrawerNavigator = () => {
  const { theme } = useThemeContext();
  const { layout } = useResponsive();
  const { up } = useBreakpoint();

  const getDrawerWidth = () => {
    if (up('xl')) return '20%';
    if (up('lg')) return '25%';
    if (up('md')) return '30%';
    if (up('sm')) return '40%';
    return '75%';
  };

  const renderDrawerIcon = (name: keyof typeof MaterialIcons.glyphMap) => {
    return ({ color, size }: DrawerIconProps) => (
      <MaterialIcons name={name} size={size} color={color} />
    );
  };

  const screenOptions: DrawerNavigationOptions = {
    headerStyle: {
      backgroundColor: theme.colors.primary,
      height: layout.gutter * 3.5,
    },
    headerTintColor: theme.colors.text.inverse,
    headerTitleStyle: {
      fontWeight: theme.typography.weights.h2,
      fontSize: theme.typography.sizes.h3,
    },
    drawerStyle: {
      backgroundColor: theme.colors.background,
      width: getDrawerWidth(),
    },
    drawerType: up('md') ? 'permanent' : 'front',
    drawerPosition: 'right',
    drawerActiveTintColor: theme.colors.primary,
    drawerInactiveTintColor: theme.colors.text.secondary,
    headerLeft: () => null,
    headerRight: ({ tintColor }: { tintColor?: string }) => (
      !up('md') && <DrawerToggleButton tintColor={tintColor} />
    ),
  };

  return (
    <Drawer.Navigator
      drawerContent={(props: DrawerContentComponentProps) => (
        <CustomDrawerContent {...props} />
      )}
      screenOptions={screenOptions}
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
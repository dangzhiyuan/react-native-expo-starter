import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './themes/ThemeProvider';
import { AnimatedThemeProvider } from './themes/AnimatedThemeContext';
import { ToastProvider } from './components/Toast/ToastContext';
import { RootNavigator } from './navigation/RootNavigator';
import { StatusBar } from 'expo-status-bar';
import { useAppState } from './hooks/useAppState';

const AppContent = () => {
  // 在 ToastProvider 内部使用 useAppState
  useAppState();

  return (
    <NavigationContainer>
      <RootNavigator />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AnimatedThemeProvider>
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </AnimatedThemeProvider>
    </ThemeProvider>
  );
};

export default App; 
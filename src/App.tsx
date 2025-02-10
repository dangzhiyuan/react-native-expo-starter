import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "./themes/ThemeProvider";
import { AnimatedThemeProvider } from "./themes/AnimatedThemeContext";
import { ToastProvider } from "./components/Toast/ToastContext";
import { NetworkProvider } from "./contexts/NetworkProvider";
import { RootNavigator } from "./navigation/RootNavigator";
import { StatusBar } from "expo-status-bar";
import { useAppState } from "./hooks/useAppState";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";
import { errorReporting } from "./services/errorReporting";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { useDoubleBackExit } from "./hooks/useDoubleBackExit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./i18n";

// 创建 QueryClient 实例
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const AppContent = () => {
  useAppState();
  useDoubleBackExit();

  return (
    <>
      <RootNavigator />
      <StatusBar style="auto" hidden={true} />
    </>
  );
};

const App = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <ErrorBoundary>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider>
              <ToastProvider>
                <NetworkProvider>
                  <AnimatedThemeProvider>
                    <AppContent />
                  </AnimatedThemeProvider>
                </NetworkProvider>
              </ToastProvider>
            </ThemeProvider>
          </QueryClientProvider>
        </ErrorBoundary>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

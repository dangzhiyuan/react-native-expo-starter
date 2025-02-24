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
import { errorService } from "@/services/error";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./i18n";
import FlashMessage from "react-native-flash-message";
import { BackHandlerComponent } from "./components/BackHandler/BackHandlerComponent";
import { useToast } from "./components/Toast/ToastProvider";
import { useDoubleBackExit } from "./hooks/useDoubleBackExit";

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

// 将使用 useToast 的逻辑移到一个单独的组件中
const ErrorServiceInitializer = () => {
  const { showToast } = useToast();

  React.useEffect(() => {
    errorService.setToastFunction(showToast);
  }, [showToast]);

  return null;
};

const AppContent = () => {
  useAppState();

  return (
    <>
      <ErrorServiceInitializer />
      <RootNavigator />
      <FlashMessage position="center" />
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
                    <NavigationContainer>
                      <AppContent />
                    </NavigationContainer>
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

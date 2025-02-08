import React, { createContext, useContext } from "react";
import { useTheme } from "./ThemeProvider";
import type { Theme } from "./types";
import Animated, {
  useAnimatedReaction,
  withTiming,
  useSharedValue,
} from "react-native-reanimated";

interface AnimatedThemeContextType {
  theme: Theme;
}

const AnimatedThemeContext = createContext<
  AnimatedThemeContextType | undefined
>(undefined);

export const AnimatedThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { theme } = useTheme();
  const animatedValue = useSharedValue(theme.isDark ? 1 : 0);

  useAnimatedReaction(
    () => theme.isDark,
    (isDark) => {
      animatedValue.value = withTiming(isDark ? 1 : 0, {
        duration: 300,
      });
    },
    [theme.isDark]
  );

  return (
    <AnimatedThemeContext.Provider value={{ theme }}>
      {children}
    </AnimatedThemeContext.Provider>
  );
};

export const useAnimatedTheme = () => {
  const context = useContext(AnimatedThemeContext);
  if (!context) {
    throw new Error(
      "useAnimatedTheme must be used within an AnimatedThemeProvider"
    );
  }
  return context;
};

import React, { createContext, useContext, useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import { useThemeContext } from './ThemeProvider';

interface AnimatedThemeContextType {
  animatedValue: Animated.Value;
  interpolateColor: (lightColor: string, darkColor: string) => Animated.AnimatedInterpolation<string>;
}

const AnimatedThemeContext = createContext<AnimatedThemeContextType | undefined>(undefined);

export const AnimatedThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme, displayMode } = useThemeContext();
  const animatedValue = useRef(new Animated.Value(theme.isDark ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: theme.isDark ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [displayMode]);

  const interpolateColor = (lightColor: string, darkColor: string) => {
    return animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [lightColor, darkColor],
    });
  };

  return (
    <AnimatedThemeContext.Provider value={{ animatedValue, interpolateColor }}>
      {children}
    </AnimatedThemeContext.Provider>
  );
};

export const useAnimatedTheme = () => {
  const context = useContext(AnimatedThemeContext);
  if (!context) {
    throw new Error('useAnimatedTheme must be used within an AnimatedThemeProvider');
  }
  return context;
}; 
import React, { useEffect } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { Text } from './Text';
import { useThemeContext } from '../themes/ThemeProvider';

interface ToastProps {
  message: string;
  duration?: number;
  onHide: () => void;
}

export const Toast = ({ message, duration = 2000, onHide }: ToastProps) => {
  const { theme } = useThemeContext();
  const opacity = new Animated.Value(0);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(duration),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => onHide());
  }, []);

  return (
    <Animated.View 
      style={[
        styles.container, 
        { backgroundColor: theme.colors.text.primary, opacity }
      ]}
    >
      <Text variant="body" color="inverse" style={styles.text}>
        {message}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  text: {
    textAlign: 'center',
  },
}); 
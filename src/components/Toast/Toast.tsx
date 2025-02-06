import React, { useEffect } from 'react';
import { Animated, StyleSheet, Dimensions } from 'react-native';
import { Text } from '../Text';
import { useThemeContext } from '../../themes/ThemeProvider';
import { MaterialIcons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

export type ToastType = 'success' | 'error' | 'warning' | 'info';
export type ToastPosition = 'top' | 'bottom';

export interface ToastProps {
  message: string;
  type?: ToastType;
  position?: ToastPosition;
  duration?: number;
  onHide: () => void;
}

const getIconName = (type: ToastType) => {
  switch (type) {
    case 'success':
      return 'check-circle';
    case 'error':
      return 'error';
    case 'warning':
      return 'warning';
    case 'info':
      return 'info';
  }
};

export const Toast = ({ 
  message, 
  type = 'info',
  position = 'bottom',
  duration = 2000,
  onHide 
}: ToastProps) => {
  const { theme } = useThemeContext();
  const opacity = new Animated.Value(0);
  const translateY = new Animated.Value(position === 'top' ? -20 : 20);

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(duration),
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: position === 'top' ? -20 : 20,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => onHide());
  }, []);

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return theme.colors.success;
      case 'error':
        return theme.colors.error;
      case 'warning':
        return '#FFA000';
      case 'info':
        return theme.colors.primary;
    }
  };

  return (
    <Animated.View 
      style={[
        styles.container, 
        styles[position],
        { 
          backgroundColor: getBackgroundColor(),
          opacity,
          transform: [{ translateY }],
        }
      ]}
    >
      <MaterialIcons 
        name={getIconName(type)} 
        size={24} 
        color="#FFFFFF"
        style={styles.icon}
      />
      <Text variant="body" color="inverse" style={styles.text}>
        {message}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  top: {
    top: height * 0.1,
  },
  bottom: {
    bottom: height * 0.1,
  },
  icon: {
    marginRight: 12,
  },
  text: {
    flex: 1,
  },
}); 
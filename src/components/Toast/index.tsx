import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Text } from '../Text';
import { useThemeContext } from '../../themes/ThemeProvider';

interface ToastProps {
  message: string;
  onHide: () => void;
  type?: 'success' | 'error' | 'warning';
  duration?: number;
}

export const Toast = ({ 
  message, 
  onHide, 
  type = 'success',
  duration = 3000 
}: ToastProps) => {
  // ... 组件实现
}; 
import React from 'react';
import { Text as RNText, StyleSheet, TextStyle, StyleProp } from 'react-native';
import { useThemeContext } from '../themes/ThemeProvider';
import type { FontWeight } from '../themes/types';

interface TextProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'small';
  color?: 'primary' | 'secondary' | 'disabled' | 'inverse' | 'error';
  style?: StyleProp<TextStyle>;
}

export const Text = ({ 
  children, 
  variant = 'body',
  color = 'primary',
  style,
}: TextProps) => {
  const { theme } = useThemeContext();
  
  const textStyle = StyleSheet.create({
    text: {
      fontSize: theme.typography.sizes[variant],
      fontWeight: theme.typography.weights[variant],
      color: theme.colors.text[color],
    },
  });

  return <RNText style={[textStyle.text, style]}>{children}</RNText>;
}; 
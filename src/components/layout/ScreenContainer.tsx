import React from 'react';
import { View, ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { useResponsive } from '../../utils/responsive';
import { useThemeContext } from '../../themes/ThemeProvider';

interface Props {
  children: React.ReactNode;
  scrollable?: boolean;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
}

export const ScreenContainer = ({ 
  children, 
  scrollable = true,
  style,
  contentContainerStyle,
}: Props) => {
  const { layout } = useResponsive();
  const { styles: themeStyles } = useThemeContext();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeStyles.container.backgroundColor,
    },
    content: {
      padding: layout.padding,
      minHeight: '100%',
    },
  });

  if (scrollable) {
    return (
      <ScrollView 
        style={[styles.container, style]}
        contentContainerStyle={[styles.content, contentContainerStyle]}
      >
        {children}
      </ScrollView>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.content, contentContainerStyle]}>
        {children}
      </View>
    </View>
  );
}; 
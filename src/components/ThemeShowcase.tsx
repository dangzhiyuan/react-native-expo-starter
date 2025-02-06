import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from './Text';
import { useThemeContext } from '../themes/ThemeProvider';
import type { DisplayMode, ColorTheme } from '../themes/types';
import Button from './Button';

export const ThemeShowcase = () => {
  const { 
    styles: themeStyles, 
    theme,
    displayMode,
    colorTheme,
    setDisplayMode,
    setColorTheme,
  } = useThemeContext();

  const displayModeOptions = [
    { label: '跟随系统', value: 'system' as const },
    { label: '浅色模式', value: 'light' as const },
    { label: '深色模式', value: 'dark' as const },
  ];

  const colorThemeOptions = [
    { label: '默认主题', value: 'default' as const },
    { label: '蓝色主题', value: 'blue' as const },
    { label: '橙色主题', value: 'orange' as const },
  ];

  return (
    <View style={[themeStyles.card, themeStyles.shadow, styles.container]}>
      <Text variant="h2" style={styles.title}>主题系统</Text>
      <Text variant="body" color="secondary" style={styles.description}>
        支持多种主题颜色和显示模式，可以通过以下按钮切换：
      </Text>

      <View style={styles.section}>
        <Text variant="h3" style={styles.subtitle}>显示模式</Text>
        <View style={styles.grid}>
          {displayModeOptions.map((option) => (
            <Button
              key={option.value}
              title={option.label}
              variant={displayMode === option.value ? 'primary' : 'outline'}
              style={styles.button}
              onPress={() => setDisplayMode(option.value)}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="h3" style={styles.subtitle}>主题颜色</Text>
        <View style={styles.grid}>
          {colorThemeOptions.map((option) => (
            <Button
              key={option.value}
              title={option.label}
              variant={colorTheme === option.value ? 'primary' : 'outline'}
              style={styles.button}
              onPress={() => setColorTheme(option.value)}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="h3" style={styles.subtitle}>当前主题</Text>
        <View style={styles.themeInfo}>
          <Text variant="body">
            显示模式：{displayModeOptions.find(o => o.value === displayMode)?.label}
          </Text>
          <Text variant="body">
            主题颜色：{colorThemeOptions.find(o => o.value === colorTheme)?.label}
          </Text>
          <Text variant="body">
            实际模式：{theme.isDark ? '深色' : '浅色'}
          </Text>
          <Text variant="body">
            主色调：{theme.colors.primary}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  title: {
    marginBottom: 8,
  },
  description: {
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  subtitle: {
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  button: {
    flex: 1,
    minWidth: '30%',
    marginHorizontal: 8,
    marginVertical: 8,
  },
  themeInfo: {
    gap: 8,
  },
}); 
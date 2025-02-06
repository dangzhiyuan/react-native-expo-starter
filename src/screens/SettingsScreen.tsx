import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { ScreenContainer } from '../components/layout/ScreenContainer';
import { Container } from '../components/layout/Container';
import { Card } from '../components/layout/Card';
import { Column } from '../components/layout/Column';
import { Row } from '../components/layout/Row';
import { Divider } from '../components/layout/Divider';
import { Text } from '../components/Text';
import Button from '../components/Button';
import { useThemeContext } from '../themes/ThemeProvider';
import { DisplayMode, ColorTheme } from '../themes/types';
import { useResponsive } from '../utils/responsive';

export const SettingsScreen = () => {
  const { 
    displayMode, 
    setDisplayMode,
    colorTheme,
    setColorTheme,
  } = useThemeContext();
  const { layout, device } = useResponsive();
  const [isChanging, setIsChanging] = useState(false);

  const handleDisplayModeChange = async (mode: DisplayMode) => {
    try {
      setIsChanging(true);
      await setDisplayMode(mode);
    } catch (error) {
      console.error('Theme change error:', error);
    } finally {
      setIsChanging(false);
    }
  };

  const handleColorThemeChange = async (theme: ColorTheme) => {
    try {
      setIsChanging(true);
      await setColorTheme(theme);
    } catch (error) {
      console.error('Theme change error:', error);
    } finally {
      setIsChanging(false);
    }
  };

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
    <ScreenContainer>
      <Container maxWidth={device === 'phone' ? '100%' : 600}>
        <Column spacing={layout.gutter}>
          <Card variant="elevated">
            <Text variant="h2">显示模式</Text>
            <Column spacing={layout.gutter / 2}>
              {displayModeOptions.map(option => (
                <Button
                  key={option.value}
                  title={option.label}
                  variant={displayMode === option.value ? 'primary' : 'outline'}
                  loading={isChanging}
                  onPress={() => handleDisplayModeChange(option.value)}
                />
              ))}
            </Column>
          </Card>

          <Card variant="elevated">
            <Text variant="h2">主题颜色</Text>
            <Column spacing={layout.gutter / 2}>
              {colorThemeOptions.map(option => (
                <Button
                  key={option.value}
                  title={option.label}
                  variant={colorTheme === option.value ? 'primary' : 'outline'}
                  loading={isChanging}
                  onPress={() => handleColorThemeChange(option.value)}
                />
              ))}
            </Column>
          </Card>

          <Card variant="elevated">
            <Text variant="h2">关于</Text>
            <Column spacing={layout.gutter / 2}>
              <Text variant="body">版本: 1.0.0</Text>
              <Text variant="small" color="secondary">
                React Native 主题化启动模板
              </Text>
            </Column>
          </Card>
        </Column>
      </Container>
    </ScreenContainer>
  );
}; 
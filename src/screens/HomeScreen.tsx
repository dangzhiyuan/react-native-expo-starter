import React from 'react';
import { StyleSheet, DimensionValue, View } from 'react-native';
import { Text } from '../components/Text';
import Button from '../components/Button';
import { useThemeContext } from '../themes/ThemeProvider';
import { useNavigation } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import type { RootDrawerParamList } from '../navigation/types';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { ScreenContainer } from '../components/layout/ScreenContainer';
import { Grid } from '../components/layout/Grid';
import { useResponsive } from '../utils/responsive';

type HomeScreenNavigationProp = DrawerNavigationProp<RootDrawerParamList, 'Home'>;

export const HomeScreen = () => {
  const { styles: themeStyles } = useThemeContext();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { isConnected } = useNetworkStatus();
  const { device, layout } = useResponsive();

  if (!isConnected) {
    return (
      <ScreenContainer scrollable={false}>
        <Text>网络连接已断开，请检查网络设置</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <Grid columns={device === 'phone' ? 1 : 2}>
        <View style={[themeStyles.card, themeStyles.shadow]}>
          <Text variant="h1">主题化启动模板</Text>
          <Text variant="body" style={{ marginVertical: layout.gutter }}>
            这是一个功能完整的 React Native 启动模板，包含响应式布局、主题切换、国际化等特性。
          </Text>
          
          <Text variant="h3" style={{ marginTop: layout.gutter }}>主要功能</Text>
          <Text variant="body" color="secondary" style={{ marginVertical: layout.gutter / 2 }}>
            • 支持三种预设主题{'\n'}
            • 响应式布局{'\n'}
            • 主题持久化{'\n'}
            • 完整的组件库
          </Text>

          <Button
            title="查看组件示例"
            variant="primary"
            style={{ marginTop: layout.gutter }}
            onPress={() => navigation.navigate('Components')}
          />
        </View>

        <View style={[themeStyles.card, themeStyles.shadow]}>
          <Text variant="h2">快速开始</Text>
          <Text variant="body" style={{ marginVertical: layout.gutter / 2 }}>
            点击左上角菜单图标，可以：
          </Text>
          <Text variant="body" color="secondary">
            • 浏览组件示例{'\n'}
            • 切换应用主题{'\n'}
            • 查看更多设置
          </Text>
        </View>
      </Grid>
    </ScreenContainer>
  );
}; 
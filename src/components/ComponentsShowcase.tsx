import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from './Text';
import { useThemeContext } from '../themes/ThemeProvider';
import Button from './Button';
import { useResponsive } from '../utils/responsive';
import { Column } from '../components/layout/Column';

export const ComponentsShowcase = () => {
  const { layout } = useResponsive();
  const { styles: themeStyles } = useThemeContext();

  return (
    <Column spacing={layout.gutter}>
      <Text variant="h2">组件样式</Text>
      <Text variant="body" color="secondary">
        展示各种组件的样式和状态：
      </Text>

      <Column spacing={layout.gutter / 2}>
        <Text variant="h3">按钮样式</Text>
        <Button
          title="主要按钮"
          variant="primary"
        />
        <Button
          title="次要按钮"
          variant="secondary"
        />
        <Button
          title="边框按钮"
          variant="outline"
        />
        <Button
          title="加载中按钮"
          loading={true}
        />
        <Button
          title="禁用按钮"
          disabled={true}
        />
      </Column>

      <Column spacing={layout.gutter / 2}>
        <Text variant="h3">文字样式</Text>
        <Text variant="h1">标题1</Text>
        <Text variant="h2">标题2</Text>
        <Text variant="h3">标题3</Text>
        <Text variant="body">正文文本</Text>
        <Text variant="small">小号文本</Text>
        <Text variant="body" color="secondary">次要文本</Text>
        <Text variant="body" color="disabled">禁用文本</Text>
      </Column>

      <View style={styles.section}>
        <Text variant="h3" style={styles.subtitle}>卡片样式</Text>
        <View style={[themeStyles.card, themeStyles.shadow]}>
          <Text variant="h3">卡片标题</Text>
          <Text variant="body" style={{ marginTop: 8 }}>
            这是一个带有阴影的卡片示例。它使用了主题中定义的样式。
          </Text>
        </View>
      </View>
    </Column>
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
  button: {
    marginVertical: 8,
  },
}); 
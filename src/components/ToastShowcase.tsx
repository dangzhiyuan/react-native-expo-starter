import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from './Text';
import { useToast } from './Toast/ToastContext';
import { useThemeContext } from '../themes/ThemeProvider';
import Button from './Button';

export const ToastShowcase = () => {
  const { showToast } = useToast();
  const { styles: themeStyles } = useThemeContext();

  const toastExamples = [
    {
      title: '成功提示',
      message: '操作成功完成！',
      buttonText: '显示成功',
      type: 'success' as const,
      position: 'bottom' as const,
    },
    {
      title: '错误提示',
      message: '操作失败，请重试',
      buttonText: '显示错误',
      type: 'error' as const,
      position: 'top' as const,
    },
    {
      title: '警告提示',
      message: '请注意，这是一条警告信息',
      buttonText: '显示警告',
      type: 'warning' as const,
      position: 'bottom' as const,
    },
    {
      title: '信息提示',
      message: '这是一条普通的信息提示',
      buttonText: '显示信息',
      type: 'info' as const,
      position: 'top' as const,
    },
    {
      title: '长时间提示',
      message: '这条提示会显示较长时间',
      buttonText: '显示长提示',
      type: 'info' as const,
      position: 'bottom' as const,
      duration: 5000,
    },
  ];

  return (
    <View style={[themeStyles.card, themeStyles.shadow, styles.container]}>
      <Text variant="h2" style={styles.title}>Toast 提示</Text>
      <Text variant="body" color="secondary" style={styles.description}>
        Toast 提供了多种类型的提示信息，支持顶部和底部显示，可自定义显示时长。
      </Text>

      <View style={styles.grid}>
        {toastExamples.map((example, index) => (
          <View key={index} style={styles.gridItem}>
            <Text variant="body" style={styles.exampleTitle}>
              {example.title}
            </Text>
            <Button
              title={example.buttonText}
              variant="outline"
              style={styles.button}
              onPress={() => showToast(example.message, {
                type: example.type,
                position: example.position,
                duration: example.duration,
              })}
            />
          </View>
        ))}
      </View>

      <View style={styles.divider} />

      <Text variant="h3" style={styles.subtitle}>使用说明</Text>
      <Text variant="small" color="secondary">
        • success：用于操作成功的提示{'\n'}
        • error：用于操作失败或错误提示{'\n'}
        • warning：用于警告信息提示{'\n'}
        • info：用于一般信息提示{'\n'}
        • 可选择顶部或底部显示{'\n'}
        • 可自定义显示时长
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    margin: 16,
  },
  title: {
    marginBottom: 8,
  },
  description: {
    marginBottom: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  gridItem: {
    width: '50%',
    padding: 8,
  },
  exampleTitle: {
    marginBottom: 8,
  },
  button: {
    minWidth: '100%',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 24,
  },
  subtitle: {
    marginBottom: 16,
  },
}); 
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "../Text/Text";
import Button from "../Button";
import { useTheme } from "../../themes/ThemeProvider";
import { useResponsive } from "../../utils/responsive";

// 一个会抛出错误的组件
const BuggyCounter = () => {
  const [count, setCount] = useState(0);

  if (count === 5) {
    // 故意抛出错误
    throw new Error("模拟的错误：计数达到5时崩溃！");
  }

  return (
    <Button
      title={`点击增加计数: ${count}`}
      onPress={() => setCount((c) => c + 1)}
    />
  );
};

export const ErrorBoundaryShowcase = () => {
  const { theme } = useTheme();
  const { layout } = useResponsive();

  const styles = StyleSheet.create({
    container: {
      padding: layout.padding,
    },
    section: {
      marginBottom: layout.gutter * 2,
    },
    description: {
      marginBottom: layout.gutter,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text variant="h2" style={styles.description}>
          错误边界测试
        </Text>
        <Text variant="body" color="secondary" style={styles.description}>
          点击按钮增加计数，当计数达到5时会触发错误
        </Text>
        <BuggyCounter />
      </View>
    </View>
  );
};

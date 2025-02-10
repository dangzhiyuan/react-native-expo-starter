import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "../Text/Text";
import { useTheme } from "../../themes/ThemeProvider";
import { useResponsive } from "../../utils/responsive";
import Button from "../Button/Button";
import { errorService } from "@/services/error";
import { errorReporting } from "@/services/errorReporting";

// 一个会抛出错误的组件
const BuggyCounter = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount((c) => {
      const newCount = c + 1;
      if (newCount === 5) {
        // 创建错误对象
        const error = new Error("模拟的错误：计数达到5时崩溃！");

        // 1. 使用 errorService 显示错误提示
        errorService.handleError(error, {
          shouldShowToast: true,
        });

        // 2. 使用 errorReporting 上报错误
        errorReporting.reportError(error, {
          component: "BuggyCounter",
          action: "increment",
          count: newCount,
        });

        // 3. 抛出错误，让 ErrorBoundary 捕获
        throw error;
      }
      return newCount;
    });
  };

  return <Button title={`点击增加计数: ${count}`} onPress={handleIncrement} />;
};

// 另一个错误示例：异步错误
const AsyncErrorDemo = () => {
  const handleAsyncError = async () => {
    try {
      // 模拟异步操作
      await new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error("模拟的异步操作错误"));
        }, 1000);
      });
    } catch (error) {
      if (error instanceof Error) {
        // 1. 使用 errorService 显示错误提示
        errorService.handleError(error, {
          shouldShowToast: true,
        });

        // 2. 使用 errorReporting 上报错误
        errorReporting.reportError(error, {
          component: "AsyncErrorDemo",
          action: "asyncOperation",
          type: "async_error",
        });
      }
    }
  };

  return (
    <Button
      title="触发异步错误"
      onPress={handleAsyncError}
      style={{ marginTop: 16 }}
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
          点击按钮增加计数，当计数达到5时会触发错误边界
        </Text>
        <BuggyCounter />
      </View>

      <View style={styles.section}>
        <Text variant="h2" style={styles.description}>
          异步错误测试
        </Text>
        <Text variant="body" color="secondary" style={styles.description}>
          点击按钮触发异步错误（不会触发错误边界）
        </Text>
        <AsyncErrorDemo />
      </View>
    </View>
  );
};

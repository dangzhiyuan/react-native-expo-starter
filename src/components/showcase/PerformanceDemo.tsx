import React, { useState, useCallback, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import Button from "../Button/Button";
import { Text } from "../Text/Text";
import { useResponsive } from "@/utils";

// 使用 React.memo 优化子组件
const ExpensiveComponent = React.memo(({ value }: { value: number }) => {
  // 模拟耗时计算
  const calculateExpensiveValue = (num: number) => {
    const startTime = performance.now();
    // 模拟耗时操作
    for (let i = 0; i < 1000000; i++) {
      Math.random();
    }
    const endTime = performance.now();
    console.log(`Calculation took ${endTime - startTime}ms`);
    return num * 2;
  };

  const result = calculateExpensiveValue(value);

  return (
    <View style={styles.expensiveComponent}>
      <Text>耗时计算结果: {result}</Text>
    </View>
  );
});

export const PerformanceDemo = () => {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);
  const { layout } = useResponsive();

  // 使用 useCallback 优化函数引用
  const handleIncrement = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  // 使用 useMemo 优化计算结果
  const expensiveCalculation = useMemo(() => {
    console.log("Calculating...");
    return count * 2;
  }, [count]);

  // 不必要的重渲染示例
  const handleOtherStateChange = () => {
    setOtherState((prev) => prev + 1);
  };

  console.log("PerformanceDemo rendered");

  return (
    <View style={[styles.container, { padding: layout.padding }]}>
      <Text variant="h2" style={styles.title}>
        性能优化演示
      </Text>

      {/* 展示 React.memo 效果 */}
      <View style={styles.section}>
        <Text variant="h3">React.memo 示例</Text>
        <ExpensiveComponent value={count} />
        <Button
          title="增加计数"
          onPress={handleIncrement}
          style={styles.button}
        />
      </View>

      {/* 展示不必要的重渲染 */}
      <View style={styles.section}>
        <Text variant="h3">重渲染示例</Text>
        <Text>其他状态: {otherState}</Text>
        <Button
          title="更新其他状态"
          onPress={handleOtherStateChange}
          style={styles.button}
        />
      </View>

      {/* 展示 useMemo 效果 */}
      <View style={styles.section}>
        <Text variant="h3">useMemo 示例</Text>
        <Text>计算结果: {expensiveCalculation}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  expensiveComponent: {
    padding: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginVertical: 8,
  },
  button: {
    marginTop: 8,
  },
});

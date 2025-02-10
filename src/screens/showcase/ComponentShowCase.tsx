import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "@/components/Text/Text";
import { ErrorHandlingDemo } from "@/components/showcase/ErrorHandlingDemo";
import { PerformanceDemo } from "@/components/showcase/PerformanceDemo";

export const OtherShowCase = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text variant="h2" style={styles.sectionTitle}>
          错误处理演示
        </Text>
        <ErrorHandlingDemo />
      </View>

      <View style={styles.section}>
        <Text variant="h2" style={styles.sectionTitle}>
          性能优化演示
        </Text>
        <PerformanceDemo />
      </View>

      {/* 其他组件展示... */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    padding: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
});

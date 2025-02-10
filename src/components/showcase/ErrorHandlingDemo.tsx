import React from "react";
import { View, StyleSheet } from "react-native";
import Button from "../Button/Button";
import { errorService } from "@/services/error";
import { errorReporting } from "@/services/errorReporting";

export const ErrorHandlingDemo = () => {
  // 模拟一个API错误
  const handleApiError = () => {
    try {
      throw new Error("Failed to fetch data from API");
    } catch (error) {
      if (error instanceof Error) {
        // 使用errorService显示友好提示
        errorService.handleError(error, {
          shouldShowToast: true,
        });
      }
    }
  };

  // 模拟一个需要上报的严重错误
  const handleCriticalError = () => {
    try {
      throw new Error("Critical system error occurred");
    } catch (error) {
      if (error instanceof Error) {
        // 使用errorReporting上报错误
        errorReporting.reportError(error, {
          severity: "high",
          component: "ErrorHandlingDemo",
        });
        // 同时显示提示
        errorService.handleError(error);
      }
    }
  };

  // 模拟一个表单验证错误
  const handleValidationError = () => {
    const error = new Error("Please enter a valid email address");
    errorService.handleError(error, {
      shouldShowToast: true,
      shouldReport: false, // 表单验证错误不需要上报
    });
  };

  return (
    <View style={styles.container}>
      <Button
        title="触发API错误"
        onPress={handleApiError}
        style={styles.button}
      />
      <Button
        title="触发严重错误"
        onPress={handleCriticalError}
        style={styles.button}
      />
      <Button
        title="触发表单错误"
        onPress={handleValidationError}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  button: {
    marginBottom: 16,
  },
});

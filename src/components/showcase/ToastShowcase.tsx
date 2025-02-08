import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "../../themes/ThemeProvider";
import { Text } from "../Text";
import Button from "../Button";
import { useToast } from "../Toast/ToastContext";
import { useResponsive } from "../../utils/responsive";

export const ToastShowcase = () => {
  const { theme } = useTheme();
  const { layout } = useResponsive();
  const { showToast } = useToast();

  const styles = StyleSheet.create({
    container: {
      padding: layout.padding,
    },
    section: {
      marginBottom: layout.gutter * 2,
    },
    buttonContainer: {
      gap: layout.gutter,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text variant="h2" style={{ marginBottom: layout.gutter }}>
          Toast 提示
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            title="成功提示"
            onPress={() =>
              showToast("操作成功！", { type: "success", position: "top" })
            }
          />
          <Button
            title="错误提示"
            onPress={() =>
              showToast("出现错误！", { type: "error", position: "top" })
            }
          />
          <Button
            title="警告提示"
            onPress={() =>
              showToast("请注意！", { type: "warning", position: "bottom" })
            }
          />
          <Button
            title="信息提示"
            onPress={() =>
              showToast("这是一条信息", { type: "info", position: "bottom" })
            }
          />
        </View>
      </View>
    </View>
  );
};

import React, { useState, useCallback } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text } from "./Text";
import { TextInput } from "./TextInput";
import Button from "./Button";
import { useTheme } from "../themes/ThemeProvider";
import { useResponsive } from "../utils/responsive";
import { MaterialIcons } from "@expo/vector-icons";
import { List, ListItem } from "./List";
import type { ColorScheme } from "../themes/types";

export const ComponentsShowcase = () => {
  const { theme, setThemeMode, setColorScheme } = useTheme();
  const { layout } = useResponsive();
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  const handleSave = useCallback(() => {
    setIsLoading((prev) => !prev);
  }, []);

  const handleThemeChange = useCallback(
    async (scheme: ColorScheme) => {
      setIsChanging(true);
      try {
        await setColorScheme(scheme);
      } finally {
        setIsChanging(false);
      }
    },
    [setColorScheme]
  );

  const handleModeChange = useCallback(
    async (isDark: boolean) => {
      setIsChanging(true);
      try {
        await setThemeMode(isDark ? "dark" : "light");
      } finally {
        setIsChanging(false);
      }
    },
    [setThemeMode]
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: layout.padding,
    },
    section: {
      marginBottom: layout.gutter * 2,
    },
    card: {
      padding: layout.gutter,
      borderRadius: 8,
      backgroundColor: theme.surface,
      shadowColor: theme.text.primary,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    buttonContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: layout.gutter,
      marginTop: layout.gutter,
    },
    button: {
      flex: 1,
      minWidth: "30%",
    },
  });

  const colorThemeOptions: Array<{ label: string; value: ColorScheme }> = [
    { label: "默认主题", value: "default" },
    { label: "蓝色主题", value: "blue" },
    { label: "橙色主题", value: "orange" },
    { label: "灰色主题", value: "gray" },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text variant="h2" style={{ marginBottom: layout.gutter }}>
          文字排版
        </Text>
        <View style={styles.card}>
          <Text variant="h1">一级标题</Text>
          <Text variant="h2">二级标题</Text>
          <Text variant="h3">三级标题</Text>
          <Text variant="body">正文文本</Text>
          <Text variant="small">小号文本</Text>
          <Text variant="body" color="secondary">
            次要文本
          </Text>
          <Text variant="body" color="disabled">
            禁用文本
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="h2" style={{ marginBottom: layout.gutter }}>
          输入框
        </Text>
        <View style={styles.card}>
          <TextInput
            label="基础输入框"
            placeholder="请输入内容"
            value={text}
            onChangeText={setText}
          />
          <TextInput
            label="带图标的输入框"
            placeholder="请输入内容"
            leftIcon="search"
            rightIcon="clear"
            onRightIconPress={() => setText("")}
            value={text}
            onChangeText={setText}
          />
          <TextInput
            label="错误状态"
            placeholder="请输入内容"
            value={text}
            onChangeText={setText}
            error="这是一条错误提示"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="h2" style={{ marginBottom: layout.gutter }}>
          按钮
        </Text>
        <View style={styles.card}>
          <View style={styles.buttonContainer}>
            <Button
              title="主要按钮"
              variant="primary"
              style={styles.button}
              onPress={() => handleModeChange(!theme.isDark)}
            />
            <Button
              title="次要按钮"
              variant="secondary"
              style={styles.button}
              onPress={() => handleThemeChange("blue")}
            />
            <Button title="文本按钮" variant="text" style={styles.button} />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="带图标的按钮"
              leftIcon="add"
              variant="primary"
              style={styles.button}
            />
            <Button
              title="禁用状态"
              variant="primary"
              disabled
              style={styles.button}
            />
            <Button
              title="保存中..."
              loading={true}
              variant="primary"
              style={styles.button}
            />
            <Button
              key={`save-button-${theme.colorScheme}-${theme.isDark}`}
              title={isLoading ? "保存中..." : "保存"}
              loading={isLoading}
              variant="primary"
              style={styles.button}
              onPress={handleSave}
            />
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="h2" style={{ marginBottom: layout.gutter }}>
          列表
        </Text>
        <List>
          <ListItem title="基础列表项" />
          <ListItem
            title="带图标的列表项"
            subtitle="这是一条说明文本"
            leftIcon="folder"
          />
          <ListItem
            title="自定义右侧图标"
            subtitle="点击查看详情"
            rightIcon="arrow-forward"
          />
          <ListItem
            title="最后一项"
            subtitle="没有分割线"
            showDivider={false}
          />
        </List>
      </View>
    </ScrollView>
  );
};

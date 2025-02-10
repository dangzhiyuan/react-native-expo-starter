import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Text } from "./Text/Text";
import { TextInput } from "./TextInput";
import { useTheme } from "../themes/ThemeProvider";
import { useResponsive } from "../utils/responsive";
import { MaterialIcons } from "@expo/vector-icons";
import { List, ListItem } from "./List";
import type { ColorScheme } from "../themes/types";
import Button from "./Button/Button";
import { Modal, ModalContent, ModalFooter } from "./Modal";
import { Tag } from "./Tag/Tag";
import { Progress } from "./Progress/Progress";
import { Switch } from "./Switch/Switch";
import { Checkbox } from "./Checkbox/Checkbox";
import { Radio } from "./Radio/Radio";
import { Skeleton, SkeletonGroup } from "./Skeleton/Skeleton";
import { Collapse } from "./Collapse/Collapse";
import { SwipeAction } from "./SwipeAction/SwipeAction";
import { Rating } from "./Rating/Rating";
import { ColorPicker } from "./ColorPicker/ColorPicker";
import { Calendar } from "./Calendar/Calendar";
import { ImageViewer } from "./ImageViewer/ImageViewer";
import { VictoryLineChart } from "./Chart/VictoryLineChart";
import { Card } from "./layout/Card";

export const ComponentsShowcase = () => {
  const { theme, setThemeMode, setColorScheme } = useTheme();
  const { layout } = useResponsive();
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [switchValue, setSwitchValue] = useState(false);
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [radioValue, setRadioValue] = useState("option1");
  const [progress, setProgress] = useState(30);
  const [rating, setRating] = useState(3);
  const [selectedColor, setSelectedColor] = useState("#2196f3");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [imageViewerVisible, setImageViewerVisible] = useState(false);

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
    row: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 8,
    },
  });

  const colorThemeOptions: Array<{ label: string; value: ColorScheme }> = [
    { label: "默认主题", value: "default" },
    { label: "蓝色主题", value: "blue" },
    { label: "橙色主题", value: "orange" },
    { label: "灰色主题", value: "gray" },
  ];

  const chartData = [
    { x: 1, y: 2 },
    { x: 2, y: 3 },
    { x: 3, y: 5 },
    { x: 4, y: 4 },
    { x: 5, y: 7 },
  ];

  const images = [
    {
      uri: "https://picsum.photos/1000/1000",
    },
    {
      uri: "https://picsum.photos/1000/1001",
    },
    {
      uri: "https://picsum.photos/1000/1002",
    },
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

      <View style={styles.section}>
        <Text variant="h2" style={{ marginBottom: layout.gutter }}>
          标签
        </Text>
        <View style={styles.card}>
          <View style={styles.buttonContainer}>
            <Tag label="默认标签" />
            <Tag label="主要标签" color={theme.primary} />
            <Tag label="描边标签" variant="outline" />
            <Tag label="可关闭" onClose={() => {}} />
            <Tag label="可点击" onPress={() => {}} />
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="h2" style={{ marginBottom: layout.gutter }}>
          进度条
        </Text>
        <View style={styles.card}>
          <Progress progress={progress} showInfo />
          <View style={{ height: layout.gutter }} />
          <Progress progress={60} color={theme.success} />
          <View style={{ height: layout.gutter }} />
          <Progress progress={80} height={8} color={theme.warning} />
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="h2" style={{ marginBottom: layout.gutter }}>
          折叠面板
        </Text>
        <Collapse title="基本信息">
          <Text>这是折叠面板的内容</Text>
          <Text>可以放置任意内容</Text>
        </Collapse>
        <Collapse title="更多信息">
          <Text>另一个折叠面板的内容</Text>
        </Collapse>
      </View>

      <View style={styles.section}>
        <Text variant="h2" style={{ marginBottom: layout.gutter }}>
          滑动操作
        </Text>
        <SwipeAction
          leftActions={
            <View
              style={{ flex: 1, backgroundColor: theme.primary, padding: 16 }}
            >
              <Text color="inverse">收藏</Text>
            </View>
          }
          rightActions={
            <View
              style={{ flex: 1, backgroundColor: theme.error, padding: 16 }}
            >
              <Text color="inverse">删除</Text>
            </View>
          }
        >
          <View style={[styles.card, { marginBottom: 0 }]}>
            <Text>左右滑动查看操作按钮</Text>
          </View>
        </SwipeAction>
      </View>

      <View style={styles.section}>
        <Text variant="h2" style={{ marginBottom: layout.gutter }}>
          开关和复选框
        </Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text>开关：</Text>
            <Switch value={switchValue} onValueChange={setSwitchValue} />
          </View>
          <View style={styles.row}>
            <Checkbox
              checked={checkboxValue}
              onValueChange={setCheckboxValue}
              label="复选框"
            />
          </View>
          <View style={styles.row}>
            <Radio
              selected={radioValue === "option1"}
              onSelect={() => setRadioValue("option1")}
              label="选项一"
            />
          </View>
          <View style={styles.row}>
            <Radio
              selected={radioValue === "option2"}
              onSelect={() => setRadioValue("option2")}
              label="选项二"
            />
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="h2" style={{ marginBottom: layout.gutter }}>
          骨架屏
        </Text>
        <View style={styles.card}>
          <SkeletonGroup.Avatar size={48} />
          <View style={{ height: layout.gutter }} />
          <SkeletonGroup.Text lines={3} />
          <View style={{ height: layout.gutter }} />
          <SkeletonGroup.Card height={120} />
        </View>
        <Button
          title="打开模态框"
          onPress={() => setModalVisible(true)}
          style={{ marginVertical: layout.gutter }}
        />
      </View>

      <View style={styles.section}>
        <Text variant="h2" style={{ marginBottom: layout.gutter }}>
          评分
        </Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text>可交互评分：</Text>
            <Rating value={rating} onChange={setRating} />
          </View>
          <View style={styles.row}>
            <Text>禁用状态：</Text>
            <Rating value={4} disabled size={32} color={theme.warning} />
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="h2" style={{ marginBottom: layout.gutter }}>
          颜色选择器
        </Text>
        <View style={styles.card}>
          <Text style={{ marginBottom: layout.gutter }}>
            已选颜色：{selectedColor}
          </Text>
          <ColorPicker value={selectedColor} onChange={setSelectedColor} />
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="h2" style={{ marginBottom: layout.gutter }}>
          日历
        </Text>
        <Calendar
          value={selectedDate}
          onChange={setSelectedDate}
          minDate={new Date(2023, 0, 1)}
          maxDate={new Date(2024, 11, 31)}
        />
        <Text style={{ marginTop: layout.gutter, textAlign: "center" }}>
          已选日期：{selectedDate.toLocaleDateString()}
        </Text>
      </View>

      <View style={styles.section}>
        <Text variant="h2" style={{ marginBottom: layout.gutter }}>
          图表
        </Text>
        {/* <Card
          style={{
            paddingHorizontal: layout.padding / 2,
            paddingVertical: layout.padding / 2,
            overflow: "hidden",
          }}
        > */}
        <VictoryLineChart
          data={chartData}
          xAxis={{
            label: "时间",
            tickFormat: (t) => `${t}月`,
          }}
          yAxis={{
            label: "数值",
            tickFormat: (t) => `${t}k`,
          }}
        />
        {/* </Card> */}
      </View>

      <View style={styles.section}>
        <Text variant="h2" style={{ marginBottom: layout.gutter }}>
          图片预览
        </Text>
        <View style={[styles.card, { zIndex: 1 }]}>
          <ImageViewer
            images={images}
            visible={imageViewerVisible}
            onClose={() => setImageViewerVisible(false)}
          />
        </View>
      </View>

      <Modal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="模态框示例"
      >
        <ModalContent>
          <Text>这是一个模态框示例，展示了模态框的基本用法。</Text>
          <Text style={{ marginTop: layout.gutter }}>
            模态框支持自定义内容、标题、关闭按钮等功能。
          </Text>
        </ModalContent>
        <ModalFooter>
          <Button
            title="取消"
            variant="outline"
            onPress={() => setModalVisible(false)}
          />
          <Button
            title="确定"
            variant="primary"
            onPress={() => setModalVisible(false)}
          />
        </ModalFooter>
      </Modal>
    </ScrollView>
  );
};

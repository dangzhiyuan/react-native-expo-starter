import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "../components/Text/Text";
import { useTheme } from "../themes/ThemeProvider";
import { useNavigation } from "@react-navigation/native";
import type { DrawerNavigationProp } from "@react-navigation/drawer";
import type { DrawerParamList } from "../navigation/types";
import { ScreenContainer } from "../components/layout/ScreenContainer";
import { useResponsive } from "../utils/responsive";
import { useNetwork } from "../contexts/NetworkProvider";
import { Container } from "../components/layout/Container";
import { Card } from "../components/layout/Card";
import { PullToRefresh } from "../components/PullToRefresh";
import { DoubleTapLike } from "../components/DoubleTapLike";
import { SwipeableRow } from "../components/SwipeableRow";
import { useTranslation } from "react-i18next";
import Button from "../components/Button/Button";

type HomeScreenNavigationProp = DrawerNavigationProp<DrawerParamList, "Home">;

export const HomeScreen = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { isConnected, connectionType, withNetworkCheck } = useNetwork();
  const { device, layout } = useResponsive();

  const handleRefresh = async () => {
    try {
      await withNetworkCheck(
        async () => {
          // 刷新逻辑
        },
        { useFallback: true }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDoubleTap = () => {
    // 处理双击
  };

  const handleImportantAction = async () => {
    await withNetworkCheck(async () => {
      // 重要操作逻辑
    });
  };

  const styles = StyleSheet.create({
    container: {
      padding: layout.padding,
    },
    section: {
      marginBottom: layout.gutter * 2,
    },
    networkStatus: {
      padding: layout.padding,
      borderRadius: 8,
      backgroundColor: isConnected ? theme.success : theme.error,
      marginBottom: layout.gutter,
    },
    networkText: {
      color: theme.text.inverse,
    },
  });

  return (
    <ScreenContainer>
      <Container>
        <View style={styles.container}>
          <DoubleTapLike onDoubleTap={handleDoubleTap}>
            <Card variant="elevated" style={styles.section}>
              <Text variant="h2" style={{ marginBottom: layout.gutter }}>
                {t("home.welcome")}
              </Text>
              <Text variant="body" color="secondary">
                {t("home.introduce")}
              </Text>
            </Card>
          </DoubleTapLike>
          {/* 
            <SwipeableRow
              leftActions={<Button title="收藏" variant="primary" />}
              rightActions={<Button title="删除" variant="error" />}
            > */}
          <Card variant="elevated" style={styles.section}>
            <Text variant="h2" style={{ marginBottom: layout.gutter }}>
              {t("home.network")}
            </Text>
            <View style={styles.networkStatus}>
              <Text variant="body" style={styles.networkText}>
                {isConnected ? "网络已连接" : "网络已断开"}
              </Text>
              {isConnected && (
                <Text variant="small" style={styles.networkText}>
                  连接类型: {connectionType}
                </Text>
              )}
            </View>
            <Button
              title="刷新"
              onPress={handleRefresh}
              disabled={!isConnected}
              leftIcon="refresh"
            />
          </Card>
          {/* </SwipeableRow> */}

          <Card variant="elevated" style={styles.section}>
            <Text variant="h1">主题化启动模板</Text>
            <Text variant="body" style={{ marginVertical: layout.gutter }}>
              这是一个功能完整的 React Native
              启动模板，包含响应式布局、主题切换、国际化等特性。
            </Text>

            <Text variant="h3" style={{ marginTop: layout.gutter }}>
              主要功能
            </Text>
            <Text
              variant="body"
              color="secondary"
              style={{ marginVertical: layout.gutter / 2 }}
            >
              • 支持三种预设主题{"\n"}• 响应式布局{"\n"}• 主题持久化{"\n"}•
              完整的组件库
            </Text>

            <Button
              title="查看组件示例"
              variant="primary"
              style={{ marginTop: layout.gutter }}
              onPress={() => navigation.navigate("Components")}
            />
          </Card>

          <Card variant="elevated" style={styles.section}>
            <Text variant="h2" style={{ marginBottom: layout.gutter }}>
              特性
            </Text>
            <Text variant="body" color="secondary">
              • 主题系统{"\n"}• 响应式布局{"\n"}• 错误处理{"\n"}• 网络状态检测
              {"\n"}• 组件库
            </Text>
          </Card>
        </View>
      </Container>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 8,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

/***
 * @file 响应式背景组件
 * @author 党知源
 */
import React from "react";
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
  Dimensions,
  SafeAreaView,
  ImageSourcePropType,
} from "react-native";
import { isTablet, spacing } from "../../utils/responsive";

interface BackgroundProps {
  children: React.ReactNode;
  source: ImageSourcePropType;
}

export default function Background({ children, source }: BackgroundProps) {
  const { width } = Dimensions.get("window");

  return (
    <ImageBackground
      source={source}
      resizeMode="cover"
      style={[styles.background, { width }]}
    >
      {/* 安全区域视图，解决全面屏手机设备高度不全问题 */}
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          {children}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "transparent",
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: spacing.md,
    paddingHorizontal: isTablet ? spacing.xl : spacing.md,
  },
});

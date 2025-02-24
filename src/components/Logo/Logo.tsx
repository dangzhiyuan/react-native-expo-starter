import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";

const { width, height } = Dimensions.get("window");

interface LogoProps {
  top?: string | number;
  left?: string | number;
}

export default function Logo({ top = "15%", left = "15%" }: LogoProps) {
  const getPixelValue = (value: string | number, isTop: boolean) => {
    if (typeof value === "number") return value; // 如果已经是数字，直接返回
    if (typeof value === "string" && value.endsWith("%")) {
      const percent = parseFloat(value); // 提取百分比数值（如 "15%" -> 15）
      return (percent / 100) * (isTop ? height : width); // 根据 isTop 决定使用 height 还是 width
    }
    return 0; // 默认返回 0
  };

  return (
    <View
      style={[
        styles.container,
        // {
        //   top: getPixelValue(top, true),
        //   left: getPixelValue(left, false),
        // },
      ]}
    >
      <Image
        source={require("../../../assets/logo3.png")}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute", // 使用绝对定位
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  image: {
    width: width * 0.3,
    height: undefined, // 让图片根据宽度自动计算高度
    resizeMode: "contain",
  },
});

import React, { useEffect, useCallback, useState } from "react";
import { BackHandler } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { HomeStackParamList } from "@/navigation/types";
import { flashShow } from "@/components/FlashMessage";

type NavigationProp = NativeStackNavigationProp<HomeStackParamList>;

export const BackHandlerComponent = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const [lastPress, setLastPress] = useState(0);

  const handleBackPress = useCallback(() => {
    const routeName = route.name;

    // 在 CreateTrain 页面使用单击返回
    if (routeName === "CreateTrain") {
      navigation.goBack();
      return true;
    }

    // 在 Home 页面使用双击退出
    if (routeName === "Home") {
      const currentTime = new Date().getTime();
      const DOUBLE_PRESS_DELAY = 2000;

      if (currentTime - lastPress < DOUBLE_PRESS_DELAY) {
        BackHandler.exitApp();
        return true;
      }

      setLastPress(currentTime);
      flashShow({
        message: "再按一次退出应用",
        type: "info",
      });
      return true;
    }

    // 其他页面使用默认的返回行为
    return false;
  }, [navigation, route.name, lastPress]);

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );

    return () => subscription.remove();
  }, [handleBackPress]);

  return null;
};

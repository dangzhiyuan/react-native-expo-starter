import { BackHandler } from "react-native";
import { flashShow } from "@/components/FlashMessage";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { HomeStackParamList } from "@/navigation/types";
import { useRef } from "react";

type Navigation = NativeStackNavigationProp<HomeStackParamList>;

export const useBackHandler = (navigation: Navigation, route: any) => {
  const lastPressRef = useRef(0); // 使用 useRef 来保持状态

  const handleBackPress = () => {
    const routeName = route.name;
    console.log("Current route:", routeName);

    // 在 CreateTrain 页面使用单击返回
    if (routeName === "CreateTrain") {
      navigation.goBack();
      return true;
    }

    // 在 Home 页面使用双击退出
    if (routeName === "Home") {
      const currentTime = new Date().getTime();
      const DOUBLE_PRESS_DELAY = 2000;

      if (currentTime - lastPressRef.current < DOUBLE_PRESS_DELAY) {
        BackHandler.exitApp();
        return true;
      }

      lastPressRef.current = currentTime;
      flashShow({
        message: "再按一次退出应用",
        type: "info",
      });
      return true;
    }

    // 其他页面使用默认的返回行为
    return false;
  };

  return handleBackPress;
};

import { useEffect, useRef } from "react";
import { BackHandler } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { flashShow } from "@/components/FlashMessage";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { HomeStackParamList } from "@/navigation/types";

type NavigationProp = NativeStackNavigationProp<HomeStackParamList>;

export const useDoubleBackExit = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const lastPressRef = useRef(0);

  useEffect(() => {
    const handleBackPress = () => {
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

        if (currentTime - lastPressRef.current < DOUBLE_PRESS_DELAY) {
          BackHandler.exitApp();
          return true;
        }

        lastPressRef.current = currentTime;
        flashShow({
          message: "再按一次退出应用",
          type: "info",
          duration: 2000,
        });
        return true;
      }

      // 其他页面使用默认的返回行为
      return false;
    };

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );

    return () => {
      subscription.remove();
    };
  }, [navigation, route]);
};

import { useEffect } from "react";
import { BackHandler, ToastAndroid, Platform } from "react-native";
import { useToast } from "../components/Toast/ToastContext";

export const useDoubleBackExit = () => {
  const { showToast } = useToast();
  let lastBackPressed = 0;

  useEffect(() => {
    const backAction = () => {
      const DOUBLE_PRESS_DELAY = 2000;
      const now = new Date().getTime();

      if (now - lastBackPressed < DOUBLE_PRESS_DELAY) {
        // 两秒内第二次按返回键，退出应用
        BackHandler.exitApp();
        return true;
      }

      // 第一次按返回键，显示提示
      lastBackPressed = now;
      if (Platform.OS === "android") {
        showToast("再滑一次退出应用", { type: "info", duration: 2000 });
      }
      return true;
    };

    // 只在 Android 上添加返回键监听
    if (Platform.OS === "android") {
      BackHandler.addEventListener("hardwareBackPress", backAction);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }
  }, []);
};

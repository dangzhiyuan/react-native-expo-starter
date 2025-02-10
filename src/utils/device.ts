import { Platform, Dimensions } from "react-native";
import * as Device from "expo-device";

export const deviceUtils = {
  isIOS: Platform.OS === "ios",
  isAndroid: Platform.OS === "android",

  screenWidth: Dimensions.get("window").width,
  screenHeight: Dimensions.get("window").height,

  isTablet: Device.deviceType === Device.DeviceType.TABLET,

  getBrand: () => Device.brand,
  getModel: () => Device.modelName,
  getSystemVersion: () => Device.osVersion,
};

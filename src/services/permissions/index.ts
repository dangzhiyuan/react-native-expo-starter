import { Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Notifications from "expo-notifications";
import * as Location from "expo-location";

export const PermissionService = {
  async requestCamera() {
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      return status === "granted";
    }
    return true;
  },

  async requestPhotoLibrary() {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      return status === "granted";
    }
    return true;
  },

  async requestNotifications() {
    if (Platform.OS !== "web") {
      const { status } = await Notifications.requestPermissionsAsync();
      return status === "granted";
    }
    return true;
  },

  async requestLocation() {
    if (Platform.OS !== "web") {
      const { status } = await Location.requestForegroundPermissionsAsync();
      return status === "granted";
    }
    return true;
  },
};

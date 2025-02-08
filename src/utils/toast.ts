import Toast from "react-native-toast-message";

type ToastType = "success" | "error" | "info" | "warning";

interface ToastOptions {
  type: ToastType;
  message: string;
  duration?: number;
  position?: "top" | "bottom";
}

export const showToast = ({
  type,
  message,
  duration = 3000,
  position = "top",
}: ToastOptions) => {
  Toast.show({
    type,
    text1: message,
    position,
    visibilityTime: duration,
  });
};

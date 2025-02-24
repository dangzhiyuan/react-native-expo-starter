import { showMessage as showFlashMessage } from "react-native-flash-message";

export function flashShow(message: string, description = "") {
  showFlashMessage({
    message: message,
    description: description,
    type: "info",
    backgroundColor: "rgba(35, 40, 56, 1)",
    color: "rgba(197, 205, 222, 1)",
    titleStyle: { fontWeight: "700" },
    textStyle: { fontSize: 16 },
    style: {
      top: "30%",
      width: 200,
      height: 68,
      borderWidth: 0,
      borderRadius: 135,
      alignItems: "center",
      justifyContent: "center",
    },
  });
}

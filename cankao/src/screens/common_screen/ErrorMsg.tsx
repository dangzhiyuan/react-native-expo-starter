import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { COLORS } from "../../themes/themes";

const { width, height } = Dimensions.get("window");

const ErrorMessage = ({ message, navigation }) => {
  return (
    <View style={styles.centered}>
      <Text style={styles.errorText}>{message}</Text>
      <TouchableOpacity
        style={styles.backHome}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backHomeText}>返回</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.tertiary,
    textAlign: "center",
    marginBottom: 30,
  },
  backHome: {
    width: width * 0.15,
    height: height * 0.03,
    borderRadius: 150,
    borderWidth: 2,
    borderColor: COLORS.secondary,
    backgroundColor: COLORS.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  backHomeText: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.buttonText,
    textAlign: "center",
  },
});

export default ErrorMessage;

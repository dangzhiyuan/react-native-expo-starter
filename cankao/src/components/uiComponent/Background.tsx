import React from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
  ImageBackground,
  Dimensions,
} from "react-native";
import { COLORS } from "../../themes/themes";
import Logo from "./Logo";
import i18n from "../../locales";
import { useLanguage } from "../../utils/LanguageContext";

const { width, height } = Dimensions.get("window");

export default function Background({ children }) {
  const { currentLanguage, toggleLanguage } = useLanguage();
  const dynamicButtonTextStyle = {
    ...styles.buttonText,
    fontSize: currentLanguage === "en" ? 12 : 16,
  };
  return (
    <ImageBackground
      source={require("../../../assets/images/background.png")}
      style={styles.container}
      resizeMode="cover"
    >
      <Logo />
      <TouchableOpacity style={styles.button} onPress={toggleLanguage}>
        <Text style={dynamicButtonTextStyle}>{i18n.t("English")}</Text>
      </TouchableOpacity>
      <KeyboardAvoidingView style={styles.loginContainer} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    position: "absolute",
    left: width * 0.72,
    top: height * 0.275,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: COLORS.secondary,
    borderRadius: 8,
  },
  buttonText: {
    color: COLORS.gray,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  loginContainer: {
    position: "absolute",
    top: height * 0.3,
    left: "15%",
    right: "15%",
    backgroundColor: COLORS.background,
    padding: 10,
    borderRadius: 20,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});

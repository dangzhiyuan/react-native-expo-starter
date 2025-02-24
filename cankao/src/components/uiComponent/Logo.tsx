import React from "react";
import { Dimensions, Image, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export default function Logo() {
  return (
    <Image
      source={require("../../../assets/images/logo3.png")}
      style={styles.image}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    position: "absolute",
    top: "15%",
    left: "15%",
    width: width * 0.3,
    resizeMode: "contain",
    alignSelf: "center",
  },
});

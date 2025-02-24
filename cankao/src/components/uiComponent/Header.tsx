import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Text } from "react-native-paper";
import { COLORS, WEIGHT } from "../../themes/themes";

const { width } = Dimensions.get("window");

export default function Header(props) {
  return <Text style={styles.header} {...props} />;
}

const styles = StyleSheet.create({
  header: {
    fontSize: width * 0.041,
    color: COLORS.primary,
    fontWeight: WEIGHT.middle,
    textAlign: "center",
    marginTop: "6%",
    left: "-32%",
  },
});

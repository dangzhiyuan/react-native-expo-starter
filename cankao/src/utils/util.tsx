import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import i18n from "../locales";
import { Badge } from "react-native-paper";
import * as SecureStore from "expo-secure-store";

export const renderButton = ({
  item,
  currentPage,
  setCurrentPage,
  itemWidth,
  overLimit,
}) => {
  const isSelected = currentPage === item.id;
  console.log("overLimits", overLimit);
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { width: itemWidth },
        isSelected ? styles.selectedButton : null,
      ]}
      onPress={() => setCurrentPage(item.id)}
    >
      <Text style={[styles.buttonText, isSelected ? styles.selectText : null]}>
        {item.name}
      </Text>

      {overLimit && item.name === i18n.t("timeview") && (
        <Badge style={styles.badgePosition}>
          {overLimit.malf.length +
            overLimit.exceedance.length +
            overLimit.alert.length}
        </Badge>
      )}

      {isSelected && <View style={styles.customBorderBottom}></View>}
    </TouchableOpacity>
  );
};

// config.js
export const getBaseUrl = async () => {
  const url = await SecureStore.getItemAsync("BASE_URL");
  return url || "http://10.10.40.40:10888";
};

export const getTargetSimulator = async () => {
  const num = await SecureStore.getItemAsync("TARGET_SIMULATOR");
  return num || "1";
};

const styles = StyleSheet.create({
  button: {
    height: 70,
    top: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 10,
    margin: 5,
    backgroundColor: "transparent",
    position: "relative",
  },
  selectedButton: {
    opacity: 1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "rgb(153,153,153)",
  },
  selectText: {
    color: "rgba(230, 230, 230, 1)",
  },
  badgePosition: {
    position: "absolute",
    top: 10,
    right: 60,
    zIndex: 1,
  },
  customBorderBottom: {
    top: 22,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(90, 145, 204, 1)",
    width: "30%",
    alignSelf: "center",
    marginTop: 3,
  },
});

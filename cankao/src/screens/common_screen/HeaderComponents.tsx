import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import i18n from "../../locales";

const HeaderComponent = ({
  currentTrainName,
  selectedLessonName,
  isFinished,
  nav,
  showModal,
}) => {
  return (
    <View style={styles.header}>
      <Image
        source={require("../../../assets/images/currentScene.png")}
        resizeMode="contain"
        style={{ width: 26.67, height: 26.67, marginRight: 10 }}
      />
      <Text style={styles.headerText}>
        {currentTrainName}-{selectedLessonName}
      </Text>
      {isFinished ? (
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            if (currentTrainName === "test") {
              nav.navigate("Main");
            } else {
              nav.navigate("Create");
            }
          }}
        >
          <Text style={styles.submitButtonText}>{i18n.t("back")}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            if (currentTrainName === "test") {
              nav.navigate("Main");
            } else {
              nav.navigate("Create");
            }
          }}
        >
          <Text style={styles.submitButtonText}>{i18n.t("back")}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(25, 29, 40, 1)",
  },
  headerText: {
    fontSize: 26,
    fontWeight: "700",
    color: "rgba(240, 245, 255, 1)",
    textAlign: "center",
  },
  submitButton: {
    borderRadius: 24,
    borderWidth: 2,
    width: 184,
    height: 48,
    marginLeft: "auto",
    backgroundColor: "rgba(130, 144, 174, 1)",
    justifyContent: "center",
    alignItems: "center",
  },
  submitButtonText: {
    fontSize: 20,
    fontWeight: "700",
    color: "rgba(240, 245, 255, 1)",
    textAlign: "center",
  },
});

export default HeaderComponent;

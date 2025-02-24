import React from "react";
import { View, Text, StyleSheet } from "react-native";
import i18n from "../../locales";

const MalfunctionDisplay = ({ malfunctions }) => {
  if (!malfunctions || malfunctions.length === 0) {
    return (
      <Text style={styles.noMalfunctions}>Malfunction: {i18n.t("noMal")}</Text>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paraFirstText}>Malfunction:</Text>
      <View style={styles.malfunctionContainer}>
        {malfunctions.map((malfunction, index) => (
          <Text key={index} style={styles.paraSecondText}>
            {malfunction.name}
            {index < malfunctions.length - 1 ? "," : ""}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
  malfunctionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
  },
  paraFirstText: {
    fontSize: 13,
    fontWeight: "400",
    color: "rgb(153,153,153)",
    marginRight: 10,
  },
  paraSecondText: {
    fontSize: 13,
    fontWeight: "400",
    color: "rgb(230,230,230)",
    textAlign: "left",
    flexShrink: 1,
    marginTop: 4,
    marginRight: 8,
  },
  noMalfunctions: {
    fontSize: 16,
    color: "rgb(230,230,230)",
    padding: 10,
    textAlign: "center",
  },
});

export default MalfunctionDisplay;

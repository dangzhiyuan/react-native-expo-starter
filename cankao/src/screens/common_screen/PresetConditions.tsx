import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PresetConditionsDisplay = ({ conditions }) => {
  if (!conditions || conditions.length === 0) {
    return <Text style={styles.noConditions}>无预设参数信息</Text>;
  }

  return (
    <View style={styles.paraFirst1}>
      {conditions.map((condition, index) => (
        <View key={index} style={styles.conditionItem}>
          <Text style={styles.paraFirstText}>{condition.name}:</Text>
          <Text style={styles.paraFirstValue}>{condition.value}</Text>
          <Text style={styles.paraFirstUnit}>{condition.unit}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  paraFirst1: {
    flexDirection: "row",
    flexWrap: "wrap",
    maxWidth: "100%",
    alignItems: "center",
  },
  conditionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  paraFirstText: {
    fontSize: 13,
    fontWeight: "400",
    textAlign: "center",
    color: "rgb(153,153,153)",
    marginRight: 4,
  },
  paraFirstValue: {
    fontSize: 13,
    fontWeight: "400",
    color: "rgb(230,230,230)",
    marginLeft: 5,
    marginRight: 5,
  },
  paraFirstUnit: {
    fontSize: 13,
    fontWeight: "400",
    color: "rgb(230,230,230)",
    marginLeft: 4,
  },
  noConditions: {
    fontSize: 16,
    color: "rgb(230,230,230)",
    padding: 10,
    textAlign: "center",
  },
});

export default PresetConditionsDisplay;

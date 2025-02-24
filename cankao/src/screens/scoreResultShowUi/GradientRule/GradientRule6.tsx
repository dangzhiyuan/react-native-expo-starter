import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const GradientRule6 = ({ data }) => {
  const colorBar = data;
  function calculateLeftStyle(result, data_up_boundary, data_down_boundary) {
    const l = data_up_boundary - (data_down_boundary - data_up_boundary);
    const r = data_down_boundary + (data_down_boundary - data_up_boundary);
    if (result <= l) {
      return "-110%";
    }
    if (result >= r) {
      return "390%";
    }
    if (result >= l && result <= data_up_boundary) {
      return (
        (((result - l) / (data_up_boundary - l)) * 170 - 110).toString() + "%"
      );
    }
    if (result > data_up_boundary && result <= data_down_boundary) {
      return (
        (
          ((result - data_up_boundary) /
            (data_down_boundary - data_up_boundary)) *
            165 +
          60
        ).toString() + "%"
      );
    }
    if (result >= data_down_boundary && result <= r) {
      return (
        (
          ((result - data_down_boundary) / (r - data_down_boundary)) * 165 +
          225
        ).toString() + "%"
      );
    }
  }
  const arrowBoxLeft = {
    left: calculateLeftStyle(
      colorBar.result,
      colorBar.data_up_boundary,
      colorBar.data_down_boundary
    ),
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={styles.trapezoid}></View>
        <Text style={styles.lessonInfo}>{colorBar.name}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 50,
          position: "absolute",
          left: "80%",
        }}
      >
        <View style={{ width: 100 }}>
          <Text style={styles.dataInfo}>{colorBar.data}</Text>
        </View>
        <LinearGradient
          colors={[
            "#8AC555",
            "#8AC555",
            "#8AC555",
            "#8AC555",
            "#8AC555",
            "#8AC555",
            "#D84733",
            "#D84733",
            "#D84733",
          ]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.progressBar}
        >
          <View style={{ flexDirection: "row" }}>
            <View
              style={{ width: 83.3, height: 15, backgroundColor: "#8AC555" }}
            ></View>
            <View
              style={{ width: 83.3, height: 15, backgroundColor: "#8AC555" }}
            ></View>
            <View
              style={{ width: 83.3, height: 15, backgroundColor: "#D84733" }}
            ></View>
          </View>
          <View style={styles.progress}>
            <View style={[styles.arrowBox, arrowBoxLeft]}>
              <Text
                style={{
                  color: "rgb(26,26,26)",
                  fontSize: 14,
                  fontWeight: "500",
                }}
              >
                {colorBar.result}
              </Text>
              <View style={styles.arrowUp} />
              <View style={styles.arrowTop} />
            </View>
          </View>
          <View style={styles.separatorContainer}>
            {/* <View style={[styles.separator, { left: "-16%" }]}>
              <Text style={styles.separatorText}>
                {colorBar.data_up_boundary.toFixed(2)}
              </Text>
            </View> */}
            <View style={[styles.separator1, { left: "270%" }]}>
              <Text style={styles.separatorText}>
                {colorBar.data_down_boundary.toFixed(2)}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    width: 400,
    height: 70,
    marginTop: -20,
    paddingBottom: 3,
    marginBottom: 100,
  },
  trapezoid: {
    width: 25,
    height: 6,
    borderBottomWidth: 15,
    borderLeftWidth: 0,
    borderBottomColor: "rgb(230,230,230)",
    borderRightWidth: 5,
    marginRight: 20,
  },
  lessonInfo: {
    fontSize: 15,
    fontWeight: "500",
    color: "rgb(245,245,245)",
    flex: 1,
    textAlign: "left",
    verticalAlign: "top",
  },

  dataInfo: {
    fontSize: 16,
    fontWeight: "400",
    color: "rgb(204,204,204)",
    textAlign: "left",
    verticalAlign: "top",
    marginBottom: -3,
  },

  progressBar: {
    width: 250,
    height: 15,
    borderRadius: 1,
    marginLeft: 10,
  },
  progress: {
    height: 65,
    width: "20%",
    zIndex: 10000,
  },
  arrowBox: {
    position: "relative",
    display: "flex",
    top: 30,
    margin: 15,
    padding: 7,
    width: 80,
    minWidth: 60,
    color: "#555",
    fontSize: 16,
    backgroundColor: "rgb(204,204,204)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 2,
  },
  arrowUp: {
    position: "absolute",
    top: -15,
    left: "76%",
    marginLeft: -15,
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 15,
    borderStyle: "solid",
    backgroundColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "rgb(204,204,204)",
  },
  arrowTop: {
    position: "absolute",
    top: -59,
    left: "57%",
    marginLeft: -1,
    width: 7.5,
    height: 55,
    backgroundColor: "rgb(204,204,204)",
    borderBottomColor: "rgb(204,204,204)",
    borderBottomWidth: 5,
    borderRadius: 4,
    borderWidth: 1,
    zIndex: 1000,
  },
  separatorContainer: {
    position: "absolute",
    flexDirection: "row",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  separator: {
    width: 2,
    height: 40,
    flexDirection: "row",
    backgroundColor: "transparent",
    borderStyle: "dashed",
    borderColor: "rgb(102,102,102)",
    borderWidth: 1,
    zIndex: 0,
  },
  separator1: {
    width: 2,
    height: 40,
    backgroundColor: "transparent",
    borderStyle: "dashed",
    borderColor: "rgb(102,102,102)",
    borderWidth: 1,
  },
  separatorText: {
    position: "absolute",
    top: -30,
    left: -18,
    color: "rgb(153,153,153)",
    fontSize: 14,
    textAlign: "left",
    verticalAlign: "top",
    fontWeight: "400",
  },
});

export default GradientRule6;

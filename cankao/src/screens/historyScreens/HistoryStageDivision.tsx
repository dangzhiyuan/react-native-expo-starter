import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import React, { useState } from "react";
import SectionalTwo from "../SectionTwo";
import TimeReviewScreen from "../TimeReviewScreen";
import RuleResultsWithoutInput from "../RuleResultsWithoutInput";
import { Badge } from "react-native-paper";
import i18n from "../../locales";

const menu = [
  { id: "1", name: i18n.t("sectionalview") },
  { id: "2", name: i18n.t("assessmentitem") },
  { id: "3", name: i18n.t("timeview") },
];

const HistoryStageDivision = ({
  data,
  textInputValues,
  setTextInputValues,
  resultId,
  segmengId,
  currentTrainName,
}) => {
  const { width } = useWindowDimensions();
  const itemWidth = width / 3;
  const [currentPage, setCurrentPage] = useState("1");

  const preset_conditions = data["preset_conditions"]["preset_conditions"];
  const malFunctions = data["preset_conditions"]["preset_malfunctions"];
  const overLimit = data["events"];

  const renderButton = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.button,
        { width: itemWidth },
        currentPage === item.id ? styles.selectedButton : null,
      ]}
      onPress={() => {
        setCurrentPage(item.id);
      }}
    >
      <Text
        style={[
          styles.buttonText,
          currentPage === item.id ? styles.selectText : null,
        ]}
      >
        {item.name}
      </Text>

      {overLimit && item.name === i18n.t("timeview") && (
        <Badge style={styles.badgePosition}>
          {overLimit?.malf.length +
            overLimit?.exceedance?.length +
            overLimit?.alert?.length}
        </Badge>
      )}

      {currentPage === item.id && (
        <View style={styles.customBorderBottom}></View>
      )}
    </TouchableOpacity>
  );

  const renderPage = () => {
    if (currentPage === "1" && data) {
      return (
        <SectionalTwo trains={data} currentTrainName={data["flight_phase"]} />
      );
    } else if (currentPage === "2") {
      return <RuleResultsWithoutInput trainScore={data["rules_result"]} />;
    } else if (currentPage === "3" && data["events"]) {
      return <TimeReviewScreen trains={data["events"]} />;
    }
  };

  if (!data || !data.preset_conditions) {
    return <Text>No valid data provided</Text>;
  } else {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.paraInfo}>
          <View>
            {preset_conditions && preset_conditions.length > 0 && (
              <View style={styles.paraFirst1}>
                {preset_conditions.map((condition, index) => (
                  <View key={index} style={styles.conditionItem}>
                    <Text style={styles.paraFirstText}>{condition.name}:</Text>
                    <Text style={styles.paraFirstValue}>{condition.value}</Text>
                    <Text style={styles.paraFirstUnit}>{condition.unit}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          <View style={styles.divider}></View>

          <View style={styles.paraSecond}>
            <Text style={styles.paraFirstText}>Malfunction:</Text>
            {malFunctions && malFunctions.length > 0 ? (
              malFunctions.map((malfunction, index) => (
                <Text key={index} style={styles.paraSecondText}>
                  {malfunction.name},
                </Text>
              ))
            ) : (
              <Text style={styles.paraSecondText}>{i18n.t("noMal")}</Text>
            )}
          </View>
        </View>
        <View style={styles.charts}>
          <View style={{ paddingBottom: 10 }}>
            <FlatList
              data={menu}
              renderItem={renderButton}
              keyExtractor={(item) => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          {renderPage()}
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black" },
  header: {
    flexDirection: "row",
    padding: 3,
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 26,
    fontWeight: "700",
    color: "rgb(230,230,230)",
    textAlign: "center",
  },
  submitButton: {
    borderRadius: 24,
    borderWidth: 2,
    width: 184,
    height: 48,
    marginLeft: "auto",
    backgroundColor: "rgb(230,230,230)",
    justifyContent: "center",
    alignItems: "center",
  },
  submitButtonText: {
    fontSize: 20,
    fontWeight: "700",
    color: "rgb(51,51,51)",
    textAlign: "center",
  },
  paraInfo: {
    flexDirection: "column",
    backgroundColor: "rgba(10, 12, 16, 1)",
    padding: 10,
  },
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
  paraFirst2: {
    flexDirection: "column",
  },
  divider: {
    borderWidth: 1,
    borderColor: "rgb(77,77,77)",
    borderStyle: "dashed",
    marginVertical: 20,
  },
  paraSecond: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  paraSecondText: {
    fontSize: 13,
    fontWeight: "400",
    color: "rgb(230,230,230)",
    textAlign: "left",
    verticalAlign: "top",
    flexShrink: 1,
    marginTop: 4,
    marginRight: 8,
  },
  charts: { flex: 1, backgroundColor: "rgba(25, 29, 40, 1)" },
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
  tabButton: {
    padding: 16,
    backgroundColor: "grey",
    marginHorizontal: 8,
    borderRadius: 4,
  },
  activeTab: {
    backgroundColor: "blue",
  },
  tabButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  tabsContainer: {
    marginVertical: 10,
  },
});

export default HistoryStageDivision;

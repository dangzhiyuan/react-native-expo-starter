import {
  View,
  Text,
  FlatList,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AssessmentMenu } from "../utils/menu";
import { renderButton } from "../utils/util";
import PresetConditionsDisplay from "./common_screen/PresetConditions";
import MalfunctionDisplay from "./common_screen/MalFunctions";
import RenderPage from "./common_screen/RenderDrawView";

const StageDivision = ({
  data,
  textInputValues,
  setTextInputValues,
  isFinished,
}) => {
  const { width } = useWindowDimensions();
  const itemWidth = width / 3;
  const [currentPage, setCurrentPage] = useState("1");
  const preset_conditions = data["preset_conditions"]["preset_conditions"];
  const malFunctions = data["preset_conditions"]["preset_malfunctions"];
  const overLimit = data["events"];
  console.log("sdsd",data["special_view_recall"]["data_recall"]);

  useEffect(() => {
    setCurrentPage("1");
  }, [isFinished]);

  if (!data || !data.preset_conditions) {
    return <Text>No valid data provided</Text>;
  } else {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.paraInfo}>
          <View>
            <PresetConditionsDisplay conditions={preset_conditions} />
          </View>
          <View style={styles.divider}></View>
          <View style={styles.paraSecond}>
            <MalfunctionDisplay malfunctions={malFunctions} />
          </View>
        </View>
        <View style={styles.charts}>
          <View style={{ paddingBottom: 10 }}>
            <FlatList
              data={AssessmentMenu}
              renderItem={({ item }) =>
                renderButton({
                  item,
                  currentPage,
                  setCurrentPage,
                  itemWidth,
                  overLimit,
                })
              }
              keyExtractor={(item) => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <RenderPage
            currentPage={currentPage}
            trainScore={data}
            currentTrainName={data["flight_phase"]}
            textInputValues={textInputValues}
            setTextInputValues={setTextInputValues}
            overLimit={overLimit}
            isFinished={isFinished}
          />
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
  activeTab: {
    backgroundColor: "blue",
  },
  tabsContainer: {
    marginVertical: 10,
  },
});

export default StageDivision;

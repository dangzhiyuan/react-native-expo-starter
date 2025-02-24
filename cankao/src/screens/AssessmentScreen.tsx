import { View, StyleSheet, FlatList, Dimensions, Text } from "react-native";
import React, { useState } from "react";
import { PaperProvider, Portal } from "react-native-paper";
import WaitScoreModal from "./modals/WaitScoreModal";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { AssessmentMenu } from "../utils/menu";
import { renderButton } from "../utils/util";
import PresetConditionsDisplay from "./common_screen/PresetConditions";
import { MaterialIndicator } from "react-native-indicators";
import MalfunctionDisplay from "./common_screen/MalFunctions";
import HeaderComponent from "./common_screen/HeaderComponents";
import RenderPage from "./common_screen/RenderDrawView";
import { lessonStore } from "../stroages/lessonStorage";
import ErrorMessage from "./common_screen/ErrorMsg";
import ContentsRenderer from "./common_screen/RenderContents";

const { width, height } = Dimensions.get("window");

interface RouteParams {
  trainScore: any;
  currentLesson: {
    currentTrainName: string;
    selectedLessonName: string;
  };
  isFinished: boolean;
}

const AssessmentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { trainScore, currentLesson, isFinished } = route.params as RouteParams;
  const { currentTrainName, selectedLessonName } = currentLesson;
  const [textInputValues, setTextInputValues] = useState([]);
  const [visible, setVisible] = React.useState(false);
  const [isTraining, setIsTraining] = useState(false);
  const [loading, setLoading] = useState(true);
  const itemWidth = width / 3;
  const [currentPage, setCurrentPage] = useState("1");
  const [resultId, setResultId] = useState<string>("");
  const [preset_conditions, setPreset_conditions] = useState([]);
  const [malFunctions, setMalFunctions] = useState([]);
  const [overLimit, setOverLimit] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      if (isFinished) {
        setCurrentPage("1");
      }
      if (!trainScore || !trainScore["preset_conditions"]) {
        return;
      }
      setTimeout(() => {
        setResultId(trainScore["result_id"]);
        setPreset_conditions(
          trainScore["preset_conditions"]["preset_conditions"]
        );
        setMalFunctions(trainScore["preset_conditions"]["preset_malfunctions"]);
        setOverLimit(trainScore["events"]);
        setLoading(false);
      }, 1000);
    }, [trainScore])
  );

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const fetchData = async () => {
    // const num = await lessonStore
    //   .getState()
    //   .getManualScore(resultId, textInputValues);
    await delay(1000);

    return 1;
  };

  const showModal = async () => {
    setVisible(true);
    setIsTraining(true);
  };
  const hideModal = () => setVisible(false);

  return (
    <PaperProvider>
      <Portal>
        <View style={styles.container}>
          <View>
            {trainScore ? (
              <HeaderComponent
                currentTrainName={currentTrainName}
                selectedLessonName={currentTrainName}
                isFinished={isFinished}
                nav={navigation}
                showModal={showModal}
              />
            ) : (
              <></>
            )}
          </View>
          <View style={{ flex: 1 }}>
            {trainScore ? (
              <ContentsRenderer
                segments={trainScore}
                isLoading={false}
                textInputValues={textInputValues}
                setTextInputValues={setTextInputValues}
                isFinished={isFinished}
              />
            ) : (
              <ErrorMessage
                message={
                  lessonStore.getState().message + "\n" + "未获取到训练数据"
                }
                navigation={navigation}
              />
            )}
          </View>
        </View>

        <WaitScoreModal
          visible={visible}
          onDismiss={hideModal}
          fetchResult={fetchData}
          resultId={resultId}
          navigation={navigation}
          currentTrainName={currentTrainName}
          selectedLessonName={selectedLessonName}
        />
      </Portal>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black" },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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

export default AssessmentScreen;

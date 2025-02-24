import { View, StyleSheet, FlatList, Text, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { PaperProvider, Portal } from "react-native-paper";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { lessonStore } from "../stroages/lessonStorage";
import WaitScoreModal from "./modals/WaitScoreModal";
import StageTabMenu from "./common_screen/RenderStageMenu";
import HeaderComponent from "./common_screen/HeaderComponents";
import ContentsRenderer from "./common_screen/RenderContents";
import { flashShow } from "../utils/FlashMessage";
import { COLORS } from "../themes/themes";
import ErrorMessage from "./common_screen/ErrorMsg";

const { width, height } = Dimensions.get("window");

interface RouteParams {
  currentLesson: {
    currentTrainName: string;
    selectedLessonName: string;
  };
  currentScore: {
    segments: {
      segment_id: string;
      duration_time: number;
      begin_time: string;
      end_time: string;
      ident: string;
    }[];
    result_id: string;
  };
  isFinished: boolean;
}

interface SegmentData {
  segment_id: string;
  duration_time: number;
  begin_time: string;
  end_time: string;
  ident: string;
  data: any;
}

const AssessmentScreenTab: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { currentLesson, currentScore, isFinished } =
    route.params as RouteParams;
  const { currentTrainName, selectedLessonName } = currentLesson;
  const [textInputValues, setTextInputValues] = useState<string[]>([]);
  const [visible, setVisible] = useState(false);
  const [isTraining, setIsTraining] = useState(false);
  const [activeBBCTab, setActiveBBCTab] = useState<string | undefined>(
    undefined
  );
  const [resultId, setResultId] = useState<string>("");
  const [segments, setSegments] = useState<SegmentData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log("isFinished", isFinished);

  useEffect(() => {
    if (currentScore.segments.length === 0) {
      setIsLoading(false);
      flashShow("数据加载异常");
    } else {
      const firstSegmentId = currentScore.segments[0].segment_id;
      setActiveBBCTab(firstSegmentId);
    }
    if (currentScore && currentScore.segments.length > 0) {
      const firstSegmentId = currentScore.segments[0].segment_id;
      setActiveBBCTab(firstSegmentId);
      setResultId(currentScore.result_id);
      fetchAndSetSegmentData(firstSegmentId);
    }
  }, []);

  // 保持useFocusEffect，确保每次当视图获得焦点时，相关数据能够被刷新
  useFocusEffect(
    React.useCallback(() => {
      if (isFinished) {
        const firstSegmentId = currentScore.segments[0].segment_id;
        setActiveBBCTab(firstSegmentId);
      }
      if (currentScore && currentScore.segments.length > 0 && activeBBCTab) {
        fetchAndSetSegmentData(activeBBCTab);
      }
    }, [currentScore, activeBBCTab])
  );

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const fetchData = async () => {
    const num = await lessonStore
      .getState()
      .getManualScore(resultId, textInputValues, activeBBCTab);
    await delay(1000);
    return num;
  };

  const showModal = async () => {
    setVisible(true);
    setIsTraining(true);
  };

  const hideModal = () => setVisible(false);

  const fetchAndSetSegmentData = async (segmentId) => {
    setIsLoading(true);
    try {
      console.log("Initiating fetch for segment:", segmentId);
      if (resultId && segmentId) {
        const result = await lessonStore
          .getState()
          .getSegmentScore(resultId, segmentId);
        console.log("Data fetched for segment:", segmentId, result);
        if (result && result["data"]) {
          setSegments(result);
        } else {
          console.error("Unexpected data structure:", result);
          flashShow("Unexpected data structure");
        }
      }
    } catch (error) {
      console.error("Failed to fetch segment data:", error);
      flashShow("Failed to fetch segment data");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PaperProvider>
      <Portal>
        <View style={styles.container}>
          <View>
            {currentScore.segments.length > 0 ? (
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
          <View>
            <FlatList
              data={currentScore.segments}
              renderItem={({ item }) => (
                <StageTabMenu
                  item={item}
                  isActive={activeBBCTab === item.segment_id}
                  onSetActiveBBCTab={setActiveBBCTab}
                  fetchAndSetSegmentData={fetchAndSetSegmentData}
                />
              )}
              keyExtractor={(item) => item.segment_id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <View style={{ flex: 1 }}>
            {currentScore.segments.length > 0 ? (
              <ContentsRenderer
                segments={segments["data"]}
                isLoading={isLoading}
                textInputValues={textInputValues}
                setTextInputValues={setTextInputValues}
                isFinished={isFinished}
              />
            ) : (
              <ErrorMessage
                message={
                  lessonStore.getState().message +
                  "\n" +
                  "no segments" +
                  "\t" +
                  "未获取到训练数据"
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
          currentTrainName={currentTrainName}
          selectedLessonName={selectedLessonName}
          navigation={navigation}
        />
      </Portal>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black" },
  header: {
    flexDirection: "row",
    padding: 30,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.dark,
  },
  headerText: {
    fontSize: 26,
    fontWeight: "700",
    color: COLORS.buttonText,
    textAlign: "center",
  },
  tabButton: {
    width: 166,
    height: 89,
    backgroundColor: COLORS.dark,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTab: {
    backgroundColor: "rgba(10, 12, 16, 1)",
  },
  tabButtonIdent: {
    fontSize: 20,
    color: COLORS.buttonText,
    fontWeight: "500",
  },
  tabButtonDuration: {
    fontSize: 13,
    color: "rgba(240, 245, 255, 1)",
    fontWeight: "300",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.tertiary,
    textAlign: "center",
    marginBottom: 30,
  },
  backHome: {
    width: width * 0.15,
    height: height * 0.03,
    borderRadius: 150,
    borderWidth: 2,
    borderColor: COLORS.secondary,
    backgroundColor: COLORS.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  backHomeText: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.buttonText,
    textAlign: "center",
  },
});

export default AssessmentScreenTab;

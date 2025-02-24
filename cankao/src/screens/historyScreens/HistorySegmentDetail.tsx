import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  Modal,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { lessonStore } from "../../stroages/lessonStorage";
import StageDivision from "../StageDivision";
import HistoryStageDivision from "./HistoryStageDivision";
import i18n from "../../locales";
import HeaderComponent from "../common_screen/HeaderComponents";
import StageTabMenu from "../common_screen/RenderStageMenu";
import ContentsRenderer from "../common_screen/RenderContents";
import ErrorMessage from "../common_screen/ErrorMsg";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Button, MD3Colors, PaperProvider, Portal } from "react-native-paper";
import { flashShow } from "../../utils/FlashMessage";
import ReportInfoModal from "../modals/ReportInfoModal";

type CurrentScoreRouteParams = {
  currentTrainName: string;
  selectedLessonName: string;
  currentScore: any;
  setSelectedItem: any;
};

const HistorySegmentDetail: React.FC<CurrentScoreRouteParams> = ({
  currentScore,
  currentTrainName,
  selectedLessonName,
  setSelectedItem,
}) => {
  const navigation = useNavigation();
  // const [textInputValues, setTextInputValues] = useState([]);
  const [activeBBCTab, setActiveBBCTab] = useState<string | undefined>(
    undefined
  );
  const [resultId, setResultId] = useState("");
  const [segments, setSegments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [modalInfo, setModalInfo] = useState("");

  useEffect(() => {
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
      if (currentScore && currentScore.segments.length > 0 && activeBBCTab) {
        fetchAndSetSegmentData(activeBBCTab);
      }
    }, [currentScore, activeBBCTab])
  );

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
        }
      }
    } catch (error) {
      console.error("Failed to fetch segment data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  async function generateReport() {
    const result = await lessonStore.getState().printReport(resultId);
    if (result["ret"] === 0) {
      // setModalInfo(result["message"] + " " + " 报告保存成功");
      setModalInfo(" 报告保存成功");
    } else {
      setModalInfo(" 报告保存失败");
    }
    setVisible(true);
  }

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  return (
    <PaperProvider>
      <Portal>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>{selectedLessonName}</Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={[
                  {
                    width: 50,
                    height: 50,
                    alignItems: "center",
                    justifyContent: "center",
                  },
                ]}
                onPress={() => {
                  generateReport();
                }}
              >
                <MaterialCommunityIcons
                  name="printer"
                  color={MD3Colors.primary100}
                  size={30}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSelectedItem(null)}
              >
                <Text
                  style={{ fontSize: 20, fontWeight: "400", color: "black" }}
                >
                  {i18n.t("back")}
                </Text>
              </TouchableOpacity>
            </View>
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
                textInputValues={undefined}
                setTextInputValues={undefined}
                isFinished={true}
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
        <ReportInfoModal
          visible={visible}
          onDismiss={hideModal}
          modalInfo={modalInfo}
        />
      </Portal>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black" },
  header: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(25, 29, 40, 1)",
  },
  closeButton: {
    borderRadius: 24,
    borderWidth: 2,
    width: 184,
    height: 48,
    marginLeft: "auto",
    backgroundColor: "rgba(130, 144, 174, 1)",
    justifyContent: "center",
    alignItems: "center",
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
  paraInfo: {
    flexDirection: "column",
    backgroundColor: "rgb(36,36,36)",
    padding: 10,
  },
  paraFirst1: {
    flexDirection: "row",
    flexWrap: "wrap",
    maxWidth: "100%",
  },
  paraFirst2: {
    flexDirection: "column",
  },
  paraFirstText: {
    fontSize: 19,
    fontWeight: "400",
    textAlign: "center",
    verticalAlign: "top",
    color: "rgb(153,153,153)",
    marginBottom: 4,
    marginRight: 13,
  },
  paraFirstValue: {
    fontSize: 19,
    fontWeight: "400",
    color: "rgb(230,230,230)",
    textAlign: "left",
    verticalAlign: "top",
    marginLeft: -5,
    marginRight: 10,
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
  },
  paraSecondText: {
    fontSize: 19,
    fontWeight: "400",
    color: "rgb(230,230,230)",
    textAlign: "left",
    verticalAlign: "top",
    marginRight: 13,
  },
  charts: { flex: 1 },
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
  },
  customBorderBottom: {
    top: 22,
    height: 2,
    backgroundColor: "rgb(230,230,230)",
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
    width: 166,
    height: 89,
    backgroundColor: "rgba(25, 29, 40, 1)",
    alignItems: "center",
    justifyContent: "center",
  },
  activeTab: {
    backgroundColor: "rgba(10, 12, 16, 1)",
  },
  tabButtonIdent: {
    fontSize: 20,
    color: "rgba(240, 245, 255, 1)",
    fontWeight: "500",
  },
  tabButtonStart: {
    fontSize: 13,
    color: "rgba(240, 245, 255, 1)",
    fontWeight: "300",
  },
  tabButtonEnd: {
    fontSize: 13,
    color: "rgba(240, 245, 255, 1)",
    fontWeight: "300",
  },
  tabButtonDuration: {
    fontSize: 13,
    color: "rgba(240, 245, 255, 1)",
    fontWeight: "300",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: "center",
  },
});

export default HistorySegmentDetail;

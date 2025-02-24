import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  useWindowDimensions,
  Dimensions,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Badge, Icon, PaperProvider, Portal, Button } from "react-native-paper";
import { lessonStore } from "../../stroages/lessonStorage";
import SectionalTwo from "../SectionTwo";
import RuleResultsWithoutInput from "../RuleResultsWithoutInput";
import TimeReviewScreen from "../TimeReviewScreen";
import { flashShow } from "../../utils/FlashMessage";
import i18n from "../../locales";
import ContentsRenderer from "../common_screen/RenderContents";
import ErrorMessage from "../common_screen/ErrorMsg";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { MD3Colors } from "react-native-paper";
import ReportInfoModal from "../modals/ReportInfoModal";

const { width, height } = Dimensions.get("window");

type CurrentScoreRouteParams = {
  resultId: string;
  lessonName: string;
  lessonId: string;
  setSelectedItem: any;
};

const HistoryNormalDetail: React.FC<CurrentScoreRouteParams> = ({
  resultId,
  lessonName,
  lessonId,
  setSelectedItem,
}) => {
  const navigation = useNavigation();
  const [historyScore, setHistoryScore] = useState(undefined);
  const [visible, setVisible] = useState(false);
  const [modalInfo, setModalInfo] = useState("");

  useEffect(() => {
    const fetchHistoryScore = async () => {
      const trainScore = await lessonStore
        .getState()
        .getHistoryScoreDetail(resultId);
      if (trainScore && Object.keys(trainScore).length > 0) {
        console.log("history score detail: ", trainScore);
        setHistoryScore(trainScore);
      } else {
        flashShow("Failed to load history score detail: No data");
      }
    };
    fetchHistoryScore();
  }, []);

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
            <Text style={styles.headerText}>{lessonName}</Text>
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
          <View style={{ flex: 1 }}>
            {historyScore ? (
              <ContentsRenderer
                segments={historyScore}
                isLoading={false}
                textInputValues={undefined}
                setTextInputValues={undefined}
                isFinished={true}
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
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 26,
    marginLeft: width * 0.05,
    fontWeight: "700",
    color: "rgb(230,230,230)",
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
  detailsView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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

export default HistoryNormalDetail;

import React, { useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { lessonStore } from "../../stroages/lessonStorage";
import HistorySegmentDetail from "./HistorySegmentDetail";
import HistoryNormalDetail from "./HistoryNormalDetail";
import { flashShow } from "../../utils/FlashMessage";
import { useLanguage } from "../../utils/LanguageContext";

const HistoryDetail = ({ selectedItem, setSelectedItem }) => {
  const { currentLanguage } = useLanguage();
  const [historyScore, setHistoryScore] = useState(null);
  const [isSegment, setIsSegment] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistoryScore = async () => {
      setIsLoading(true);
      try {
        const trainScore = await lessonStore
          .getState()
          .getHistoryScoreDetail(selectedItem.result_id);
        if (trainScore) {
          setIsSegment(trainScore.hasOwnProperty("segments"));
          setHistoryScore(trainScore);
        } else {
          flashShow("Failed to load history score detail: No data");
        }
      } catch (error) {
        flashShow(`Error loading history score detail: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistoryScore();
  }, [selectedItem.result_id]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return isSegment ? (
    <HistorySegmentDetail
      currentScore={historyScore}
      currentTrainName={selectedItem.lesson_name}
      selectedLessonName={selectedItem.lesson_name}
      setSelectedItem={setSelectedItem}
    />
  ) : (
    <HistoryNormalDetail
      resultId={selectedItem.result_id}
      lessonName={
        currentLanguage === "zh"
          ? selectedItem.lesson_name
          : selectedItem.lesson_name_en
      }
      lessonId={selectedItem.lesson_id}
      setSelectedItem={setSelectedItem}
    />
  );
};

const LoadingIndicator = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="rgba(90, 145, 204, 1)" />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black", padding: 5 },
  header: { flexDirection: "row", alignItems: "center" },
  headerText: {
    fontSize: 26,
    fontWeight: "700",
    color: "rgb(230,230,230)",
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
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
    backgroundColor: "rgb(36,36,36)",
    padding: 10,
  },
  paraFirst1: { flexDirection: "row", flexWrap: "wrap", maxWidth: "100%" },
  paraFirst2: { flexDirection: "column" },
  paraFirstText: {
    fontSize: 19,
    fontWeight: "400",
    textAlign: "center",
    color: "rgb(153,153,153)",
    marginBottom: 4,
    marginRight: 13,
  },
  paraFirstValue: {
    fontSize: 19,
    fontWeight: "400",
    color: "rgb(230,230,230)",
    textAlign: "left",
    marginLeft: -5,
    marginRight: 10,
  },
  divider: {
    borderWidth: 1,
    borderColor: "rgb(77,77,77)",
    borderStyle: "dashed",
    marginVertical: 20,
  },
  paraSecond: { flexDirection: "row", alignItems: "center" },
  paraSecondText: {
    fontSize: 19,
    fontWeight: "400",
    color: "rgb(230,230,230)",
    textAlign: "left",
    marginRight: 13,
  },
  charts: { flex: 1 },
  button: {
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    borderRadius: 10,
    margin: 5,
    backgroundColor: "transparent",
  },
  customBorderBottom: {
    height: 2,
    backgroundColor: "rgb(230,230,230)",
    width: "30%",
    alignSelf: "center",
    marginTop: 3,
  },
  selectedButton: { opacity: 1 },
  buttonText: { fontSize: 16, fontWeight: "700", color: "rgb(153,153,153)" },
  selectText: { color: "rgba(230, 230, 230, 1)" },
  detailsView: { flex: 1, alignItems: "center", justifyContent: "center" },
  closeButton: {
    width: 200,
    height: 56,
    borderRadius: 150,
    borderWidth: 2,
    padding: 5,
    borderColor: "rgba(197, 205, 222, 1)",
    backgroundColor: "rgba(197, 205, 222, 1)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "45%",
    marginBottom: "1%",
  },
});

export default HistoryDetail;

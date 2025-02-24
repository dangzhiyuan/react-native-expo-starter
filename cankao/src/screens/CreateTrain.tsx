import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Portal, PaperProvider } from "react-native-paper";
import { MaterialIndicator } from "react-native-indicators";
import { ScrollView } from "react-native-gesture-handler";
import TakeoffStep from "./TakeoffStep";
import { lessonStore } from "../stroages/lessonStorage";
import StartTrainingModal from "./modals/StartTrainingModal";
import { useFocusEffect } from "@react-navigation/native";
import { useLanguage } from "../utils/LanguageContext";
import i18n from "../locales";
import { COLORS } from "../themes/themes";
import { flashShow } from "../utils/FlashMessage";
import { getTargetSimulator } from "../utils/util";

interface LoginScreenProps {
  navigation: any;
}
const CreateTrain: React.FC<LoginScreenProps> = ({ navigation }) => {
  const { currentLanguage } = useLanguage();
  const data = [];
  const lessonData = lessonStore.getState().lessonData;
  const [currentPage, setCurrentPage] = useState("1");
  const [currentTrainName, setCurrentTrainName] = useState("");
  const [updatedData, setUpdatedData] = useState(data);
  const [categoryInfo, setCategoryInfo] = useState([]);
  const [filteredLessons, setFilteredLessons] = useState([]);
  const [selectedLessonName, setSelectedLessonName] = useState<string | null>(
    null
  );
  const [sessionId, setSessionId] = useState(null);
  const [lessonDescription, setLessonDescription] = useState<string | null>(
    null
  );
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);
  const [selectedLessonType, setSelectedLessonType] = useState<number | null>(
    null
  );
  const [visible, setVisible] = React.useState(false);
  const [trainingButtonText, setTrainingButtonText] = useState(
    i18n.t("startTrain")
  );
  const [isTraining, setIsTraining] = useState(false);
  const [disable, setDisable] = useState(false);
  const [isEnd, setIsend] = useState(false);
  const [indicator, setIndicator] = useState(false);

  useEffect(() => {
    if (!disable && trainingButtonText === i18n.t("touchScore")) {
      setIndicator(false);
    }
  }, [disable, trainingButtonText]);

  //保证重新创建训练时，默认为第一本场，可以重置按钮样式
  useFocusEffect(
    React.useCallback(() => {
      setTrainingButtonText(i18n.t("startTrain"));
      const tmp1 = lessonData[lessonData.length - 1];
      const tmp2 = lessonData[lessonData.length - 3];
      const tmp3 = lessonData[lessonData.length - 2];
      data.push({
        id: "1",
        name_zh: tmp1.lessons[0].lesson_name,
        name_en: tmp1.flight_phase_en,
        description_zh: tmp1.lessons[0].description,
        description_en: tmp1.lessons[0].description_en,
      });
      data.push({
        id: "2",
        name_zh: tmp2.lessons[0].lesson_name,
        name_en: tmp2.flight_phase_en,
        description_zh: tmp2.lessons[0].description,
        description_en: tmp2.lessons[0].description_en,
      });
      data.push({
        id: "3",
        name_zh: tmp3.lessons[0].lesson_name,
        name_en: tmp3.flight_phase_en,
        description_zh: tmp3.lessons[0].description,
        description_en: tmp3.lessons[0].description_en,
      });
      setDisable(false);
      if (currentLanguage === "zh") {
        setCurrentTrainName(data[0].name_zh);
        setCategoryInfo(data[0].description_zh);
      } else {
        setCurrentTrainName(data[0].name_en);
        setCategoryInfo(data[0].description_en);
      }
      setCurrentPage("1");
      setLessonDescription("");
    }, [])
  );

  useEffect(() => {
    if (currentPage === "1" || currentPage === "2" || currentPage === "3") {
      if (currentPage === "1") {
        const tmp1 = lessonData[lessonData.length - 1];
        if (currentLanguage === "zh") {
          setCurrentTrainName(tmp1.flight_phase);
          setCategoryInfo(tmp1.lessons[0].description);
        } else {
          setCurrentTrainName(tmp1.flight_phase_en);
          setCategoryInfo(tmp1.lessons[0].description_en);
        }
        setSelectedLessonName("");
        setSelectedLessonId(tmp1.lessons[0].lesson_id);
        setSelectedLessonType(tmp1.lessons[0].lesson_type);
      } else if (currentPage === "2") {
        const tmp2 = lessonData[lessonData.length - 3];
        if (currentLanguage === "zh") {
          setCurrentTrainName(tmp2.flight_phase);
          setCategoryInfo(tmp2.lessons[0].description);
        } else {
          setCurrentTrainName(tmp2.flight_phase_en);
          setCategoryInfo(tmp2.lessons[0].description_en);
        }
        setSelectedLessonName("");
        setSelectedLessonId(tmp2.lessons[0].lesson_id);
        setSelectedLessonType(tmp2.lessons[0].lesson_type);
      } else {
        const tmp3 = lessonData[lessonData.length - 2];
        if (currentLanguage === "zh") {
          setCurrentTrainName(tmp3.flight_phase);
          setCategoryInfo(tmp3.lessons[0].description);
        } else {
          setCurrentTrainName(tmp3.flight_phase_en);
          setCategoryInfo(tmp3.lessons[0].description_en);
        }
        setSelectedLessonName("");
        setSelectedLessonId(tmp3.lessons[0].lesson_id);
        setSelectedLessonType(tmp3.lessons[0].lesson_type);
      }
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [currentPage]);

  useEffect(() => {
    if (!lessonData) return;
    try {
      let newData = [...data];
      let lastId =
        newData.length > 0 ? parseInt(newData[newData.length - 1].id, 10) : 0;

      //将科目化注释掉
      lessonData.slice(0, lessonData.length - 3).forEach((phase) => {
        lastId += 1;
        newData.push({
          id: lastId.toString(),
          name_zh: phase.flight_phase,
          name_en: phase.flight_phase_en,
        });
      });
      setUpdatedData(newData);
      console.log("lessonData", lessonData);
    } catch (error) {
      console.log("Error parsing JSON data:", error);
      flashShow(error);
    }
  }, [lessonData]);

  const handleCategorySelect = (flightPhaseEn) => {
    setLessonDescription("");
    const selectedPhase = lessonData.find(
      (phase) => phase.flight_phase_en === flightPhaseEn
    );
    if (selectedPhase) {
      if (currentLanguage === "zh") {
        setCurrentTrainName(selectedPhase.flight_phase);
      } else {
        setCurrentTrainName(selectedPhase.flight_phase_en);
      }
      setFilteredLessons(selectedPhase.lessons);
    } else {
      setFilteredLessons([]);
    }
  };

  const handleLessonSelect = (lessonName) => {
    const selectedLesson = lessonData
      .find(
        (item) =>
          item.flight_phase === currentTrainName ||
          item.flight_phase_en === currentTrainName
      )
      ?.lessons.find(
        (item) =>
          item.lesson_name === lessonName || item.lesson_name_en === lessonName
      );
    if (selectedLesson) {
      setSelectedLessonId(selectedLesson.lesson_id);
      setSelectedLessonName(lessonName);
      setSelectedLessonType(selectedLesson.lesson_type);
      setDisable(false);
    } else {
      console.log("未找到课程:", lessonName);
      flashShow("error" + lessonName);
    }
  };

  const handleLessonDescription = (description) => {
    setLessonDescription(description);
  };

  const renderButton = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.button,
        currentPage === item.id ? styles.selectedButton : null,
      ]}
      onPress={() => {
        setCurrentPage(item.id);
        setSelectedLessonName("");
        const pageOffset = parseInt(item.id) - 4;
        const phase = lessonData[pageOffset];

        if (phase) {
          setCurrentTrainName(phase.flight_phase);
          handleCategorySelect(phase.flight_phase_en);
          setDisable(true);
        } else {
          setCurrentTrainName(item.name);
          setFilteredLessons([]);
        }
      }}
      disabled={trainingButtonText === i18n.t("touchScore")}
    >
      <Text
        style={[
          styles.buttonText,
          currentPage === item.id ? styles.selectText : null,
        ]}
      >
        {currentLanguage === "zh" ? item.name_zh : item.name_en}
      </Text>
    </TouchableOpacity>
  );

  const renderPage = () => {
    if (currentPage === "1") {
      return null;
    } else if (currentPage === "2") {
      return null;
    } else if (currentPage === "3") {
      return null;
    } else {
      return (
        <TakeoffStep
          trainType={currentTrainName}
          lessons={filteredLessons}
          onLessonSelect={handleLessonSelect}
          handleLessonDescription={handleLessonDescription}
          trainingButtonText={trainingButtonText}
        />
      );
    }
  };

  const startTraining = async () => {
    setDisable(false);
    setIsTraining(true);
    const targetSimulator = await getTargetSimulator();
    const session_id = await lessonStore
      .getState()
      .startTrain(selectedLessonId, targetSimulator);
    if (session_id !== "error") {
      setSessionId(session_id);
      setTrainingButtonText(i18n.t("endTrain"));
    }
  };

  const closeModal = async () => {
    if (trainingButtonText === i18n.t("endTrain")) {
      setIsend(true);
      setDisable(true);
    }
  };

  const showModal = async () => {
    if (trainingButtonText === i18n.t("touchScore")) {
      const currentScore = await lessonStore.getState().currentScore;
      if (currentScore && currentScore.hasOwnProperty("segments")) {
        console.log("hasSegments:", currentScore);
        navigation.navigate("AssementScreenTab", {
          currentLesson: {
            currentTrainName,
            selectedLessonName,
          },
          currentScore: currentScore,
        });
      } else {
        console.log("hasNoSegments:", currentScore);
        navigation.navigate("AssementScreen", {
          trainScore: currentScore,
          currentLesson: {
            currentTrainName,
            selectedLessonName,
          },
        });
        setTrainingButtonText(i18n.t("startTrain"));
      }
    } else {
      if (isTraining) {
        closeModal();
      } else {
        if (
          currentPage === "1" ||
          currentPage === "2" ||
          currentPage === "3" ||
          selectedLessonName !== ""
        ) {
          setVisible(true);
          startTraining();
        } else {
        }
      }
    }
  };
  useEffect(() => {
    const checkAndNavigate = async () => {
      const currentScore = await lessonStore.getState().currentScore;
      if (currentScore && trainingButtonText === i18n.t("touchScore")) {
        setTimeout(async () => {
          await showModal();
        }, 1000);
      }
    };
    checkAndNavigate();
  }, [trainingButtonText]);

  const hideModal = () => setVisible(false);

  return (
    <PaperProvider>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/images/createScene.png")} // Adjust the path to where your image is located
            resizeMode="contain"
            style={{ width: 35, height: 35, marginRight: "2%" }}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: "rgb(245,245,245)",
            }}
          >
            {i18n.t("selectScene")}
          </Text>
        </View>
        <View style={{ padding: 10, flexDirection: "row" }}>
          <FlatList
            data={updatedData}
            renderItem={renderButton}
            keyExtractor={(item) => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={trainingButtonText !== i18n.t("touchScore")}
          />
        </View>
        {renderPage()}

        <ScrollView
          style={styles.introduce}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../../assets/images/intro1.png")}
              resizeMode="contain"
              style={{ width: 35, height: 35, marginRight: "1%" }}
            />
            <Text style={styles.introduceTitle}>{i18n.t("trainIntro")}</Text>
            <Image
              source={require("../../assets/images/intro2.png")}
              resizeMode="contain"
              style={{ width: 35, height: 35, marginLeft: "1%" }}
            />
          </View>
          {currentPage === "1" || currentPage === "2" || currentPage === "3" ? (
            <Text style={styles.introduceText}>{categoryInfo}</Text>
          ) : (
            <Text style={styles.introduceText}>{lessonDescription}</Text>
          )}
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {currentPage === "1" ||
            currentPage === "2" ||
            currentPage === "3" ? (
              <Image
                source={require("../../assets/images/trainIntro.png")}
                style={styles.circuitImage}
              />
            ) : (
              <></>
            )}
          </View>
        </ScrollView>
        <Portal>
          <View style={styles.footer}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 20,
              }}
            >
              <Image
                source={require("../../assets/images/currentScene.png")}
                resizeMode="contain"
                style={{ width: 35, height: 35 }}
              />
              <Text style={styles.trainInfo} key={currentPage}>
                {i18n.t("scene")}:{"  "}
                {currentPage === "1" ||
                currentPage === "2" ||
                currentPage === "3" ? (
                  <Text>{currentTrainName}</Text>
                ) : selectedLessonName === "" ? (
                  <Text>{currentTrainName}</Text>
                ) : (
                  <Text>
                    {currentTrainName} - {selectedLessonName}
                  </Text>
                )}
              </Text>
            </View>
            <View style={{ position: "absolute", left: "40%" }}>
              <TouchableOpacity
                disabled={disable}
                style={[
                  styles.trainButton,
                  {
                    backgroundColor: disable
                      ? "transparent"
                      : "rgb(245, 245, 245)",
                  },
                ]}
                onPress={showModal}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {indicator && (
                    <MaterialIndicator size={20} color="rgb(90,145,204 )" />
                  )}
                  {!disable ? (
                    <Image
                      source={require("../../assets/images/createBarStart.png")}
                      resizeMode="contain"
                      style={{ width: 35, height: 35 }}
                    />
                  ) : (
                    <Image
                      source={require("../../assets/images/trained.png")}
                      resizeMode="contain"
                      style={{ width: 35, height: 35 }}
                    />
                  )}
                  <Text
                    style={[
                      styles.startTrain,
                      { color: disable ? "grey" : "rgb(51,51,51)" },
                    ]}
                  >
                    {trainingButtonText}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Portal>
        <StartTrainingModal
          visible={visible}
          onDismiss={hideModal}
          isEnd={isEnd}
          setIsend={setIsend}
          setDisable={setDisable}
          setIsTraining={setIsTraining}
          setTrainingButtonText={setTrainingButtonText}
          setVisible={setVisible}
          selectedLessonType={selectedLessonType}
          setIndicator={setIndicator}
          sessionId={sessionId}
        />
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark,
  },
  button: {
    width: 176,
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
    backgroundColor: "rgba(35, 40, 56, 1)",
  },
  selectedButton: {
    backgroundColor: COLORS.button1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.secondary,
  },
  selectText: {
    fontWeight: "700",
    color: COLORS.buttonText,
  },
  introduce: {
    flex: 1,
    flexGrow: 1,
    padding: 20,
    paddingBottom: 120,
    marginTop: 40,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: COLORS.dark,
  },
  introduceTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: COLORS.white,
    letterSpacing: 0,
    lineHeight: 37.65,
    textAlign: "left",
    verticalAlign: "top",
  },
  introduceText: {
    fontSize: 16,
    color: COLORS.lightWhite,
    fontWeight: "400",
    textAlign: "justify",
    verticalAlign: "top",
    marginTop: 40,
    marginBottom: 60,
    lineHeight: 40,
    letterSpacing: 0,
  },
  circuitImage: {
    marginTop: -60,
    marginBottom: 120,
    width: "100%",
    resizeMode: "contain",
  },
  footer: {
    flexDirection: "row",
    backgroundColor: COLORS.gray,
    borderColor: "rgb(102,102,102)",
    borderTopWidth: 1,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    zIndex: 1000,
  },
  trainInfo: {
    width: 500,
    height: 29,
    opacity: 1,
    fontSize: 20,
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: 28.96,
    color: "rgba(230, 230, 230, 1)",
    textAlign: "left",
    verticalAlign: "top",
  },
  trainButton: {
    width: 205,
    height: 56,
    left: "100%",
    top: 10,
    borderRadius: 150,
    backgroundColor: "rgb(245, 245, 245)",
    opacity: 1,
    borderWidth: 1,
    borderColor: "rgba(230, 230, 230, 0.5)",
    padding: 10,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  startTrain: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.gray,
  },
});

export default CreateTrain;

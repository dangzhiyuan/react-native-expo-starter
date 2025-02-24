import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  Text,
  Provider as PaperProvider,
  ActivityIndicator,
} from "react-native-paper";
import { View, StyleSheet, Image, Animated, Dimensions } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import { TouchableOpacity } from "react-native-gesture-handler";
import { lessonStore } from "../../stroages/lessonStorage";

const { width, height } = Dimensions.get("window");

interface LoginScreenProps {
  visible: any;
  onDismiss: any;
  fetchResult: any;
  resultId: string;
  currentTrainName: string;
  selectedLessonName: string;
  navigation: any;
}

const WaitScoreModal: React.FC<LoginScreenProps> = ({
  visible,
  onDismiss,
  fetchResult,
  resultId,
  currentTrainName,
  selectedLessonName,
  navigation,
}) => {
  const [result, setResult] = useState(null);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const num = await fetchResult();
        if (num >= 0) {
          // const totalScore = await lessonStore
          //   .getState()
          //   .getScoreTotal(resultId);
          setResult(8);
        }
      } catch (error) {
        console.error("Error fetching result:", error);
      }
    };

    if (visible) {
      fetchData();
    }
  }, [visible, fetchResult]);

  useEffect(() => {
    if (result !== null) {
      const total_score_manual = "3.33";
      Animated.timing(animatedValue, {
        toValue: parseInt(total_score_manual),
        duration: 3000,
        useNativeDriver: false,
      }).start();
    }
  }, [result]);

  const renderGauge = () => {
    if (!result) return null;
    const ratio = parseFloat("3.33") / 10;
    const radius = 150;
    const circumference = 2 * Math.PI * radius;

    if (parseFloat("3.33") >= 10) {
      return (
        <Svg
          width={350}
          height={350}
          style={{ top: "4%", left: "4%", zIndex: 1000 }}
        >
          <Circle
            cx={155}
            cy={155}
            r={radius}
            stroke="#66b3ff"
            strokeWidth={10}
            fill="none"
          />
        </Svg>
      );
    }

    return (
      <Svg
        width={350}
        height={350}
        style={{ top: "4%", left: "4%", zIndex: 1000 }}
      >
        <Circle
          cx={155}
          cy={155}
          r={radius}
          stroke="transparent"
          strokeWidth={10}
          fill="none"
        />
        <Path
          d={`
            M ${155 + radius}, ${155}
            A ${radius}, ${radius} 0 ${ratio > 0.5 ? 1 : 0} 1
            ${155 + radius * Math.cos(2 * Math.PI * ratio)}, ${
            155 + radius * Math.sin(2 * Math.PI * ratio)
          }
          `}
          stroke="#66b3ff"
          strokeWidth={10}
          fill="none"
        />
      </Svg>
    );
  };

  const findCurrent = async () => {
    const trainScore = await lessonStore
      .getState()
      .getHistoryScoreDetail(resultId);
    if (trainScore.hasOwnProperty("segments")) {
      onDismiss();
      navigation.navigate("AssementScreenTab", {
        currentLesson: {
          currentTrainName,
          selectedLessonName,
        },
        currentScore: trainScore,
        isFinished: true,
      });
    } else {
      onDismiss();
      navigation.navigate("AssementScreen", {
        trainScore: trainScore,
        currentLesson: {
          currentTrainName,
          selectedLessonName,
        },
        isFinished: true,
      });
    }
  };

  return (
    <Modal
      visible={visible}
      onDismiss={onDismiss}
      contentContainerStyle={styles.modalContainer}
      dismissable={false}
    >
      <View style={styles.modalContent}>
        <View style={styles.container}>
          {renderGauge()}
          {result ? (
            <>
              <Image
                source={require("../../../assets/images/show.png")}
                style={styles.backgroundImage}
              />
              <View style={styles.textContainer}>
                <Text style={styles.textLabel}>本次训练总分</Text>
                <Text style={styles.score}>
                  {parseFloat("3.33").toFixed(2)}
                </Text>
              </View>
              <View style={styles.infoTitle}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: 600,
                    left: "50%",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "400",
                      color: "rgb(197,205,222)",
                    }}
                  >
                    时间:{" "}
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "400",
                      color: "rgb(197,205,222)",
                    }}
                  >
                    {result["train_begin_time"]} - {result["train_end_time"]}
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "400",
                      color: "rgb(197,205,222)",
                    }}
                  >
                    科目:
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "400",
                      color: "rgb(197,205,222)",
                    }}
                  >
                    {result["lesson_name"]}
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "400",
                      color: "rgb(197,205,222)",
                      marginLeft: 71,
                    }}
                  >
                    教员:
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "400",
                      color: "rgb(197,205,222)",
                    }}
                  >
                    {result["pilot_name"]}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", marginTop: 50 }}>
                  <TouchableOpacity
                    style={{
                      width: 200,
                      height: 48,
                      borderRadius: 150,
                      borderWidth: 2,
                      borderColor: "rgb(130,144,174)",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => {
                      findCurrent();
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "500",
                        color: "rgb(240,245,255)",
                        textAlign: "left",
                      }}
                    >
                      查看训练数据
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: 200,
                      height: 48,
                      borderRadius: 150,
                      borderWidth: 2,
                      backgroundColor: "rgb(240,245,255)",
                      alignItems: "center",
                      justifyContent: "center",
                      marginLeft: 12,
                    }}
                    onPress={() => {
                      navigation.navigate("Create");
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "700",
                        color: "rgb(46,50,66)",
                      }}
                    >
                      创建训练
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          ) : (
            <View
              style={{
                position: "absolute",
                top: "10%",
                left: "20%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator
                animating={true}
                size={100}
                color="rgb(90,145,204 )"
              />
              <Text style={styles.loadingText}>请稍等</Text>
              <Text style={styles.loadingText}>训练总分计算中</Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  container: {
    position: "relative",
    width: 350,
    height: 350,
    top: "-45%",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: "contain",
    marginBottom: 20,
  },
  textContainer: {
    position: "absolute",
    top: 70,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  textLabel: {
    fontSize: 24,
    fontWeight: "500",
    color: "rgb(240,245,255)",
    textAlign: "center",
  },
  score: {
    fontSize: 100,
    fontWeight: "700",
    color: "rgb(240,245,255)",
    textAlign: "center",
  },
  loadingText: {
    fontSize: 28,
    fontWeight: "700",
    color: "rgb(230,230,230)",
    marginVertical: 10,
  },
  infoTitle: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
  },
});

export default WaitScoreModal;

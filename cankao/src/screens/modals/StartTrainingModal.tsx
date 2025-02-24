import React, { useEffect, useState, useRef } from "react";
import { Icon, Modal, Text } from "react-native-paper";
import { BarIndicator } from "react-native-indicators";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import i18n from "../../locales";
import { lessonStore } from "../../stroages/lessonStorage";
import { FlashList } from "@shopify/flash-list";
import { formatTime } from "../BigDataSolution/tools";
import { getTargetSimulator } from "../../utils/util";

const StartTrainingModal = ({
  visible,
  onDismiss,
  isEnd,
  setIsend,
  setDisable,
  setIsTraining,
  setTrainingButtonText,
  setVisible,
  selectedLessonType,
  setIndicator,
  sessionId,
}) => {
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState("0:00");
  const [runStatus, setRunStatus] = useState(1);

  const flatListRef = useRef(null);

  const data1 = [
    { time: "00:00", level: "1", ref_view: "1", value: "1", result: "1" },
    { time: "00:00", level: "1", ref_view: "1", value: "1", result: "1" },
    { time: "00:00", level: "1", ref_view: "1", value: "1", result: "1" },
    { time: "00:00", level: "1", ref_view: "1", value: "1", result: "1" },
    { time: "00:00", level: "1", ref_view: "1", value: "1", result: "1" },
    { time: "00:00", level: "1", ref_view: "1", value: "1", result: "1" },
    { time: "00:00", level: "1", ref_view: "1", value: "1", result: "1" },
    { time: "00:00", level: "1", ref_view: "1", value: "1", result: "1" },
    { time: "00:00", level: "WARNING", ref_view: "1", value: "1", result: "1" },
    { time: "00:00", level: "1", ref_view: "1", value: "1", result: "1" },
    { time: "00:00", level: "1", ref_view: "1", value: "1", result: "1" },
    { time: "00:00", level: "1", ref_view: "1", value: "1", result: "1" },
    { time: "00:00", level: "1", ref_view: "1", value: "1", result: "1" },
    { time: "00:00", level: "1", ref_view: "1", value: "1", result: "1" },
    { time: "00:00", level: "CAUTION", ref_view: "1", value: "1", result: "1" },
    { time: "00:00", level: "1", ref_view: "1", value: "1", result: "1" },
    { time: "00:00", level: "1", ref_view: "1", value: "1", result: "1" },
    { time: "00:00", level: "1", ref_view: "1", value: "1", result: "1" },
    { time: "00:00", level: "1", ref_view: "1", value: "1", result: "1" },
    { time: "00:00", level: "1", ref_view: "1", value: "1", result: "1" },
    { time: "00:00", level: "1", ref_view: "1", value: "1", result: "1" },
    { time: "00:00", level: "1", ref_view: "1", value: "1", result: "1" },
    { time: "00:00", level: "1", ref_view: "1", value: "1", result: "1" },
  ];

  useEffect(() => {
    if (visible) {
      setStartTime(new Date());
    }
  }, [visible]);

  const renderItem = ({ item, index }) => (
    <View style={styles.row}>
      <View style={{ width: 50 }}>
        <Text style={styles.text}>{index + 1}</Text>
      </View>
      <View style={{ width: 120 }}>
        <Text style={[styles.text, { marginLeft: 10 }]}>
          {formatTime(item.time)}
        </Text>
      </View>
      <View style={{ width: 120 }}>
        <Text style={[styles.text, { marginLeft: 10 }]}>{item.type}</Text>
      </View>
      <View style={{ width: 130 }}>
        <Text
          style={[
            styles.text,
            {
              color:
                item.level === "WARNING"
                  ? "rgb(247,47,80)"
                  : item.level === "CAUTION"
                  ? "yellow"
                  : "white",
            },
          ]}
        >
          {item.level}
        </Text>
      </View>
      <View style={{ width: 0 }}>
        <Text style={styles.text}>{item.ref_view}</Text>
      </View>
      <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
        <Text style={[styles.text, { fontSize: 15, marginLeft: 5 }]}>
          {item.value}
        </Text>
      </View>
      {item.result !== undefined && item.result !== null && (
        <View style={{ width: 0 }}>
          <Text style={styles.text}>{item.result}</Text>
        </View>
      )}
    </View>
  );

  useEffect(() => {
    let interval;
    if (startTime) {
      interval = setInterval(() => {
        const now = new Date();
        const diff = Math.floor((now.getTime() - startTime.getTime()) / 1000);
        const minutes = Math.floor(diff / 60);
        const seconds = diff % 60;
        setElapsedTime(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [startTime]);

  useEffect(() => {
    let interval;
    if (visible) {
      interval = setInterval(async () => {
        try {
          const newEvents = await lessonStore
            .getState()
            .getRealTimeEvents(sessionId.data);
          console.log(newEvents);

          if (newEvents) {
            if (newEvents["repo"] && newEvents["repo"].length > 0) {
              setData([]);
            } else {
              const allEvents = [
                ...(Array.isArray(newEvents["alert"])
                  ? newEvents["alert"].map((event) => ({
                      ...event,
                      type: "alert",
                    }))
                  : []),
                ...(Array.isArray(newEvents["exceedance"])
                  ? newEvents["exceedance"].map((event) => ({
                      ...event,
                      type: "exceedance",
                    }))
                  : []),
                ...(Array.isArray(newEvents["malf"])
                  ? newEvents["malf"].map((event) => ({
                      ...event,
                      type: "malf",
                    }))
                  : []),
              ];

              if (allEvents.length > 0) {
                setData((prevData) => {
                  const updatedData = [...prevData, ...allEvents];
                  setTimeout(() => flatListRef.current?.scrollToEnd(), 100);
                  return updatedData;
                });
                console.log(data);
              }
            }
          } else {
            setErrorMessage("Received null or undefined newEvents");
          }
        } catch (error) {
          setErrorMessage(error.message);
        }
      }, 1000);
    } else {
      setData([]);
    }

    return () => clearInterval(interval);
  }, [visible, sessionId]);

  useEffect(() => {
    let interval;
    if (visible) {
      interval = setInterval(async () => {
        try {
          const info = await lessonStore
            .getState()
            .getRealTimeInfo(sessionId.data);
          console.log(info);
          if (info) {
            setRunStatus(parseInt(info));
          } else {
            setErrorMessage("Received null or undefined run status");
          }
        } catch (error) {
          setErrorMessage(error.message);
        }
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setRunStatus(1);
    }
    return () => clearInterval(interval);
  }, [visible, sessionId]);

  return (
    <Modal
      visible={visible}
      onDismiss={onDismiss}
      contentContainerStyle={styles.modalContainer}
      dismissable={false}
    >
      {!isEnd ? (
        <View style={styles.modalContent}>
          <Image
            source={require("../../../assets/images/trainning.png")}
            style={styles.image}
          />
          <BarIndicator color="white" size={50} style={styles.indicator} />
          <Text style={styles.modalTitle}>{i18n.t("trainingmodal1")}</Text>
          <Text style={styles.modalTitleSecond}>
            {i18n.t("trainingmodal2")}
          </Text>
          <Text style={styles.elapsedTime}>{`训练时间: ${elapsedTime}`}</Text>
          <View style={styles.runInfo}>
            <View
              style={[
                styles.runInfoLight,
                {
                  backgroundColor:
                    runStatus === 1
                      ? "grey"
                      : runStatus === 2
                      ? "rgb(247,47,80)"
                      : "green",
                },
              ]}
            ></View>
            <Text style={styles.text}>
              {runStatus === 1
                ? "未开始"
                : runStatus === 2
                ? "等待"
                : runStatus === 3
                ? "正在训练"
                : ""}
            </Text>
          </View>
          <View
            style={[
              styles.listContainer,
              { borderColor: data1.length > 0 ? "grey" : "transparent" },
            ]}
          >
            {data && (
              // <View
              //   style={{
              //     minHeight: 100,
              //     height: 200,
              //     width: Dimensions.get("screen").width,
              //     alignItems: "center",
              //     justifyContent: "center",
              //   }}
              // >
              <View
                style={{
                  flex: 1,
                  width: "100%",
                  height: "100%",
                }}
              >
                <FlashList
                  ref={flatListRef}
                  data={data}
                  renderItem={renderItem}
                  showsVerticalScrollIndicator={true}
                  contentInsetAdjustmentBehavior="always"
                  keyExtractor={(item, index) => index.toString()}
                  estimatedItemSize={20}
                />
              </View>
            )}
          </View>
        </View>
      ) : (
        <View style={styles.modalContent}>
          <Image
            source={require("../../../assets/images/trainning.png")}
            style={styles.image}
          />
          <Text style={styles.endText}>{i18n.t("trainingmodal3")}</Text>
          <Text style={styles.endDescription}>{i18n.t("trainingmodal4")}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={async () => {
                const targetSimulator = await getTargetSimulator();
                setIsend(false);
                const currentSessionId =
                  lessonStore.getState().currentSessionId;
                let sessionId = null;
                if (currentSessionId) {
                  sessionId = currentSessionId["data"];
                }
                setIsTraining(false);
                setIndicator(true);

                setVisible(false);
                if (sessionId !== null) {
                  if (selectedLessonType === 1) {
                    await lessonStore
                      .getState()
                      .stopTrainAuto(sessionId, targetSimulator);
                    if (lessonStore.getState().currentScore) {
                      setDisable(false);
                      setTrainingButtonText(i18n.t("touchScore"));
                    }
                  } else {
                    await lessonStore
                      .getState()
                      .stopTrainFixed(sessionId, targetSimulator);
                    if (
                      lessonStore.getState().currentScore ||
                      lessonStore.getState().message
                    ) {
                      setDisable(false);
                      setTrainingButtonText(i18n.t("touchScore"));
                    }
                  }
                } else {
                  console.error("Invalid sessionId, unable to stop training.");
                }
              }}
            >
              <Text style={styles.confirmButtonText}>{i18n.t("makesure")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setIsend(false);
                setDisable(false);
              }}
            >
              <Text style={styles.cancelButtonText}>{i18n.t("cancel")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 1)",
  },
  modalContent: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "40%",
    height: "40%",
    resizeMode: "contain",
    position: "absolute",
    top: "-15%",
  },
  indicator: {
    position: "absolute",
    top: "10%",
  },
  modalTitle: {
    position: "absolute",
    fontSize: 28,
    fontWeight: "700",
    color: "rgb(230,230,230)",
    top: "15%",
  },
  modalTitleSecond: {
    fontSize: 28,
    position: "absolute",
    fontWeight: "700",
    top: "20%",
    color: "rgb(230,230,230)",
  },
  elapsedTime: {
    position: "absolute",
    fontSize: 20,
    fontWeight: "400",
    top: "25%",
    color: "rgb(230,230,230)",
    marginTop: 10,
  },
  runInfo: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    fontWeight: "400",
    top: "25%",
    left: "75%",
    marginTop: 10,
  },
  runInfoLight: {
    width: 30,
    height: 30,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "transparent",
    marginRight: 20,
  },
  listContainer: {
    flex: 1,
    position: "absolute",
    top: "30%",
    // left: "42%",
    width: "100%",
    height: "60%",
    // alignItems: "center",
    // justifyContent: "center",
    borderRadius: 2,
    borderWidth: 1,
    marginBottom: 10,
  },
  flashListContent: {
    paddingBottom: 20,
  },
  row: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "rgb(230,230,230,0.5)",
  },
  text: {
    fontSize: 20,
    fontWeight: "400",
    color: "rgb(230,230,230)",
    marginLeft: 20,
  },
  endText: {
    position: "absolute",
    fontSize: 24,
    fontWeight: "700",
    top: "15%",
    color: "rgba(240, 245, 255, 1)",
    marginTop: 10,
    textAlign: "center",
  },
  endDescription: {
    position: "absolute",
    top: "20%",
    maxWidth: 500,
    fontSize: 20,
    fontWeight: "400",
    color: "rgba(240, 245, 255, 1)",
    textAlign: "left",
  },
  buttonContainer: {
    position: "absolute",
    flexDirection: "row",
    marginTop: 50,
    top: "25%",
  },
  confirmButton: {
    width: 200,
    height: 48,
    borderRadius: 150,
    borderWidth: 2,
    borderColor: "rgb(130,144,174)",
    alignItems: "center",
    justifyContent: "center",
  },
  confirmButtonText: {
    position: "absolute",
    top: "10%",
    fontSize: 20,
    fontWeight: "500",
    color: "rgb(240,245,255)",
    textAlign: "left",
  },
  cancelButton: {
    width: 200,
    height: 48,
    borderRadius: 150,
    borderWidth: 2,
    backgroundColor: "rgb(240,245,255)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },
  cancelButtonText: {
    fontSize: 20,
    fontWeight: "700",
    color: "rgb(46,50,66)",
  },
});

export default StartTrainingModal;

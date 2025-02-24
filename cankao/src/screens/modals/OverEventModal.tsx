import React, { useState, useRef } from "react";
import { Modal, Text } from "react-native-paper";
import {
  View,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { formatTime } from "../BigDataSolution/tools";

const { width, height } = Dimensions.get("window");

const OverEventModal = ({ visible, onDismiss, modalInfo }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    Animated.timing(animation, {
      toValue: isFullScreen ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setIsFullScreen(!isFullScreen);
    });
  };

  const handleClose = () => {
    animation.setValue(0);
    setIsFullScreen(false);
    onDismiss();
  };

  const modalHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [400, height * 0.45],
  });

  const modalWidth = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [400, width * 0.93],
  });

  if (!modalInfo) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      onDismiss={handleClose}
      contentContainerStyle={styles.modalContainer}
      dismissable={true}
    >
      <TouchableWithoutFeedback onPress={handlePress}>
        <Animated.View
          style={[
            styles.modalContent,
            { width: modalWidth, height: modalHeight },
          ]}
        >
          <View style={styles.innerContainer}>
            <Text style={styles.title}>事件描述</Text>
            <ScrollView style={styles.scrollViewStyle}>
              <View
                style={{
                  flexDirection: isFullScreen ? "row" : "column",
                  flexWrap: "wrap",
                }}
              >
                {modalInfo.map((info, index) => (
                  <View
                    key={index}
                    style={[
                      styles.infoContainer,
                      { width: isFullScreen ? "50%" : "100%" },
                    ]}
                  >
                    <Text style={styles.infoHeader}>
                      {formatTime(info.time)} {info.source}
                    </Text>
                    <Text style={styles.infoDetails}>
                      {info.result
                        ? `${info.value}: ${info.result}`
                        : info.value}
                    </Text>
                    <Text style={styles.infoSubDetails}>{info.value_en}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>
            <TouchableOpacity style={styles.closeBtn} onPress={handleClose}>
              <Text style={styles.closeText}>知道了</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    top: "-20%",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    top: "0%",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
  },
  innerContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(35, 40, 56, 1)",
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "rgba(90, 145, 204, 1)",
    textAlign: "left",
    position: "absolute",
    left: 20,
    top: 20,
  },
  scrollViewStyle: {
    marginTop: 60,
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  infoContainer: {
    marginBottom: 5,
  },
  infoHeader: {
    fontSize: 16,
    fontWeight: "400",
    color: "rgb(240,245,255)",
  },
  infoDetails: {
    fontSize: 16,
    fontWeight: "400",
    color: "rgb(240,245,255)",
  },
  infoSubDetails: {
    fontSize: 14,
    fontWeight: "400",
    color: "rgb(197,205,222)",
    flexWrap: "wrap",
    flexShrink: 1,
    width: "90%",
  },
  closeBtn: {
    height: 48,
    width: "50%",
    left: "25%",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "rgb(240,245,255)",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  closeText: {
    fontSize: 18,
    fontWeight: "700",
    color: "rgba(46, 50, 66, 1)",
  },
});

export default OverEventModal;

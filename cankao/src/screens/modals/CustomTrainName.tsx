import React, { useState } from "react";
import {
  Modal,
  Portal,
  Text,
  Provider as PaperProvider,
} from "react-native-paper";
import { View, StyleSheet, Image, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { lessonStore } from "../../stroages/lessonStorage";

interface LoginScreenProps {
  visible: any;
  onDismiss: any;
  selectItem: any;
  setChangeName: any;
  navigation: any;
}

const CustomTrainName: React.FC<LoginScreenProps> = ({
  visible,
  onDismiss,
  selectItem,
  setChangeName,
  navigation,
}) => {
  const [anotherName, setAnotherName] = useState(null);
  const handleSave = async () => {
    setChangeName(false);
    const result = await lessonStore
      .getState()
      .setLessonName(selectItem.result_id, anotherName);
    if (result) {
      setChangeName(true);
      console.log("自定义名字", anotherName);
    }
    onDismiss();
  };

  return (
    <Modal
      visible={visible}
      onDismiss={onDismiss}
      contentContainerStyle={styles.modalContainer}
      dismissable={false}
    >
      <View style={styles.modalContent}>
        <View
          style={{
            width: 536,
            height: 302,
            backgroundColor: "rgba(35, 40, 56, 1)",
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              fontSize: 26,
              fontWeight: "700",
              color: " rgba(90, 145, 204, 1)",
              textAlign: "left",
              verticalAlign: "top",
              left: 40,
              top: 40,
            }}
          >
            备注
          </Text>
          <View style={{ position: "relative", width: "100%", height: "100%" }}>
            <TextInput
              style={styles.input}
              onChangeText={setAnotherName}
              value={anotherName}
              keyboardType="default"
              placeholder="请输入备注内容"
              placeholderTextColor="rgba(130, 144, 174, 1)"
              selectionColor={"white"}
            />
          </View>
          <View
            style={{
              position: "absolute",
              flexDirection: "row",
              top: "70%",
              left: "7%",
            }}
          >
            <TouchableOpacity
              style={{
                width: 220,
                height: 48,
                borderRadius: 150,
                borderWidth: 2,
                borderColor: "rgb(130,144,174)",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => onDismiss()}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "700",
                  color: "rgb(240,245,255)",
                  textAlign: "left",
                }}
              >
                取消
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 220,
                height: 48,
                borderRadius: 150,
                borderWidth: 2,
                backgroundColor: "rgb(240,245,255)",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 12,
              }}
              onPress={() => {
                handleSave();
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "700",
                  color: "rgba(46,50,66,1)",
                }}
              >
                保存
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    top: "0%",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    position: "relative",
    top: "25%",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    width: "100%",
    height: "100%",
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
    marginTop: 200,
  },
  input: {
    position: "absolute",
    top: "22%",
    left: "7%",
    borderColor: "rgb(51,51,51)",
    backgroundColor: "rgba(25, 29, 40, 1)",
    paddingLeft: 20,
    borderRadius: 10,
    fontSize: 18,
    fontWeight: "700",
    color: "rgba(197, 205, 222, 1)",
    width: 456,
    height: 56,
    textAlign: "left",
    borderWidth: 1,
  },
});

export default CustomTrainName;

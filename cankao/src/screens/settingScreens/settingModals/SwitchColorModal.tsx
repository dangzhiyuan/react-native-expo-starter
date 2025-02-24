import * as React from "react";
import {
  Modal,
  Portal,
  Text,
  Provider as PaperProvider,
  Divider,
} from "react-native-paper";
import { ScrollView, TouchableOpacity, View } from "react-native";
import Header from "../../../components/uiComponent/Header";
import { COLORS } from "../theme";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import * as SecureStore from "expo-secure-store";

const themeData = [
  {
    text: "默认",
    color: "#1677ff",
  },
  {
    text: "红色",
    color: "#F44336",
  },
  {
    text: "品红",
    color: "#E91E63",
  },
  {
    text: "紫色",
    color: "#9C27B0",
  },
  {
    text: "深紫色",
    color: "#673AB7",
  },
  {
    text: "靛蓝色",
    color: "#3F51B5",
  },
  {
    text: "蓝色",
    color: "#2196F3",
  },
  {
    text: "浅蓝色",
    color: "#03A9F4",
  },
  {
    text: "青色",
    color: "#00BCD4",
  },
  {
    text: "蓝绿色",
    color: "#009688",
  },
  {
    text: "绿色",
    color: "#4CAF50",
  },
  {
    text: "浅绿色",
    color: "#8BC34A",
  },
  {
    text: "石灰色",
    color: "#CDDC39",
  },
  {
    text: "黄色",
    color: "#FFEB3B",
  },
  {
    text: "琥珀色",
    color: "#FFC107",
  },
  {
    text: "橙色",
    color: "#FF9800",
  },
  {
    text: "橘色",
    color: "#FF5722",
  },
  {
    text: "棕色",
    color: "#795548",
  },
  {
    text: "灰色",
    color: "#9E9E9E",
  },
  {
    text: "蓝灰色",
    color: "#607D8B",
  },
  {
    text: "黑色",
    color: "#000000",
  },
];

const SwitchColorModal = ({ openModal, setOpenModal }) => {
  const hideModal = () => setOpenModal(false);
  const [backgroundColor, setBackgroundColor] = useContext(ThemeContext);

  const handleThemePress = (theme) => {
    console.log("Pressed", theme.text);
    setBackgroundColor(theme.color);
    saveThemeConfig(theme.color);
  };

  const saveThemeConfig = async (color) => {
    try {
      await SecureStore.setItemAsync("backgroundColor", color);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Portal>
      <Modal
        visible={openModal}
        onDismiss={hideModal}
        contentContainerStyle={{
          backgroundColor: "white",
          width: "38%",
          height: "70%",
          alignSelf: "center",
          justifyContent: "center",
          padding: 15,
          borderRadius: 10,
        }}
      >
        <ScrollView>
          <Header>主题风格</Header>
          <View style={{ flexDirection: "column", flexWrap: "wrap" }}>
            {themeData.map((theme, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleThemePress(theme)}
                style={{ marginVertical: 10, width: 400 }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 15,
                      backgroundColor: theme.color,
                      marginRight: 20,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  ></View>
                  <Text>{theme.text}</Text>
                </View>
                <Divider
                  style={{
                    marginTop: 5,
                    height: 1,
                    backgroundColor: COLORS.secondaryGray,
                  }}
                />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </Modal>
    </Portal>
  );
};

export default SwitchColorModal;

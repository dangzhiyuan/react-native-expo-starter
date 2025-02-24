import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  StatusBar,
  SafeAreaView,
  Dimensions,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { lessonStore } from "../stroages/lessonStorage";
import { userStore } from "../stroages/userStorage";
import { useLanguage } from "../utils/LanguageContext";
import i18n from "../locales";
import { flashShow } from "../utils/FlashMessage";
import { COLORS } from "../themes/themes";
import { Modal } from "react-native-paper";
import version from "../../version";
import { getTargetSimulator } from "../utils/util";

const appVersion = `${version.major}.${version.minor}.${version.commitCount}`;

const { width, height } = Dimensions.get("window");
interface LoginScreenProps {
  navigation: any;
}

const Main: React.FC<LoginScreenProps> = ({ navigation }) => {
  const u = userStore();
  const { currentLanguage, toggleLanguage } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [targetSimulator, setTargetSimulator] = useState("1");
  useEffect(() => {
    const fetchTargetSimulator = async () => {
      const simulator = await getTargetSimulator();
      setTargetSimulator(simulator);
    };
    fetchTargetSimulator();
  }, []);

  const CreateTraining = async () => {
    await lessonStore.getState().getAllLessons();
    const lessonData = await lessonStore.getState().lessonData;
    const message = await lessonStore.getState().message;
    if (lessonData) {
      navigation.navigate("Create");
    } else {
      flashShow("读取课程信息失败");
    }
  };
  const history = () => {
    navigation.navigate("History");
  };

  const handleFabPress = () => {
    setModalVisible(true);
  };

  const handleModalSubmit = async () => {
    setIsLoading(true);
    setModalVisible(false);

    try {
      const currentScore = await lessonStore
        .getState()
        .getOfflineData(parseInt(inputValue), parseInt(targetSimulator));

      if (currentScore) {
        if (currentScore.hasOwnProperty("segments")) {
          navigation.navigate("AssementScreenTab", {
            currentLesson: {
              currentTrainName: "test",
              selectedLessonName: "test",
            },
            currentScore: currentScore,
          });
        } else {
          navigation.navigate("AssementScreen", {
            trainScore: currentScore,
            currentLesson: {
              currentTrainName: "test",
              selectedLessonName: "test",
            },
          });
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <Image
        source={require("../../assets/images/mainBack.png")}
        resizeMode="contain"
        style={{ position: "absolute" }}
      />
      <View
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <View style={styles.LogoContainer}>
          <Image
            source={require("../../assets/images/logomin.png")}
            resizeMode="contain"
            style={styles.LogoImage}
          />
          <View style={styles.user}>
            <View style={styles.avatar}>
              <Image
                source={require("../../assets/images/icon2.png")}
                style={{ width: "100%", height: "100%", resizeMode: "contain" }}
              />
            </View>
            <View style={styles.header}>
              <Text style={styles.title}>
                {i18n.t("hello")}
                {userStore.getState().loginInfo}
                {"\n"}
                <Text style={styles.subtitle}>{i18n.t("helloInfo")}</Text>
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button1, { marginRight: 30 }]}
            onPress={CreateTraining}
          >
            <ImageBackground
              source={require("../../assets/images/mainCreate.png")}
              style={{ width: "100%", height: "100%" }}
              resizeMode="contain"
            >
              <Text style={styles.buttonText}>{i18n.t("createTrain")}</Text>
              <Image
                source={require("../../assets/images/intro.png")}
                resizeMode="contain"
                style={styles.buttonLogo}
              />
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button2} onPress={history}>
            <ImageBackground
              source={require("../../assets/images/mainHistory.png")}
              style={{ width: "100%", height: "100%" }}
              resizeMode="contain"
            >
              <Text style={styles.buttonText}>{i18n.t("History")}</Text>
              <Image
                source={require("../../assets/images/intro.png")} // Adjust the path to where your image is located
                resizeMode="contain"
                style={styles.buttonLogo}
              />
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <Text style={styles.settingText}>{i18n.t("setting")}</Text>
        <View style={styles.settingsContainer}>
          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.footerItem, styles.borderBottom]}
              onPress={toggleLanguage}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image source={require("../../assets/images/language.png")} />
                <Text
                  style={{
                    color: "rgba(197, 205, 222, 1)",
                    fontSize: 24,
                    fontWeight: "500",
                    marginLeft: 10,
                  }}
                >
                  {i18n.t("language")}
                </Text>
              </View>
              <Text
                style={{
                  color: "rgba(197, 205, 222, 1)",
                  fontSize: 24,
                  fontWeight: "500",
                }}
              >
                {">"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.footerItem, styles.borderBottom]}
              onPress={() => u.logout()}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image source={require("../../assets/images/account.png")} />
                <Text
                  style={{
                    color: "rgba(197, 205, 222, 1)",
                    fontSize: 24,
                    fontWeight: "500",
                    marginLeft: 10,
                  }}
                >
                  {i18n.t("account")}
                </Text>
              </View>
              <Text
                style={{
                  color: "rgba(197, 205, 222, 1)",
                  fontSize: 24,
                  fontWeight: "500",
                }}
              >
                {">"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerItem}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image source={require("../../assets/images/version.png")} />
                <Text
                  style={{
                    color: "rgba(197, 205, 222, 1)",
                    fontSize: 24,
                    fontWeight: "500",
                    marginLeft: 10,
                  }}
                >
                  {i18n.t("version")}
                </Text>
              </View>
              <Text
                style={{
                  color: "rgba(130, 144, 174, 1)",
                  fontSize: 24,
                  fontWeight: "400",
                }}
              >
                v{appVersion}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{ flex: 1, position: "absolute", top: "80%" }}>
        {isLoading && (
          <ActivityIndicator size="large" color="rgba(130, 144, 174, 1)" />
        )}
      </View>
      <TouchableOpacity style={styles.fab} onPress={handleFabPress}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        onDismiss={() => {
          setModalVisible(false);
        }}
        dismissable={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Enter session id and simulator
            </Text>
            <TextInput
              style={styles.modalInput}
              keyboardType="numeric"
              selectionColor={COLORS.primary}
              placeholder="Enter session id"
              onChangeText={(text) => setInputValue(text)}
              placeholderTextColor="rgba(130, 144, 174, 1)"
              value={inputValue}
            />
            <TextInput
              style={styles.modalInput}
              keyboardType="numeric"
              selectionColor={COLORS.primary}
              placeholder="Enter target simulator"
              onChangeText={(text) => setTargetSimulator(text)}
              placeholderTextColor="rgba(130, 144, 174, 1)"
              value={targetSimulator}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleModalSubmit}
              disabled={isLoading}
            >
              <Text style={styles.modalButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.dark,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "relative",
    top: 0,
    left: 0,
  },
  user: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    top: height * 0.05,
  },
  LogoContainer: {
    top: height * -0.05,
    left: width * -0.25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: height * 0.03,
  },
  LogoImage: {
    top: height * 0.03,
    left: width * -0.1,
    width: width * 0.2,
    height: height * 0.1,
  },
  buttonsContainer: {
    flexDirection: "row",
    width: width * 0.9,
    justifyContent: "space-evenly",
    marginBottom: height * 0.05,
    marginLeft: width * 0.05,
    marginRight: width * 0.05,
  },
  buttonLogo: { width: 35, height: 35, top: "30%", left: "5%" },
  settingsContainer: {
    width: "100%",
    padding: 10,
    borderRadius: 20,
  },
  header: {
    left: width * -0.01,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 25,
    marginRight: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.white,
  },
  subtitle: {
    fontSize: 12,
    lineHeight: 24,
    fontWeight: "400",
    color: COLORS.subtitle,
  },
  button1: {
    width: "50%",
    height: 180,
    borderRadius: 20,
    backgroundColor: COLORS.button1,
    paddingTop: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button2: {
    width: "50%",
    height: 180,
    borderRadius: 20,
    backgroundColor: COLORS.button2,
    paddingTop: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.buttonText,
    marginLeft: 15,
  },
  settingText: {
    left: width * 0.05,
    opacity: 1,
    fontSize: 20,
    fontWeight: "500",
    lineHeight: 28.96,
    color: COLORS.secondary,
  },
  footer: {
    margin: width * 0.02,
    marginTop: 20,
    backgroundColor: COLORS.background,
    padding: 10,
    borderRadius: 20,
    height: 273,
  },
  footerItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    height: 91,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
  },
  fab: {
    position: "absolute",
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30,
    backgroundColor: COLORS.gray,
    borderRadius: 30,
    elevation: 8,
  },
  fabText: {
    fontSize: 24,
    color: "white",
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  modalContent: {
    width: 300,
    backgroundColor: "rgba(35, 40, 56, 1)",
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: " rgba(90, 145, 204, 1)",
    textAlign: "left",
    verticalAlign: "top",
    marginBottom: 10,
  },
  modalInput: {
    width: "100%",
    height: 40,
    color: COLORS.primary,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  modalButton: {
    borderRadius: 150,
    borderWidth: 2,
    backgroundColor: "rgb(240,245,255)",
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  modalButtonText: {
    fontSize: 20,
    fontWeight: "700",
    color: "rgba(46,50,66,1)",
  },
});

export default Main;

import React, { useEffect, useState, useSyncExternalStore } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  StatusBar,
  Alert,
} from "react-native";
import { Dimensions } from "react-native";
import Background from "../components/uiComponent/Background";
import Header from "../components/uiComponent/Header";
import Button from "../components/uiComponent/Button";
import { passwordValidator } from "../helper/passwordValidator";
import { licenseValidator } from "../helper/licenseValidator";
import { userStore } from "../stroages/userStorage";
import { lessonStore } from "../stroages/lessonStorage";
import TextInput from "../components/uiComponent/TextInput";
import { TextInput as TI, MD3Colors, Checkbox } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import i18n from "../locales";
import { useLanguage } from "../utils/LanguageContext";
import * as SecureStore from "expo-secure-store";
import { flashShow } from "../utils/FlashMessage";
import { COLORS } from "../themes/themes";

interface LoginScreenProps {
  navigation: any;
}
const { width, height } = Dimensions.get("window");

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  useLanguage(); // 这会在语言变化时动态渲染
  const [license, setLicense] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [showUrlInput, setShowUrlInput] = useState(false); // State to control URL input visibility

  /**运行时修改请求地址，测试用 */
  const [urlInput, setUrlInput] = useState("http://localhost:10888");
  const [targetSimulator, setTargetSimulator] = useState("1");
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const [currentTargetSimulator, setCurrentTargetSimulator] = useState<
    string | null
  >(null);
  useEffect(() => {
    78;
    const loadBaseUrl = async () => {
      try {
        const url = await SecureStore.getItemAsync("BASE_URL");
        const currentTargetSimulator = await SecureStore.getItemAsync(
          "TARGET_SIMULATOR"
        );
        if (url !== null) {
          setCurrentUrl(url);
        }
        if (currentTargetSimulator !== null) {
          setCurrentTargetSimulator(currentTargetSimulator);
        }
      } catch (error) {
        console.error("Error loading sth:", error);
      }
    };
    loadBaseUrl();
  }, []);

  const handleConfirmUrl = async () => {
    try {
      await SecureStore.setItemAsync("BASE_URL", urlInput);
      setCurrentUrl(urlInput);
    } catch (error) {
      console.error("Error updating BASE_URL:", error);
    } finally {
      setShowUrlInput(!showUrlInput);
    }
  };
  const handleConfirmTargetSimulator = async () => {
    try {
      await SecureStore.setItemAsync("TARGET_SIMULATOR", targetSimulator);
      setCurrentTargetSimulator(targetSimulator);
    } catch (error) {
      console.error("Error updating TARGET_SIMULATOR:", error);
    } finally {
      setShowUrlInput(!showUrlInput);
    }
  };
  /**运行时修改请求地址，测试用 */

  //记住密码，测试用***********************
  const [rememberMe, setRememberMe] = useState(false);
  useEffect(() => {
    const loadCredentials = async () => {
      const savedLicense = await SecureStore.getItemAsync("userLicense");
      const savedPassword = await SecureStore.getItemAsync("userPassword");
      if (savedLicense && savedPassword) {
        setLicense({ value: savedLicense, error: "" });
        setPassword({ value: savedPassword, error: "" });
        setRememberMe(true);
      }
    };

    loadCredentials();
  }, []);
  //记住密码，测试用***********************

  const onLoginPressed = async () => {
    const licenseError = licenseValidator(license.value);
    const passwordError = passwordValidator(password.value);
    if (licenseError || passwordError) {
      setLicense({ ...license, error: licenseError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    await userStore.getState().login(license.value, password.value);

    //记住密码，测试用*****************
    if (rememberMe) {
      await SecureStore.setItemAsync("userLicense", license.value);
      await SecureStore.setItemAsync("userPassword", password.value);
    } else {
      await SecureStore.deleteItemAsync("userLicense");
      await SecureStore.deleteItemAsync("userPassword");
    }
    //记住密码，测试用*****************

    const userStatus = useSyncExternalStore(
      userStore.subscribe,
      () => userStore.getState().status
    );
    if (userStatus === "signIn") {
      await lessonStore.getState().getAllLessons();
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <StatusBar hidden={true} />
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Background>
          <Header>{i18n.t("Welcome")}</Header>
          <TextInput
            label={
              <Text style={styles.labelText}>{i18n.t("license_number")}</Text>
            }
            outlineStyle={styles.input}
            returnKeyType="next"
            value={license.value}
            onChangeText={(text: any) => setLicense({ value: text, error: "" })}
            error={!!license.error}
            errorText={undefined}
            description={undefined}
            textColor="white"
          />
          <TextInput
            label={
              <Text style={[styles.labelText, styles.passwordInput]}>
                {i18n.t("password")}
              </Text>
            }
            outlineStyle={styles.input}
            returnKeyType="done"
            value={password.value}
            onChangeText={(text: any) =>
              setPassword({ value: text, error: "" })
            }
            error={!!password.error}
            errorText={undefined}
            secureTextEntry={isPasswordSecure}
            description={undefined}
            textColor="white"
            right={
              <TI.Icon
                icon={() => (
                  <MaterialCommunityIcons
                    name={isPasswordSecure ? "eye-off" : "eye"}
                    color={MD3Colors.primary100}
                    size={20}
                    onPress={() => {
                      isPasswordSecure
                        ? setIsPasswordSecure(false)
                        : setIsPasswordSecure(true);
                    }}
                  />
                )}
              />
            }
          />
          <View style={styles.forgotPassword}>
            <Checkbox
              status={rememberMe ? "checked" : "unchecked"}
              onPress={() => setRememberMe(!rememberMe)}
            />
            <TouchableOpacity onPress={() => flashShow("请联系管理员")}>
              <Text style={styles.forgot}>{i18n.t("forget")}</Text>
            </TouchableOpacity>
          </View>
          <Button
            mode="contained"
            onPress={onLoginPressed}
            style={styles.loginButton}
          >
            {i18n.t("login")}
          </Button>
        </Background>
        {/* render URL input and button */}
        {showUrlInput && (
          <View
            style={{
              flexDirection: "row",
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "black",
              padding: 10,
            }}
          >
            <View
              style={{
                backgroundColor: "black",
                width: "50%",
                padding: 10,
              }}
            >
              <TextInput
                label={
                  <Text style={styles.labelText}>{i18n.t("input_url")}</Text>
                }
                outlineStyle={styles.input}
                returnKeyType="done"
                value={urlInput}
                onChangeText={(text: any) => setUrlInput(text)}
                error={false}
                errorText={undefined}
                description={undefined}
                textColor="white"
              />
              <Button
                mode="contained"
                onPress={handleConfirmUrl}
                style={styles.loginButton}
              >
                {i18n.t("confirm")}
              </Button>
              <Text
                style={{
                  color: "white",
                }}
              >
                {currentUrl ? `Current URL: ${currentUrl}` : "No URL selected"}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "black",
                width: "50%",
                padding: 10,
              }}
            >
              <TextInput
                label={
                  <Text style={styles.labelText}>
                    {i18n.t("input_target_simulator")}
                  </Text>
                }
                outlineStyle={styles.input}
                returnKeyType="done"
                value={targetSimulator}
                onChangeText={(text: any) => setTargetSimulator(text)}
                error={false}
                errorText={undefined}
                description={undefined}
                textColor="white"
              />
              <Button
                mode="contained"
                onPress={handleConfirmTargetSimulator}
                style={styles.loginButton}
              >
                {i18n.t("confirm")}
              </Button>
              <Text
                style={{
                  color: "white",
                }}
              >
                {currentTargetSimulator
                  ? `Current targetSimulator: ${currentTargetSimulator}`
                  : "No targetSimulator selected"}
              </Text>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
      <TouchableOpacity
        style={styles.urlButton}
        onPress={() => setShowUrlInput(!showUrlInput)}
      >
        <MaterialCommunityIcons
          name="web"
          color={MD3Colors.primary100}
          size={30}
        />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  input: {
    borderColor: "transparent",
    backgroundColor: COLORS.dark,
    borderRadius: width * 0.1,
    borderWidth: 1,
  },
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: height * 0.03,
  },
  forgot: {
    fontSize: 16,
    color: COLORS.primary,
  },
  link: {
    fontWeight: "bold",
  },
  loginButton: {
    marginBottom: height * 0.05,
  },
  labelText: {
    fontSize: 18,
    color: COLORS.tertiary,
    backgroundColor: "transparent",
  },
  passwordInput: {
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.05,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  pickerItem: {
    color: "green",
    backgroundColor: "green",
  },
  urlButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    padding: 10,
  },
});

export default LoginScreen;

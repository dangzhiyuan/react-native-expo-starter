import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
  TouchableOpacity,
  TextInput as TI,
} from "react-native";
import { Text } from "../../components/Text/Text";
import { useThemeContext } from "../../themes/ThemeProvider";
import { useAuthStore } from "../../store/authStore";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AuthStackParamList } from "../../navigation/types";
import {
  MaterialIcons,
  Octicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { validateUsername, validatePassword } from "../../utils/validation";
import { Toast } from "../../components/Toast";
import {
  moderateScale,
  isTablet,
  spacing,
  screenWidth,
} from "../../utils/responsive";
import { Card } from "../../components/layout/Card";
import Background from "../../components/layout/Background";
import { useTranslation } from "react-i18next";
import Button from "../../components/Button/Button";
import { Checkbox } from "../../components/Checkbox/Checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from "@/components/TextInput";
import { flashShow } from "@/components/FlashMessage";
import Logo from "@/components/Logo/Logo";

type LoginScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "Login"
>;

export const LoginScreen = () => {
  const { t, i18n } = useTranslation();
  const { theme } = useThemeContext();
  console.log("i18n.language", theme);
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const login = useAuthStore((state) => state.login);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [touched, setTouched] = useState({
    username: false,
    password: false,
  });
  const [showToast, setShowToast] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [currentUrl, setCurrentUrl] = useState<string | undefined>(undefined);

  const STORAGE_KEYS = {
    USERNAME: "@auth_username",
    PASSWORD: "@auth_password",
    REMEMBER_ME: "@auth_remember_me",
  };

  useEffect(() => {
    loadSavedCredentials();
  }, []);

  const loadSavedCredentials = async () => {
    try {
      const savedRememberMe = await AsyncStorage.getItem(
        STORAGE_KEYS.REMEMBER_ME
      );
      if (savedRememberMe === "true") {
        const savedUsername = await AsyncStorage.getItem(STORAGE_KEYS.USERNAME);
        const savedPassword = await AsyncStorage.getItem(STORAGE_KEYS.PASSWORD);

        if (savedUsername) setUsername(savedUsername);
        if (savedPassword) setPassword(savedPassword);
        setRememberMe(true);
      }
    } catch (error) {
      console.error("Error loading credentials:", error);
    }
  };

  const saveCredentials = async () => {
    try {
      if (rememberMe) {
        await AsyncStorage.setItem(STORAGE_KEYS.USERNAME, username);
        await AsyncStorage.setItem(STORAGE_KEYS.PASSWORD, password);
        await AsyncStorage.setItem(STORAGE_KEYS.REMEMBER_ME, "true");
      } else {
        await AsyncStorage.multiRemove([
          STORAGE_KEYS.USERNAME,
          STORAGE_KEYS.PASSWORD,
          STORAGE_KEYS.REMEMBER_ME,
        ]);
      }
    } catch (error) {
      console.error("Error saving credentials:", error);
    }
  };

  const validateForm = () => {
    const usernameError = validateUsername(username);
    const passwordError = validatePassword(password);

    setUsernameError(usernameError);
    setPasswordError(passwordError);

    return !usernameError && !passwordError;
  };

  const handleUsernameChange = (text: string) => {
    setUsername(text);
    if (touched.username) {
      setUsernameError(validateUsername(text));
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (touched.password) {
      setPasswordError(validatePassword(text));
    }
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    if (!username) {
      setError(t("auth.usernameRequired"));
      return;
    }
    if (!password) {
      setError(t("auth.passwordRequired"));
      return;
    }

    try {
      setLoading(true);
      setError("");
      await login(username, password);

      await saveCredentials();
    } catch (error) {
      setError(t("auth.loginFailed"));
    } finally {
      setLoading(false);
    }
  };

  const handleRememberMeChange = async (value: boolean) => {
    setRememberMe(value);
    if (!value) {
      try {
        await AsyncStorage.multiRemove([
          STORAGE_KEYS.USERNAME,
          STORAGE_KEYS.PASSWORD,
          STORAGE_KEYS.REMEMBER_ME,
        ]);
      } catch (error) {
        console.error("Error clearing credentials:", error);
      }
    }
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "zh" : "en";
    i18n.changeLanguage(newLang);
  };

  const handleNoAccountPress = () => {
    // setShowToast(true);
    flashShow(t("auth.contactAdmin"));
  };

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Background source={require("../../../assets/images/background.png")}>
          <Image
            source={require("../../../assets/logo3.png")}
            style={styles.logo}
          />
          <View style={styles.cardWrapper}>
            <Button
              title={i18n.language === "en" ? "中文" : "English"}
              variant="secondary"
              style={styles.languageButton}
              textStyle={styles.languageButtonText}
              onPress={toggleLanguage}
            />
            <View style={styles.cardContainer}>
              <Card variant="elevated">
                <Text variant="h3" style={styles.title}>
                  {t("auth.loginTitle")}
                </Text>

                <View style={styles.inputContainer}>
                  <TextInput
                    leftIcon="person"
                    placeholder={t("auth.username")}
                    value={username}
                    containerStyle={styles.inputContainer}
                    onChangeText={handleUsernameChange}
                    onBlur={() =>
                      setTouched((prev) => ({ ...prev, username: true }))
                    }
                  />
                </View>
                {touched.username && usernameError ? (
                  <Text variant="small" color="error" style={styles.fieldError}>
                    {usernameError}
                  </Text>
                ) : null}

                <View style={styles.inputContainer}>
                  <TextInput
                    leftIcon="lock"
                    placeholder={t("auth.password")}
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={handlePasswordChange}
                    onBlur={() =>
                      setTouched((prev) => ({ ...prev, password: true }))
                    }
                  />
                  <Pressable
                    style={styles.passwordToggle}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <MaterialIcons
                      name={showPassword ? "visibility" : "visibility-off"}
                      size={24}
                      color={theme.text.primary}
                    />
                  </Pressable>
                </View>
                {touched.password && passwordError ? (
                  <Text variant="small" color="error" style={styles.fieldError}>
                    {passwordError}
                  </Text>
                ) : null}

                {error ? (
                  <Text variant="small" color="error" style={styles.error}>
                    {error}
                  </Text>
                ) : null}

                <View style={styles.accountOptionsContainer}>
                  <View style={styles.rememberMeContainer}>
                    <Checkbox
                      checked={rememberMe}
                      onValueChange={handleRememberMeChange}
                      label={t("auth.rememberMe")}
                    />
                  </View>
                  <Pressable onPress={handleNoAccountPress}>
                    <Text
                      variant="body"
                      color="primary"
                      style={styles.registerText}
                    >
                      {t("auth.noAccount")}
                    </Text>
                  </Pressable>
                </View>

                <Button
                  title={t("auth.login")}
                  onPress={handleLogin}
                  loading={loading}
                  style={styles.loginButton}
                />
              </Card>
            </View>
          </View>
          {showUrlInput && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: "black",
                padding: 10,
                zIndex: 1,
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-between",
                  width: "48%",
                  marginBottom: "5%",
                }}
              >
                <TextInput
                  value={currentUrl}
                  placeholder={t("auth.currentUrl")}
                  returnKeyType="done"
                  onChangeText={(text: any) => setCurrentUrl(text)}
                  // style={{ flex: 1, color: "white", padding: 10 }}
                />
                <Button
                  title={t("auth.login")}
                  onPress={handleLogin}
                  loading={loading}
                  style={styles.loginButton}
                />
                <Text style={{ color: "white" }}>
                  {currentUrl
                    ? `Current URL: ${currentUrl}`
                    : "No URL selected"}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-between",
                  width: "48%",
                  marginBottom: "5%",
                }}
              >
                <TextInput
                  value={currentUrl}
                  placeholder={t("auth.simulatorUrl")}
                  returnKeyType="done"
                  onChangeText={(text: any) => setCurrentUrl(text)}
                  // style={{ flex: 1, color: "white", padding: 10 }}
                />
                <Button
                  title={t("auth.login")}
                  onPress={handleLogin}
                  loading={loading}
                  style={styles.loginButton}
                />
                <Text style={{ color: "white" }}>
                  {currentUrl
                    ? `Current URL: ${currentUrl}`
                    : "No URL selected"}
                </Text>
              </View>
            </View>
          )}
          <TouchableOpacity
            style={styles.urlButton}
            onPress={() => setShowUrlInput(!showUrlInput)}
          >
            <MaterialCommunityIcons name="web" size={24} color="#fff" />
          </TouchableOpacity>
        </Background>
      </ScrollView>
      {showToast && (
        <Toast
          message={t("auth.contactAdmin")}
          onHide={() => setShowToast(false)}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  logo: {
    position: "absolute",
    top: "20%",
    left: "15%",
    width: screenWidth * 0.3,
    resizeMode: "contain",
    alignSelf: "center",
  },
  title: {
    marginBottom: spacing.md,
    marginLeft: spacing.lg,
    textAlign: "left",
    fontWeight: 500,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: spacing.xl,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "red",
    marginBottom: spacing.sm,
  },
  inputIcon: {
    position: "absolute",
    left: 16,
    zIndex: 1,
  },
  input: {
    flex: 1,
    height: moderateScale(48),
    borderWidth: 1,
    borderRadius: moderateScale(30),
    paddingHorizontal: moderateScale(48),
  },
  passwordToggle: {
    position: "absolute",
    top: 10,
    right: 16,
    padding: 4,
  },
  error: {
    marginBottom: 16,
    textAlign: "center",
  },
  loginButton: {
    marginBottom: 36,
  },
  registerLink: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  fieldError: {
    marginTop: -8,
    marginBottom: 8,
    marginLeft: 4,
  },
  accountOptionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.md,
    paddingHorizontal: 4,
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  registerText: {
    fontSize: 16,
    textDecorationLine: "none",
  },
  cardWrapper: {
    position: "relative",
    width: "100%",
    alignItems: "center",
  },
  cardContainer: {
    width: "100%",
    maxWidth: isTablet ? 600 : 400,
    marginTop: 20,
    paddingHorizontal: spacing.md,
  },
  languageButton: {
    position: "absolute",
    right: spacing.xl + spacing.md,
    top: -spacing.md,
    zIndex: 0,
  },
  languageButtonText: {
    color: "#2e3242",
  },
  urlButton: {
    position: "absolute",
    bottom: "5%",
    right: "5%",
    backgroundColor: "gray",
    borderRadius: 50,
    padding: 10,
    zIndex: 1,
  },
});

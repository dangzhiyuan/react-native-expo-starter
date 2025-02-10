import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
import { Text } from "../../components/Text/Text";
import { useThemeContext } from "../../themes/ThemeProvider";
import { useAuthStore } from "../../store/authStore";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AuthStackParamList } from "../../navigation/types";
import { MaterialIcons } from "@expo/vector-icons";
import { validateUsername, validatePassword } from "../../utils/validation";
import { Toast } from "../../components/Toast";
import { moderateScale, isTablet, spacing } from "../../utils/responsive";
import { Card } from "../../components/layout/Card";
import Background from "../../components/layout/Background";
import { useTranslation } from "react-i18next";
import Button from "../../components/Button/Button";

type LoginScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "Login"
>;

export const LoginScreen = () => {
  const { t } = useTranslation();
  const { theme } = useThemeContext();
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
    } catch (error) {
      setError(t("auth.loginFailed"));
    } finally {
      setLoading(false);
    }
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
          <Card variant="elevated">
            <Text variant="h1" style={styles.title}>
              {t("auth.loginTitle")}
            </Text>
            <Text variant="body" color="secondary" style={styles.subtitle}>
              {t("auth.loginSubtitle")}
            </Text>

            <View style={styles.inputContainer}>
              <MaterialIcons
                name="person"
                size={24}
                color={theme.text.secondary}
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.input, { borderColor: theme.border }]}
                placeholder={t("auth.username")}
                value={username}
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
              <MaterialIcons
                name="lock"
                size={24}
                color={theme.text.secondary}
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.input, { borderColor: theme.border }]}
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
                  color={theme.text.secondary}
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

            <Button
              title={t("auth.login")}
              onPress={handleLogin}
              loading={loading}
              style={styles.loginButton}
            />

            <View style={styles.registerLink}>
              <Text variant="body" color="secondary">
                {t("auth.noAccount")}
              </Text>
              <Button
                title={t("auth.createAccount")}
                variant="text"
                onPress={() => navigation.navigate("Register")}
              />
            </View>
          </Card>
        </Background>
      </ScrollView>
      {showToast && (
        <Toast
          message="请联系管理员重置密码"
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
  title: {
    marginBottom: spacing.sm,
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: spacing.xl,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
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
    borderRadius: moderateScale(8),
    paddingHorizontal: moderateScale(48),
  },
  passwordToggle: {
    position: "absolute",
    right: 16,
    padding: 4,
  },
  error: {
    marginBottom: 16,
    textAlign: "center",
  },
  loginButton: {
    marginBottom: 16,
  },
  registerLink: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  fieldError: {
    marginTop: -8,
    marginBottom: 8,
    marginLeft: 4,
  },
});

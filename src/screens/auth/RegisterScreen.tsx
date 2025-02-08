import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
import { Text } from "../../components/Text";
import { useThemeContext } from "../../themes/ThemeProvider";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  validateUsername,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "../../utils/validation";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AuthStackParamList } from "../../navigation/types";
import Button from "../../components/Button";
import Background from "../../components/layout/Background";
import { t } from "i18next";

type RegisterScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "Register"
>;

export const RegisterScreen = () => {
  const { theme } = useThemeContext();
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [touched, setTouched] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const validateForm = () => {
    const newErrors = {
      username: validateUsername(username),
      email: validateEmail(email),
      password: validatePassword(password),
      confirmPassword: validateConfirmPassword(password, confirmPassword),
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error);
  };

  const handleFieldChange = (field: string, value: string) => {
    const setters: Record<string, (value: string) => void> = {
      username: setUsername,
      email: setEmail,
      password: setPassword,
      confirmPassword: setConfirmPassword,
    };

    setters[field](value);

    if (touched[field as keyof typeof touched]) {
      let error = "";
      switch (field) {
        case "username":
          error = validateUsername(value);
          break;
        case "email":
          error = validateEmail(value);
          break;
        case "password":
          error = validatePassword(value);
          break;
        case "confirmPassword":
          error = validateConfirmPassword(password, value);
          break;
      }
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    setError("");
    setLoading(true);
    try {
      // 这里添加注册逻辑
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigation.navigate("Login");
    } catch (err) {
      setError("注册失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Background source={require("../../../assets/images/background.png")}>
        <View
          style={[
            styles.card,
            styles.shadow,
            { backgroundColor: theme.surface },
          ]}
        >
          <Text variant="h1" style={styles.title}>
            创建账号
          </Text>
          <Text variant="body" color="secondary" style={styles.subtitle}>
            请填写以下信息完成注册
          </Text>

          <View style={styles.inputContainer}>
            <MaterialIcons
              name="person-outline"
              size={20}
              color={theme.text.secondary}
              style={styles.inputIcon}
            />
            <TextInput
              style={[
                styles.input,
                {
                  borderColor:
                    errors.username && touched.username
                      ? theme.error
                      : theme.border,
                  color: theme.text.primary,
                },
              ]}
              placeholder="用户名"
              placeholderTextColor={theme.text.disabled}
              value={username}
              onChangeText={(text) => handleFieldChange("username", text)}
              onBlur={() => setTouched((prev) => ({ ...prev, username: true }))}
              autoCapitalize="none"
            />
          </View>
          {touched.username && errors.username ? (
            <Text variant="small" color="error" style={styles.fieldError}>
              {errors.username}
            </Text>
          ) : null}

          <View style={styles.inputContainer}>
            <MaterialIcons
              name="email"
              size={20}
              color={theme.text.secondary}
              style={styles.inputIcon}
            />
            <TextInput
              style={[
                styles.input,
                {
                  borderColor:
                    errors.email && touched.email ? theme.error : theme.border,
                  color: theme.text.primary,
                },
              ]}
              placeholder="电子邮箱"
              placeholderTextColor={theme.text.disabled}
              value={email}
              onChangeText={(text) => handleFieldChange("email", text)}
              onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
          {touched.email && errors.email ? (
            <Text variant="small" color="error" style={styles.fieldError}>
              {errors.email}
            </Text>
          ) : null}

          <View style={styles.inputContainer}>
            <MaterialIcons
              name="lock-outline"
              size={20}
              color={theme.text.secondary}
              style={styles.inputIcon}
            />
            <TextInput
              style={[
                styles.input,
                {
                  borderColor:
                    errors.password && touched.password
                      ? theme.error
                      : theme.border,
                  color: theme.text.primary,
                },
              ]}
              placeholder="密码"
              placeholderTextColor={theme.text.disabled}
              value={password}
              onChangeText={(text) => handleFieldChange("password", text)}
              onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
              secureTextEntry={!showPassword}
            />
            <Pressable
              onPress={() => setShowPassword(!showPassword)}
              style={styles.passwordToggle}
            >
              <MaterialIcons
                name={showPassword ? "visibility" : "visibility-off"}
                size={20}
                color={theme.text.secondary}
              />
            </Pressable>
          </View>
          {touched.password && errors.password ? (
            <Text variant="small" color="error" style={styles.fieldError}>
              {errors.password}
            </Text>
          ) : null}

          <View style={styles.inputContainer}>
            <MaterialIcons
              name="lock-outline"
              size={20}
              color={theme.text.secondary}
              style={styles.inputIcon}
            />
            <TextInput
              style={[
                styles.input,
                {
                  borderColor:
                    errors.confirmPassword && touched.confirmPassword
                      ? theme.error
                      : theme.border,
                  color: theme.text.primary,
                },
              ]}
              placeholder="确认密码"
              placeholderTextColor={theme.text.disabled}
              value={confirmPassword}
              onChangeText={(text) =>
                handleFieldChange("confirmPassword", text)
              }
              onBlur={() =>
                setTouched((prev) => ({ ...prev, confirmPassword: true }))
              }
              secureTextEntry={!showPassword}
            />
          </View>
          {touched.confirmPassword && errors.confirmPassword ? (
            <Text variant="small" color="error" style={styles.fieldError}>
              {errors.confirmPassword}
            </Text>
          ) : null}

          {error ? (
            <Text variant="small" style={styles.error} color="error">
              {error}
            </Text>
          ) : null}

          <Button
            title="注册"
            variant="primary"
            loading={loading}
            style={styles.registerButton}
            onPress={handleRegister}
          />

          <Pressable
            onPress={() => navigation.navigate("Login")}
            style={styles.loginLink}
          >
            <Text variant="small" color="secondary">
              已有账号？
            </Text>
            <Text variant="small" color="primary">
              立即登录
            </Text>
          </Pressable>
        </View>
      </Background>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  card: {
    padding: 24,
    borderRadius: 8,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 32,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  inputIcon: {
    position: "absolute",
    left: 16,
    zIndex: 1,
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 48,
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
  registerButton: {
    marginBottom: 16,
  },
  loginLink: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  fieldError: {
    marginTop: -8,
    marginBottom: 8,
    marginLeft: 4,
  },
  registerLink: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
});

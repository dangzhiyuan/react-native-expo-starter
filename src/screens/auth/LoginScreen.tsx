import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TextInput, Pressable } from 'react-native';
import { Text } from '../../components/Text';
import Button from '../../components/Button';
import { useThemeContext } from '../../themes/ThemeProvider';
import { useAuthStore } from '../../store/authStore';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../navigation/types';
import { MaterialIcons } from '@expo/vector-icons';
import { validateUsername, validatePassword } from '../../utils/validation';
import { Toast } from '../../components/Toast';
import { moderateScale, isTablet, spacing } from '../../utils/responsive';

type LoginScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

export const LoginScreen = () => {
  const { styles: themeStyles, theme } = useThemeContext();
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const login = useAuthStore(state => state.login);
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
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
    
    setLoading(true);
    setError('');
    
    try {
      // 添加2秒延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      await login(username, password);
    } catch (err) {
      setError('登录失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={[themeStyles.card, themeStyles.shadow, styles.loginCard]}>
          <Text variant="h1" style={styles.title}>欢迎回来</Text>
          <Text variant="body" color="secondary" style={styles.subtitle}>
            请登录您的账号
          </Text>
          
          <View style={styles.inputContainer}>
            <MaterialIcons 
              name="person-outline" 
              size={20} 
              color={theme.colors.text.secondary} 
              style={styles.inputIcon}
            />
            <TextInput
              style={[
                styles.input, 
                { borderColor: usernameError && touched.username ? theme.colors.error : theme.colors.border }
              ]}
              placeholder="用户名"
              placeholderTextColor={theme.colors.text.disabled}
              value={username}
              onChangeText={handleUsernameChange}
              onBlur={() => setTouched(prev => ({ ...prev, username: true }))}
              autoCapitalize="none"
            />
          </View>
          {touched.username && usernameError ? (
            <Text variant="small" color="error" style={styles.fieldError}>
              {usernameError}
            </Text>
          ) : null}

          <View style={styles.inputContainer}>
            <MaterialIcons 
              name="lock-outline" 
              size={20} 
              color={theme.colors.text.secondary}
              style={styles.inputIcon}
            />
            <TextInput
              style={[
                styles.input, 
                { borderColor: passwordError && touched.password ? theme.colors.error : theme.colors.border }
              ]}
              placeholder="密码"
              placeholderTextColor={theme.colors.text.disabled}
              value={password}
              onChangeText={handlePasswordChange}
              onBlur={() => setTouched(prev => ({ ...prev, password: true }))}
              secureTextEntry={!showPassword}
            />
            <Pressable 
              onPress={() => setShowPassword(!showPassword)}
              style={styles.passwordToggle}
            >
              <MaterialIcons 
                name={showPassword ? "visibility" : "visibility-off"}
                size={20}
                color={theme.colors.text.secondary}
              />
            </Pressable>
          </View>
          {touched.password && passwordError ? (
            <Text variant="small" color="error" style={styles.fieldError}>
              {passwordError}
            </Text>
          ) : null}

          {error ? (
            <Text variant="small" style={styles.error} color="error">
              {error}
            </Text>
          ) : null}

          <Button
            title="登录"
            variant="primary"
            loading={loading}
            style={styles.loginButton}
            onPress={handleLogin}
          />

          <Pressable 
            onPress={() => setShowToast(true)}
            style={styles.forgotPassword}
          >
            <Text variant="small" color="secondary">忘记密码？</Text>
          </Pressable>

          <View style={styles.divider}>
            <View style={[styles.dividerLine, { backgroundColor: theme.colors.border }]} />
            <Text variant="small" color="secondary" style={styles.dividerText}>
              或者
            </Text>
            <View style={[styles.dividerLine, { backgroundColor: theme.colors.border }]} />
          </View>

          <Button
            title="创建新账号"
            variant="outline"
            onPress={() => navigation.navigate('Register')}
          />
        </View>
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
    justifyContent: 'center',
    padding: spacing.md,
    paddingHorizontal: isTablet ? spacing.xl : spacing.md,
  },
  loginCard: {
    padding: spacing.lg,
    maxWidth: isTablet ? 500 : '100%',
    alignSelf: 'center',
    width: '100%',
  },
  title: {
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  inputIcon: {
    position: 'absolute',
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
    position: 'absolute',
    right: 16,
    padding: 4,
  },
  error: {
    marginBottom: 16,
    textAlign: 'center',
  },
  loginButton: {
    marginBottom: 16,
  },
  forgotPassword: {
    alignItems: 'center',
    marginBottom: 24,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 16,
  },
  registerButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
  fieldError: {
    marginTop: -8,
    marginBottom: 8,
    marginLeft: 4,
  },
}); 
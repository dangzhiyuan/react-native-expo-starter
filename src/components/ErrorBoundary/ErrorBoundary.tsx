import React, { Component, ErrorInfo } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { Text } from "../Text";
import Button from "../Button";
import { useTheme } from "../../themes/ThemeProvider";
import { useResponsive } from "../../utils/responsive";
import * as Updates from "expo-updates";

// 基础属性接口
interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

// 添加样式属性接口
interface StyleProps {
  styles: {
    container: ViewStyle;
    content: ViewStyle;
    icon: ViewStyle;
    message: ViewStyle;
    errorDetails: ViewStyle;
    buttonContainer: ViewStyle;
  };
}

interface State {
  hasError: boolean;
  error: Error | null;
}

// 修改高阶组件的类型定义
const withErrorBoundaryWrapper = (
  WrappedComponent: React.ComponentType<Props & StyleProps>
) => {
  return (props: Props) => {
    const { theme } = useTheme();
    const { layout } = useResponsive();

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: layout.padding,
        backgroundColor: theme.background,
      },
      content: {
        alignItems: "center",
        maxWidth: 600,
      },
      icon: {
        fontSize: 48,
        color: theme.error,
        marginBottom: layout.gutter,
      },
      message: {
        textAlign: "center",
        marginBottom: layout.gutter * 2,
      },
      errorDetails: {
        padding: layout.padding,
        borderRadius: 8,
        backgroundColor: theme.surface,
        marginBottom: layout.gutter * 2,
        width: "100%",
      },
      buttonContainer: {
        gap: layout.gutter,
      },
    });

    return <WrappedComponent {...props} styles={styles} />;
  };
};

// 修改基础组件的类型定义
class ErrorBoundaryBase extends Component<Props & StyleProps, State> {
  constructor(props: Props & StyleProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  //React提供的生命周期方法，当子组件抛出错误时这个方法会自动调用，看作try。。catch
  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 记录错误到后台错误报告服务
    console.error("Error caught by boundary:", error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  handleRestart = async () => {
    try {
      await Updates.reloadAsync();
    } catch (error) {
      console.error("Failed to reload app:", error);
    }
  };

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    const { hasError, error } = this.state;
    const { children, fallback, styles } = this.props;

    if (hasError) {
      if (fallback) {
        return fallback;
      }

      return (
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.icon}>⚠️</Text>
            <Text variant="h2" style={styles.message}>
              很抱歉，应用程序出现了问题
            </Text>

            {__DEV__ && error && (
              <View style={styles.errorDetails}>
                <Text variant="small" color="error">
                  {error.toString()}
                </Text>
              </View>
            )}

            <View style={styles.buttonContainer}>
              <Button
                title="重试"
                onPress={this.handleReset}
                leftIcon="refresh"
              />
              <Button
                title="重启应用"
                variant="outline"
                onPress={this.handleRestart}
                leftIcon="power-settings-new"
              />
            </View>
          </View>
        </View>
      );
    }

    return children;
  }
}

export const ErrorBoundary = withErrorBoundaryWrapper(ErrorBoundaryBase);

// 用法示例：
// <ErrorBoundary
//   onError={(error, errorInfo) => {
//     // 发送错误到监控服务
//     reportError(error, errorInfo);
//   }}
//   fallback={<CustomErrorComponent />}
// >
//   <App />
// </ErrorBoundary>

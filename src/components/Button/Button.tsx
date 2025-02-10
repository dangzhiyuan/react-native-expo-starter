import React from "react";
import {
  StyleSheet,
  Pressable,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ButtonProps } from "./types";
import { useTheme } from "../../themes/ThemeProvider";
import { Text } from "../Text/Text";

const Button = ({
  title,
  variant = "primary",
  onPress,
  disabled = false,
  loading = false,
  style,
  textStyle,
  textProps,
  leftIcon,
  rightIcon,
  iconSize = 20,
  iconColor,
  loadingColor,
  activeOpacity = 0.7,
}: ButtonProps) => {
  const { theme } = useTheme();

  const getBackgroundColor = () => {
    if (disabled) return theme.text.disabled;
    switch (variant) {
      case "primary":
        return theme.primary;
      case "secondary":
        return theme.secondary;
      case "outline":
      case "text":
        return "transparent";
      case "error":
        return theme.error;
      case "success":
        return theme.success;
      case "warning":
        return theme.warning;
      case "ghost":
        return "transparent";
      default:
        return theme.primary;
    }
  };

  const getBorderColor = () => {
    if (disabled) return theme.text.disabled;
    switch (variant) {
      case "outline":
        return theme.primary;
      case "error":
        return theme.error;
      case "success":
        return theme.success;
      case "warning":
        return theme.warning;
      default:
        return "transparent";
    }
  };

  const getTextColor = () => {
    if (disabled) return theme.text.disabled;
    switch (variant) {
      case "primary":
      case "secondary":
      case "error":
      case "success":
      case "warning":
        return theme.text.inverse;
      case "outline":
      case "text":
      case "ghost":
        return theme.primary;
      default:
        return theme.text.inverse;
    }
  };

  const getLoaderColor = () => {
    if (loadingColor) return loadingColor;

    switch (variant) {
      case "primary":
      case "secondary":
      case "error":
      case "success":
      case "warning":
        return theme.text.inverse;
      case "outline":
      case "text":
      case "ghost":
        return theme.primary;
      default:
        return theme.text.inverse;
    }
  };

  const buttonStyles = [
    styles.button,
    {
      backgroundColor: getBackgroundColor(),
      borderColor: getBorderColor(),
    },
    variant === "text" && styles.textButton,
    style,
  ];

  const getIconColor = () => iconColor || getTextColor();

  const renderIcon = (name: keyof typeof MaterialIcons.glyphMap) => (
    <MaterialIcons
      name={name}
      size={iconSize}
      color={getIconColor()}
      style={styles.icon}
    />
  );

  return (
    <Pressable
      style={({ pressed }) => [
        buttonStyles,
        pressed && { opacity: activeOpacity },
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={getLoaderColor()} style={styles.loader} />
      ) : (
        <React.Fragment>
          {leftIcon && renderIcon(leftIcon)}
          <Text
            variant="body"
            style={[
              styles.text,
              { color: getTextColor() },
              (leftIcon || rightIcon) && styles.textWithIcon,
              textStyle,
            ]}
            {...textProps}
          >
            {title}
          </Text>
          {rightIcon && renderIcon(rightIcon)}
        </React.Fragment>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "transparent",
  },
  textButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    textAlign: "center",
  },
  textWithIcon: {
    marginHorizontal: 8,
  },
  icon: {
    opacity: 0.9,
  },
  loader: {
    marginVertical: 2,
  },
});

export default Button;

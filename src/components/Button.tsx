import React from "react";
import {
  StyleSheet,
  Pressable,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Text } from "./Text";
import { useTheme } from "../themes/ThemeProvider";
import { MaterialIcons } from "@expo/vector-icons";
import type { TextProps } from "./Text";

export type ButtonVariant = "primary" | "secondary" | "outline" | "text";

interface ButtonProps {
  title: string;
  variant?: ButtonVariant;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  textProps?: Partial<TextProps>;
  leftIcon?: keyof typeof MaterialIcons.glyphMap;
  rightIcon?: keyof typeof MaterialIcons.glyphMap;
  iconSize?: number;
  iconColor?: string;
  loadingColor?: string;
  activeOpacity?: number;
}

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
      default:
        return theme.primary;
    }
  };

  const getBorderColor = () => {
    if (disabled) return theme.text.disabled;
    switch (variant) {
      case "outline":
        return theme.primary;
      default:
        return "transparent";
    }
  };

  const getTextColor = () => {
    if (disabled) return theme.text.disabled;
    switch (variant) {
      case "primary":
      case "secondary":
        return theme.text.inverse;
      case "outline":
      case "text":
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
        return theme.text.inverse;
      case "outline":
      case "text":
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

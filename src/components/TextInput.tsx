import React, { forwardRef, useState } from "react";
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleSheet,
  View,
  ViewStyle,
  TextStyle,
  Pressable,
} from "react-native";
import { Text } from "./Text/Text";
import { useTheme } from "../themes/ThemeProvider";
import { MaterialIcons } from "@expo/vector-icons";
import { useResponsive } from "../utils/responsive";

interface Props extends Omit<RNTextInputProps, "style"> {
  label?: string;
  error?: string;
  leftIcon?: keyof typeof MaterialIcons.glyphMap;
  rightIcon?: keyof typeof MaterialIcons.glyphMap;
  onRightIconPress?: () => void;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
}

export const TextInput = forwardRef<RNTextInput, Props>(
  (
    {
      label,
      error,
      leftIcon,
      rightIcon,
      onRightIconPress,
      containerStyle,
      inputStyle,
      labelStyle,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const { layout } = useResponsive();
    const [isFocused, setIsFocused] = useState(false);

    const styles = StyleSheet.create({
      container: {
        width: "100%",
        marginBottom: layout.gutter,
      },
      label: {
        marginBottom: layout.gutter / 2,
      },
      inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 8,
        borderColor: error
          ? theme.error
          : isFocused
          ? theme.primary
          : theme.border,
        backgroundColor: theme.surface,
        paddingHorizontal: layout.gutter,
        minHeight: layout.gutter * 3,
      },
      input: {
        flex: 1,
        color: theme.text.primary,
        fontSize: theme.typography.sizes.body,
        paddingVertical: layout.gutter / 2,
        marginLeft: leftIcon ? layout.gutter / 2 : 0,
        marginRight: rightIcon ? layout.gutter / 2 : 0,
      },
      icon: {
        color: error ? theme.error : theme.text.secondary,
      },
      error: {
        marginTop: layout.gutter / 2,
        color: theme.error,
      },
    });

    return (
      <View style={[styles.container, containerStyle]}>
        {label && (
          <Text variant="small" style={[styles.label, labelStyle]}>
            {label}
          </Text>
        )}

        <View style={styles.inputContainer}>
          {leftIcon && (
            <MaterialIcons name={leftIcon} size={20} style={styles.icon} />
          )}

          <RNTextInput
            ref={ref}
            placeholderTextColor={theme.text.disabled}
            onFocus={(e) => {
              setIsFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              onBlur?.(e);
            }}
            {...props}
            style={[styles.input, inputStyle]}
          />

          {rightIcon && (
            <Pressable onPress={onRightIconPress}>
              <MaterialIcons name={rightIcon} size={20} style={styles.icon} />
            </Pressable>
          )}
        </View>

        {error && (
          <Text variant="small" style={styles.error}>
            {error}
          </Text>
        )}
      </View>
    );
  }
);

TextInput.displayName = "TextInput";

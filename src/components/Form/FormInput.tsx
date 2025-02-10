import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Text } from "../Text/Text";
import { useTheme } from "../../themes/ThemeProvider";
import { Controller, Control } from "react-hook-form";
import { moderateScale } from "../../utils/responsive";

interface FormInputProps extends TextInputProps {
  name: string;
  control: Control<any>;
  label?: string;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

export const FormInput = ({
  name,
  control,
  label,
  error,
  containerStyle,
  ...props
}: FormInputProps) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text variant="body" style={styles.label}>
          {label}
        </Text>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            style={[
              styles.input,
              { borderColor: error ? theme.error : theme.border },
            ]}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            {...props}
          />
        )}
      />
      {error && (
        <Text variant="small" color="error" style={styles.error}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: moderateScale(16),
  },
  label: {
    marginBottom: moderateScale(4),
  },
  input: {
    height: moderateScale(48),
    borderWidth: 1,
    borderRadius: moderateScale(8),
    paddingHorizontal: moderateScale(16),
  },
  error: {
    marginTop: moderateScale(4),
  },
});

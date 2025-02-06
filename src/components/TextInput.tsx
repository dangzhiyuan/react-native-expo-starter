import React from 'react';
import { 
  TextInput as RNTextInput, 
  TextInputProps as RNTextInputProps,
  StyleSheet,
  View,
} from 'react-native';
import { Text } from './Text';
import { useThemeContext } from '../themes/ThemeProvider';
import { moderateScale, spacing } from '../utils/responsive';

interface TextInputProps extends RNTextInputProps {
  label?: string;
  error?: string;
}

export const TextInput = ({ 
  label,
  error,
  style,
  ...props
}: TextInputProps) => {
  const { theme } = useThemeContext();

  return (
    <View style={styles.container}>
      {label && (
        <Text variant="small" style={styles.label}>
          {label}
        </Text>
      )}
      <RNTextInput
        style={[
          styles.input,
          {
            borderColor: error ? theme.colors.error : theme.colors.border,
            color: theme.colors.text.primary,
          },
          style,
        ]}
        placeholderTextColor={theme.colors.text.disabled}
        {...props}
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
    marginBottom: spacing.md,
  },
  label: {
    marginBottom: 8,
  },
  input: {
    height: moderateScale(48),
    borderWidth: 1,
    borderRadius: moderateScale(8),
    paddingHorizontal: spacing.md,
    fontSize: moderateScale(16),
  },
  error: {
    marginTop: 4,
  },
});

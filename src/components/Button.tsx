import React, { memo } from 'react';
import { 
  TouchableOpacity, 
  ActivityIndicator, 
  StyleSheet, 
  StyleProp, 
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Text } from './Text';
import { useThemeContext } from '../themes/ThemeProvider';
import { getWidth } from '../utils/platform';
import { moderateScale } from '../utils/responsive';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Button = ({ 
  title, 
  onPress, 
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  textStyle,
}: ButtonProps) => {
  const { theme } = useThemeContext();

  const getBackgroundColor = () => {
    if (disabled) return theme.colors.text.disabled;
    switch (variant) {
      case 'primary':
        return theme.colors.primary;
      case 'secondary':
        return theme.colors.secondary;
      case 'outline':
        return 'transparent';
      default:
        return theme.colors.primary;
    }
  };

  const getBorderColor = () => {
    if (disabled) return theme.colors.text.disabled;
    switch (variant) {
      case 'outline':
        return theme.colors.text.primary;
      default:
        return 'transparent';
    }
  };

  const getTextColor = () => {
    if (disabled) return theme.colors.text.inverse;
    switch (variant) {
      case 'primary':
      case 'secondary':
        return theme.colors.text.inverse;
      case 'outline':
        return theme.colors.text.primary;
      default:
        return theme.colors.text.inverse;
    }
  };

  const getLoaderColor = () => {
    if (variant === 'outline') {
      return theme.colors.text.primary;
    }
    return theme.colors.text.inverse;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          opacity: disabled ? 0.6 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator 
          color={getLoaderColor()}
          style={styles.loader}
        />
      ) : (
        <Text
          variant="body"
          style={[
            styles.text,
            { color: getTextColor() },
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: moderateScale(48),
    borderRadius: moderateScale(8),
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(16),
  },
  text: {
    textAlign: 'center',
  },
  loader: {
    marginVertical: 2,
  },
});

export default memo(Button); 
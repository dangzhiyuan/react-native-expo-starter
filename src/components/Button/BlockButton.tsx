import React from "react";
import {
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  ImageBackground,
  Image,
  ImageSourcePropType,
  View,
} from "react-native";
import { Text } from "../Text/Text";
import { isTablet } from "../../utils/responsive";
import { spacing, fontSizes, scale } from "../../utils/responsive";
import { useTheme } from "../../themes/ThemeProvider";

interface BlockButtonProps {
  title: string;
  onPress?: () => void;
  backgroundImage?: ImageSourcePropType;
  icon?: ImageSourcePropType;
  backgroundColor?: string;
  style?: ViewStyle;
  disabled?: boolean;
}

export const BlockButton = ({
  title,
  onPress,
  backgroundImage,
  icon,
  backgroundColor,
  style,
  disabled = false,
}: BlockButtonProps) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    button: {
      flex: isTablet ? 1 : undefined,
      height: isTablet ? scale(75) : scale(150),
      backgroundColor: backgroundColor || theme.primary,
      borderRadius: scale(12),
      overflow: "hidden",
      width: "auto",
      ...(isTablet && {
        marginTop: -spacing.lg * 2,
      }),
    },
    imageContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    backgroundImage: {
      width: "100%",
      height: "100%",
    },
    contentContainer: {
      position: "relative",
      width: "100%",
      height: "100%",
      zIndex: 1,
    },
    contentWrapper: {
      flex: 1,
      padding: spacing.md,
      paddingHorizontal: spacing.lg,
      flexDirection: "column",
      alignSelf: "flex-start",
    },
    titleContainer: {
      flex: 1,
      marginRight: spacing.sm,
    },
    title: {
      fontSize: isTablet ? fontSizes.body : fontSizes.h2,
      color: theme.text.inverse,
      fontWeight: "600",
      lineHeight: isTablet ? scale(22) : scale(28),
    },
    icon: {
      width: isTablet ? scale(24) : scale(30),
      height: isTablet ? scale(24) : scale(30),
    },
  });

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      disabled={disabled}
    >
      {backgroundImage && (
        <View style={styles.imageContainer}>
          <Image
            source={backgroundImage}
            style={styles.backgroundImage}
            resizeMode="contain"
          />
        </View>
      )}
      <View style={styles.contentContainer}>
        <View style={styles.contentWrapper}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
          </View>
          {icon && (
            <Image source={icon} style={styles.icon} resizeMode="contain" />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

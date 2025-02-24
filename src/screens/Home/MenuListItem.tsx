import React from "react";
import { TouchableOpacity, View, Image, StyleSheet } from "react-native";
import { Text } from "../../components/Text/Text";
import { useTheme } from "../../themes/ThemeProvider";
import { fontSizes, spacing, useResponsive } from "../../utils/responsive";
import { FontWeight } from "@shopify/react-native-skia";

interface MenuListItemProps {
  icon: any;
  text: string;
  rightText?: string;
  onPress?: () => void;
  showBorder?: boolean;
  textColor?: string;
}

export const MenuListItem = ({
  icon,
  text,
  rightText = ">",
  onPress,
  showBorder = true,
  textColor,
}: MenuListItemProps) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 16,
    },
    leftContent: {
      flexDirection: "row",
      alignItems: "center",
    },
    icon: {
      width: 24,
      height: 24,
      marginRight: 12,
    },
    text: {
      fontSize: fontSizes.h3,
      fontWeight: FontWeight.Medium,
      marginLeft: spacing.sm,
      lineHeight: 29,
    },
    rightContent: {
      flexDirection: "row",
      alignItems: "center",
    },
    rightText: {
      marginRight: spacing.sm,
      fontSize: fontSizes.body,
      opacity: 0.7,
    },
    arrow: {
      fontSize: fontSizes.body,
      opacity: 0.7,
    },
  });

  return (
    <TouchableOpacity
      style={[
        styles.container,
        showBorder && { borderBottomWidth: 1, borderBottomColor: theme.border },
      ]}
      onPress={onPress}
    >
      <View style={styles.leftContent}>
        <Image source={icon} style={styles.icon} />
        <Text
          variant="body"
          style={[styles.text, textColor && { color: textColor }]}
        >
          {text}
        </Text>
      </View>
      <View style={styles.rightContent}>
        {rightText !== ">" && (
          <Text
            variant="body"
            style={[styles.rightText, textColor && { color: textColor }]}
          >
            {rightText}
          </Text>
        )}
        <Text
          variant="body"
          style={[styles.arrow, textColor && { color: textColor }]}
        >
          {">"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

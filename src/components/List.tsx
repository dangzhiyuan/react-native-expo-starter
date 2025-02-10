import React from "react";
import {
  View,
  StyleSheet,
  ViewStyle,
  Pressable,
  PressableProps,
} from "react-native";
import { Text } from "./Text/Text";
import { useTheme } from "../themes/ThemeProvider";
import { useResponsive } from "../utils/responsive";
import { MaterialIcons } from "@expo/vector-icons";

interface ListItemProps extends Omit<PressableProps, "style"> {
  title: string;
  subtitle?: string;
  leftIcon?: keyof typeof MaterialIcons.glyphMap;
  rightIcon?: keyof typeof MaterialIcons.glyphMap;
  showDivider?: boolean;
  style?: ViewStyle;
}

export const ListItem = ({
  title,
  subtitle,
  leftIcon,
  rightIcon = "chevron-right",
  showDivider = true,
  style,
  ...props
}: ListItemProps) => {
  const { theme } = useTheme();
  const { layout } = useResponsive();

  const styles = StyleSheet.create({
    item: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: layout.gutter,
      paddingHorizontal: layout.padding,
      backgroundColor: theme.surface,
    },
    content: {
      flex: 1,
      marginLeft: leftIcon ? layout.gutter : 0,
      marginRight: rightIcon ? layout.gutter : 0,
    },
    divider: {
      height: 1,
      backgroundColor: theme.border,
    },
    icon: {
      color: theme.text.secondary,
    },
  });

  return (
    <>
      <Pressable
        style={({ pressed }) => [
          styles.item,
          pressed && {
            backgroundColor: theme.hover,
          },
          style,
        ]}
        {...props}
      >
        {leftIcon && (
          <MaterialIcons name={leftIcon} size={24} style={styles.icon} />
        )}

        <View style={styles.content}>
          <Text variant="body">{title}</Text>
          {subtitle && (
            <Text variant="small" color="secondary" style={{ marginTop: 4 }}>
              {subtitle}
            </Text>
          )}
        </View>

        {rightIcon && (
          <MaterialIcons name={rightIcon} size={24} style={styles.icon} />
        )}
      </Pressable>
      {showDivider && <View style={styles.divider} />}
    </>
  );
};

interface ListProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const List = ({ children, style }: ListProps) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      borderRadius: 8,
      overflow: "hidden",
      backgroundColor: theme.surface,
      shadowColor: theme.text.primary,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
  });

  return <View style={[styles.container, style]}>{children}</View>;
};

import React, { useState } from "react";
import { View, StyleSheet, Pressable, Animated } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Text } from "../Text/Text";
import { useTheme } from "../../themes/ThemeProvider";
import { useResponsive } from "../../utils/responsive";

interface CollapseProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

export const Collapse = ({
  title,
  children,
  defaultExpanded = false,
}: CollapseProps) => {
  const { theme } = useTheme();
  const { layout } = useResponsive();
  const [expanded, setExpanded] = useState(defaultExpanded);
  const rotateAnim = React.useRef(
    new Animated.Value(defaultExpanded ? 1 : 0)
  ).current;
  const heightAnim = React.useRef(
    new Animated.Value(defaultExpanded ? 1 : 0)
  ).current;

  const toggleExpand = () => {
    const toValue = expanded ? 0 : 1;
    Animated.parallel([
      Animated.spring(rotateAnim, {
        toValue,
        useNativeDriver: true,
      }),
      Animated.spring(heightAnim, {
        toValue,
        useNativeDriver: false,
      }),
    ]).start();
    setExpanded(!expanded);
  };

  const styles = StyleSheet.create({
    container: {
      borderRadius: 8,
      backgroundColor: theme.surface,
      overflow: "hidden",
      marginBottom: layout.gutter,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      padding: layout.padding,
      borderBottomWidth: expanded ? 1 : 0,
      borderBottomColor: theme.border,
    },
    title: {
      flex: 1,
      marginRight: layout.gutter,
    },
    content: {
      overflow: "hidden",
    },
    contentInner: {
      padding: layout.padding,
    },
  });

  return (
    <View style={styles.container}>
      <Pressable style={styles.header} onPress={toggleExpand}>
        <Text variant="h3" style={styles.title}>
          {title}
        </Text>
        <Animated.View
          style={{
            transform: [
              {
                rotate: rotateAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0deg", "180deg"],
                }),
              },
            ],
          }}
        >
          <MaterialIcons
            name="keyboard-arrow-down"
            size={24}
            color={theme.text.primary}
          />
        </Animated.View>
      </Pressable>
      <Animated.View
        style={[
          styles.content,
          {
            maxHeight: heightAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 500],
            }),
          },
        ]}
      >
        <View style={styles.contentInner}>{children}</View>
      </Animated.View>
    </View>
  );
};

import React from "react";
import { View, StyleSheet, ScrollView, ViewStyle } from "react-native";
import { useResponsive } from "../../utils/responsive";

interface ModalContentProps {
  children: React.ReactNode;
  scrollable?: boolean;
  style?: ViewStyle;
}

export const ModalContent = ({
  children,
  scrollable = true,
  style,
}: ModalContentProps) => {
  const { layout } = useResponsive();

  const styles = StyleSheet.create({
    content: {
      minHeight: 100,
    },
    scrollContent: {
      maxHeight: layout.height * 0.6,
    },
  });

  if (scrollable) {
    return (
      <ScrollView
        style={[styles.scrollContent, style]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>{children}</View>
      </ScrollView>
    );
  }

  return <View style={[styles.content, style]}>{children}</View>;
};

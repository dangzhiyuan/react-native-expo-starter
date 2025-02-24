import React from "react";
import { View, StyleSheet, ScrollView, ViewStyle } from "react-native";
import { useResponsive, isTablet } from "../../utils/responsive";

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
      minHeight: isTablet ? 300 : 200,
      paddingHorizontal: layout.padding,
      paddingBottom: layout.padding * 2,
    },
    scrollContent: {
      maxHeight: isTablet ? layout.height * 0.7 : layout.height * 0.6,
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

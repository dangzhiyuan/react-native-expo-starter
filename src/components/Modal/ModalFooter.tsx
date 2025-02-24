import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { useResponsive } from "../../utils/responsive";
import { isTablet } from "../../utils/responsive";

interface ModalFooterProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const ModalFooter = ({ children, style }: ModalFooterProps) => {
  const { layout } = useResponsive();

  const styles = StyleSheet.create({
    footer: {
      marginTop: -layout.padding * 2,
    },
    buttonContainer: {
      width: isTablet ? "50%" : "80%",
      alignSelf: "center",
    },
  });

  return (
    <View style={[styles.footer, style]}>
      <View style={styles.buttonContainer}>{children}</View>
    </View>
  );
};

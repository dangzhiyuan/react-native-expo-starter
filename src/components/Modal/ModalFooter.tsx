import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { useResponsive } from "../../utils/responsive";
import { ButtonList } from "../layout/ButtonList";

interface ModalFooterProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const ModalFooter = ({ children, style }: ModalFooterProps) => {
  const { layout } = useResponsive();

  const styles = StyleSheet.create({
    footer: {
      marginTop: layout.gutter,
      paddingTop: layout.gutter,
      borderTopWidth: 1,
      borderTopColor: "rgba(0, 0, 0, 0.1)",
    },
  });

  return (
    <View style={[styles.footer, style]}>
      <ButtonList>{children}</ButtonList>
    </View>
  );
};

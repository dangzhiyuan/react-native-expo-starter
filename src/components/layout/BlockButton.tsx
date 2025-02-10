import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import Button from "../Button/Button";
import { ButtonProps } from "../Button/types";
import { useResponsive } from "../../utils/responsive";

interface BlockButtonProps extends ButtonProps {
  containerStyle?: ViewStyle;
}

export const BlockButton = ({
  style,
  containerStyle,
  ...props
}: BlockButtonProps) => {
  const { layout } = useResponsive();

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      marginVertical: layout.gutter,
    },
    button: {
      width: "100%",
    },
  });

  return (
    <Button
      {...props}
      style={[styles.button, style]}
      containerStyle={[styles.container, containerStyle]}
    />
  );
};

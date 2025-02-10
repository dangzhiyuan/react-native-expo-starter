import React from "react";
import {
  View,
  StyleSheet,
  Modal as RNModal,
  Animated,
  Pressable,
  Dimensions,
  ViewStyle,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useTheme } from "../../themes/ThemeProvider";
import { MaterialIcons } from "@expo/vector-icons";
import { Text } from "../Text/Text";
import { useResponsive } from "../../utils/responsive";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  showCloseButton?: boolean;
  closeOnBackdropPress?: boolean;
  animationType?: "fade" | "slide" | "none";
  contentStyle?: ViewStyle;
  avoidKeyboard?: boolean;
}

export const Modal = ({
  visible,
  onClose,
  children,
  title,
  showCloseButton = true,
  closeOnBackdropPress = true,
  animationType = "fade",
  contentStyle,
  avoidKeyboard = true,
}: ModalProps) => {
  const { theme } = useTheme();
  const { layout } = useResponsive();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(
    new Animated.Value(Dimensions.get("window").height)
  ).current;

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          bounciness: 5,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: Dimensions.get("window").height,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const styles = StyleSheet.create({
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: layout.padding,
    },
    content: {
      backgroundColor: theme.background,
      borderRadius: 12,
      padding: layout.padding,
      width: "100%",
      maxWidth: 500,
      maxHeight: "90%",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: layout.gutter,
    },
    title: {
      flex: 1,
      paddingRight: showCloseButton ? layout.gutter : 0,
    },
    closeButton: {
      padding: 4,
    },
  });

  const renderContent = () => (
    <Animated.View
      style={[
        styles.content,
        contentStyle,
        {
          opacity: fadeAnim,
          transform: [
            {
              translateY:
                animationType === "slide"
                  ? slideAnim
                  : fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    }),
            },
          ],
        },
      ]}
    >
      {(title || showCloseButton) && (
        <View style={styles.header}>
          {title && (
            <Text variant="h3" style={styles.title}>
              {title}
            </Text>
          )}
          {showCloseButton && (
            <Pressable style={styles.closeButton} onPress={onClose}>
              <MaterialIcons
                name="close"
                size={24}
                color={theme.text.primary}
              />
            </Pressable>
          )}
        </View>
      )}
      {children}
    </Animated.View>
  );

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]} />
      <Pressable
        style={styles.container}
        onPress={closeOnBackdropPress ? onClose : undefined}
      >
        <Pressable onPress={(e) => e.stopPropagation()}>
          {avoidKeyboard ? (
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              {renderContent()}
            </KeyboardAvoidingView>
          ) : (
            renderContent()
          )}
        </Pressable>
      </Pressable>
    </RNModal>
  );
};

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
import { useResponsive, isTablet } from "../../utils/responsive";

interface ModalProps {
  visible: boolean;
  onDismiss: () => void;
  children: React.ReactNode;
  title?: string;
  showCloseButton?: boolean;
  closeOnBackdropPress?: boolean;
  animationType?: "fade" | "slide" | "none";
  contentStyle?: ViewStyle;
  avoidKeyboard?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  visible,
  onDismiss,
  children,
  title,
  showCloseButton = true,
  closeOnBackdropPress = true,
  animationType = "fade",
  contentStyle,
  avoidKeyboard = true,
}) => {
  const { theme } = useTheme();
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
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
      backgroundColor: theme.surface,
      borderRadius: 12,
      padding: 20,
      width: "100%",
      maxWidth: isTablet ? 600 : "95%",
      alignSelf: "center",
      shadowColor: "gray",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3.84,
      elevation: 5,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    title: {
      flex: 1,
      fontSize: isTablet ? 20 : 18,
      fontWeight: "600",
      color: theme.text.primary,
      paddingRight: showCloseButton ? 20 : 0,
    },
    closeButton: {
      padding: 8,
      marginRight: -8,
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
              translateY: animationType === "slide" ? slideAnim : 0,
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
            <Pressable style={styles.closeButton} onPress={onDismiss}>
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
      transparent={true}
      visible={visible}
      onRequestClose={onDismiss}
      animationType="none"
    >
      <Pressable
        style={styles.modalContainer}
        onPress={closeOnBackdropPress ? onDismiss : undefined}
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

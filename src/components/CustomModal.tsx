import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Modal } from "./Modal";
import { useTheme } from "@/themes/ThemeProvider";

interface CustomModalProps {
  visible: boolean;
  onDismiss: () => void;
  title: string;
  description: string;
  confirmText?: string;
  onConfirm: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onDismiss,
  title,
  description,
  confirmText = "确认",
  onConfirm,
}) => {
  const { theme } = useTheme();

  return (
    <Modal visible={visible} onDismiss={onDismiss}>
      <View
        style={[styles.modalContent, { backgroundColor: theme.background }]}
      >
        <Text style={[styles.modalTitle, { color: theme.text.primary }]}>
          {title}
        </Text>
        <Text
          style={[styles.modalDescription, { color: theme.text.secondary }]}
        >
          {description}
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.confirmButton, { backgroundColor: theme.primary }]}
            onPress={onConfirm}
          >
            <Text style={styles.buttonText}>{confirmText}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.cancelButton, { backgroundColor: theme.secondary }]}
            onPress={onDismiss}
          >
            <Text style={styles.buttonText}>取消</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    width: "80%",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  confirmButton: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    marginRight: 10,
  },
  cancelButton: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default CustomModal;

import React from "react";
import { Button, Modal, Text } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const ReportInfoModal = ({ visible, onDismiss, modalInfo }) => {
  const handleClose = () => {
    onDismiss();
  };

  return (
    <Modal
      visible={visible}
      onDismiss={handleClose}
      contentContainerStyle={styles.modalContainer}
      dismissable={true}
    >
      <View style={styles.innerContainer}>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Text style={styles.title}>{modalInfo}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    width: "80%",
    height: "6%",
    left: "10%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  innerContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(35, 40, 56, 1)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "rgb(197,205,222)",
  },
  closeBtn: {
    height: "55%",
    width: "80%",
    borderRadius: 25,
    borderWidth: 1,
    backgroundColor: "rgb(240,245,255)",
    alignItems: "center",
    justifyContent: "center",
    top: "80%",
  },
  closeText: {
    fontSize: 18,
    fontWeight: "700",
    color: "rgba(46, 50, 66, 1)",
  },
});

export default ReportInfoModal;

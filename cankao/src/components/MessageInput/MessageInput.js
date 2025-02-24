import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import {
  Fontisto,
  Feather,
  MaterialIcons,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  console.log(message);

  const sendMessage = () => {
    console.warn("send message", message);
    setMessage("");
  };

  const onPlusClicked = () => {
    console.warn("plus clicked");
  };

  const onPress = () => {
    if (message) {
      sendMessage();
    } else {
      onPlusClicked();
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS == "ios" ? "padiing" : "height"}
      keyboardVerticalOffset={70}
    >
      <View style={styles.inputContainer}>
        <Fontisto name="smiley" size={24} color="#595959" style={styles.icon} />

        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
        />

        <Feather name="camera" size={24} color="black" style={styles.icon} />
        <MaterialIcons
          name="mic-none"
          size={24}
          color="black"
          style={styles.icon}
        />
      </View>
      <Pressable onPress={onPress} style={styles.buttonContainer}>
        {message ? (
          <MaterialCommunityIcons name="send" size={20} color="white" />
        ) : (
          <AntDesign name="plus" size={24} color="white" />
        )}
      </Pressable>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    padding: 10,
    margin: 3,
  },
  inputContainer: {
    backgroundColor: "#dedede",
    flex: 1,
    marginRight: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "lightgrey",
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  input: {
    flex: 1,
    marginHorizontal: 10,
  },
  icon: {
    marginHorizontal: 8,
  },
  buttonContainer: {
    width: 40,
    height: 40,
    backgroundColor: "#3872E9",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    // Add styles for the button container
  },
  buttonText: {
    color: "white",
    fontSize: 24,
  },
});

export default MessageInput;

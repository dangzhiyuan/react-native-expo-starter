import { View, Text, StyleSheet } from "react-native";
import React from "react";

const blue = "#3872E9";
const grey = "lightgrey";

const myID = "u1";

const Message = ({ message }) => {
  const isMe = message.user.id == myID;
  return (
    <View
      style={[
        styles.container,
        isMe ? styles.rightcontainer : styles.leftcontainer,
      ]}
    >
      <Text style={{ color: isMe ? "black" : "white" }}>{message.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3872E9",
    padding: 10,
    borderRadius: 10,
    margin: 10,
    maxWidth: "75%",
  },
  leftcontainer: {
    backgroundColor: blue,
    marginLeft: 10,
    marginRight: "auto",
  },
  rightcontainer: {
    backgroundColor: grey,
    marginLeft: "auto",
    marginRight: 10,
  },
  text: {
    color: "#fff",
  },
});

export default Message;

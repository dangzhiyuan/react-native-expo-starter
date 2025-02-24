import React from "react";
import { View, StyleSheet, Text } from "react-native";
import {
  TextInput as Input,
  Provider as PaperProvider,
} from "react-native-paper";

export default function TextInput({ errorText, description, ...props }) {
  const textInputTheme = {
    colors: {
      primary: "white",
      text: "white",
    },
  };

  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        selectionColor="white"
        underlineColor="transparent"
        mode="outlined"
        theme={textInputTheme}
        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 12,
    backgroundColor: "transparent",
  },
  input: {
    backgroundColor: "rgba(25, 29, 40, 1)",
  },
  description: {
    fontSize: 13,
    color: "#414757",
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: "#f13a59",
    paddingTop: 8,
  },
});

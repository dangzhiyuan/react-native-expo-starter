import {
  View,
  Text,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import ColorBarValue from "./scoreResultShowUi/GradientRule/ColorBarValue";

const RuleResultsWithoutInput = ({ trainScore }) => {
  const renderItem = ({ item }) => (
    <View style={styles.progressContainer}>
      <ColorBarValue item={item} />
      <View style={styles.inputContainer}>
        <Text style={styles.title}>
          评分 {"  "}
          {item.score.toFixed(2)}
        </Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={100}
    >
      <View style={styles.container}>
        <FlatList
          data={trainScore}
          renderItem={renderItem}
          keyExtractor={(item) => item.rule_id.toString()}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContentContainer}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
  },
  listContentContainer: {
    paddingBottom: 200,
  },

  inputContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "400",
    color: "rgb(204,204,204)",
    top: -50,
  },
  input: {
    borderColor: "rgb(51,51,51)",
    backgroundColor: "rgb(51,51,51)",
    padding: 5,
    borderRadius: 10,
    color: "rgb(153,153,153)",
    width: 140,
    top: -15,
    height: 40,
    textAlign: "center",
    borderWidth: 1,
  },
});

export default RuleResultsWithoutInput;

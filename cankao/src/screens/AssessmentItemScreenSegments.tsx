import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";
import ColorBarValue from "./scoreResultShowUi/GradientRule/ColorBarValue";

const AssessmentItemScreenSegments = ({
  trainScore,
  textInputValues,
  setTextInputValues,
  isFinished,
}) => {
  trainScore.sort((item1, item2) => item1.range_type - item2.range_type);

  const handleValidatedScoreChange = (score, rule_id) => {
    if (/^\d*\.?\d{0,2}$/.test(score) || score === "") {
      const index = textInputValues.findIndex(
        (element) => element.rule_id === rule_id
      );
      const newEntry = { rule_id, score };

      if (index !== -1) {
        // 更新已有的值
        const newArray = [...textInputValues];
        newArray[index] = newEntry;
        setTextInputValues(newArray);
      } else {
        // 添加新值
        setTextInputValues([...textInputValues, newEntry]);
      }
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.progressContainer}>
      <ColorBarValue item={item} />
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
    paddingTop: 50,
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

export default AssessmentItemScreenSegments;

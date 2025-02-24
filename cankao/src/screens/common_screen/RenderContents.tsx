import React from "react";
import { ActivityIndicator, View } from "react-native";
import StageDivision from "../StageDivision";

const ContentsRenderer = ({
  segments,
  isLoading,
  textInputValues,
  setTextInputValues,
  isFinished,
}) => {
  console.log("rendering", segments);
  if (segments && !isLoading) {
    return (
      <View style={{ flex: 1 }}>
        <StageDivision
          data={segments}
          textInputValues={textInputValues}
          setTextInputValues={setTextInputValues}
          isFinished={isFinished}
        />
      </View>
    );
  } else {
    return (
      <ActivityIndicator
        size="large"
        color="rgba(130, 144, 174, 1)"
        style={{ flex: 1 }}
      />
    );
  }
};

export default ContentsRenderer;

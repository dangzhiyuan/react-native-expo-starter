import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import SectionalTwo from "../SectionTwo";
import TimeReviewScreen from "../TimeReviewScreen";
import AssessmentItemScreenSegments from "../AssessmentItemScreenSegments";
import SopShowScreen from "../SopShowScreen";

const RenderPage = ({
  currentPage,
  trainScore,
  currentTrainName,
  textInputValues,
  setTextInputValues,
  overLimit,
  isFinished,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="rgba(130, 144, 174, 1)" />;
  }

  if (!trainScore || Object.keys(trainScore).length === 0) {
    return (
      <View>
        <Text style={{ color: "green" }}>No data available</Text>
      </View>
    );
  }

  switch (currentPage) {
    case "1":
      return (
        <SectionalTwo trains={trainScore} currentTrainName={currentTrainName} />
      );
    case "2":
      if (
        trainScore["rules_result"] &&
        Object.keys(trainScore["rules_result"]).length !== 0
      ) {
        return (
          <AssessmentItemScreenSegments
            trainScore={trainScore["rules_result"]}
            textInputValues={textInputValues}
            setTextInputValues={setTextInputValues}
            isFinished={isFinished}
          />
        );
      } else {
        return (
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: 20,
              margin: 20,
              top: "-10%",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "400",
                color: "rgb(204,204,204)",
                marginTop: 28,
              }}
            >
              无评估项
            </Text>
          </View>
        );
      }
    case "3":
      if (overLimit) {
        return <TimeReviewScreen trains={overLimit} />;
      }
    case "4":
      // return <SopShowScreen trains={trainScore} />;
      return <SopShowScreen trains={{ sop_result: trainScore }} />;
    default:
      return (
        <View>
          <Text>Invalid page</Text>
        </View>
      );
  }
};

export default RenderPage;

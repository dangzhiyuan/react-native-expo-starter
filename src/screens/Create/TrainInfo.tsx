import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "@/themes/ThemeProvider";

interface TrainInfoProps {
  currentTrainName: string;
  trainingButtonText: string;
  onStartTraining: () => void;
}

const TrainInfo: React.FC<TrainInfoProps> = ({
  currentTrainName,
  trainingButtonText,
  onStartTraining,
}) => {
  const { theme } = useTheme();

  return (
    <View style={styles.footer}>
      <Text style={styles.trainInfo}>{currentTrainName}</Text>
      <TouchableOpacity style={styles.trainButton} onPress={onStartTraining}>
        <Text style={styles.startTrain}>{trainingButtonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white", // 根据主题调整
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: "gray", // 根据主题调整
  },
  trainInfo: {
    fontSize: 16,
    color: "black", // 根据主题调整
    marginLeft: 8,
  },
  trainButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  startTrain: {
    fontSize: 16,
  },
});

export default TrainInfo;

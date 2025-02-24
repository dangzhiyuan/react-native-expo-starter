import React from "react";
import { View, StyleSheet } from "react-native";
import TakeoffStep from "./TakeoffStep";

interface ChildrenListProps {
  selectedScene: { children: string[] };
  filteredLessons: any[]; // 根据实际数据类型调整
  setSelectedLessonName: (name: string | null) => void;
  setCategoryInfo: (info: string) => void;
  trainingButtonText: string;
}

const ChildrenList: React.FC<ChildrenListProps> = ({
  selectedScene,
  filteredLessons,
  setSelectedLessonName,
  setCategoryInfo,
  trainingButtonText,
}) => {
  if (!selectedScene || !selectedScene.children) return null;

  return (
    <View style={styles.childrenContainer}>
      {selectedScene.children.map((child, index) => (
        <TakeoffStep
          key={index}
          trainType={child}
          lessons={filteredLessons}
          onLessonSelect={setSelectedLessonName}
          handleLessonDescription={setCategoryInfo}
          trainingButtonText={trainingButtonText}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  childrenContainer: {
    marginTop: 10,
  },
});

export default ChildrenList;

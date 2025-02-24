import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import i18n from "../locales";
import { useLanguage } from "../utils/LanguageContext";
import { COLORS } from "../themes/themes";

interface Props {
  trainType: string;
  lessons: Lesson[];
  onLessonSelect: (lessonName: string) => void;
  handleLessonDescription: (description: string | undefined) => void;
  trainingButtonText: string;
}

interface Lesson {
  lesson_id: number;
  lesson_name: string;
  lesson_name_en?: string;
  description?: string;
  description_en?: string;
  trainingButtonText?: string;
}

const TakeoffStep = ({
  trainType,
  lessons,
  onLessonSelect,
  handleLessonDescription,
  trainingButtonText,
}: Props) => {
  const { currentLanguage } = useLanguage();
  const [selectedItem, setSelectedItem] = useState<Lesson | null>(null);
  const flatListRef = useRef<FlatList<Lesson> | null>(null);

  console.log("lessons***", trainType);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    }
  }, [lessons]);

  useEffect(() => {
    setSelectedItem(null);
  }, [trainType, lessons]);

  const handleItemSelect = (item: Lesson) => {
    console.log("item***", item);
    setSelectedItem(item);
    if (currentLanguage === "en") {
      onLessonSelect(item.lesson_name_en);
      handleLessonDescription(item.description_en);
    } else {
      onLessonSelect(item.lesson_name);
      handleLessonDescription(item.description);
    }
  };

  if (typeof trainType === "undefined") {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {i18n.t("lesson")}: {trainType}
        </Text>
      </View>
      <FlatList
        ref={flatListRef}
        showsHorizontalScrollIndicator={false}
        data={lessons}
        key={lessons.length}
        extraData={selectedItem}
        scrollEnabled={trainingButtonText !== i18n.t("touchScore")}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              selectedItem === item ? styles.tabActive : styles.tabInactive,
            ]}
            onPress={() => {
              handleItemSelect(item);
            }}
            disabled={trainingButtonText === i18n.t("touchScore")}
          >
            <Text
              style={
                selectedItem && selectedItem.lesson_id === item.lesson_id
                  ? styles.selectedLessonName
                  : styles.unselectedLessonName
              }
            >
              {currentLanguage === "zh"
                ? item.lesson_name
                : item.lesson_name_en}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.lesson_id.toString()}
        horizontal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  header: {
    padding: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "500",
    color: "rgb(204,204,204)",
  },
  lessonItem: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
  },
  lessonText: {
    color: "#000",
    fontSize: 20,
  },
  tabInactive: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 11,

    width: 176,
    height: 68,
    opacity: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: COLORS.background,
  },
  tabActive: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 11,

    width: 176,
    height: 68,
    opacity: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: COLORS.button1,
  },
  selectedLessonName: {
    opacity: 1,
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 28.96,
    color: COLORS.buttonText,
    textAlign: "left",
    verticalAlign: "top",
  },
  unselectedLessonName: {
    opacity: 1,
    fontSize: 18,
    fontWeight: "500",
    letterSpacing: 0,
    lineHeight: 28.96,
    color: COLORS.secondary,
    textAlign: "left",
    verticalAlign: "top",
  },
});

export default TakeoffStep;

import React, { useState, useRef, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { Text } from "@/components/Text/Text";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/themes/ThemeProvider";
import { fontSizes, scale, spacing } from "@/utils/responsive";

interface Lesson {
  lesson_id: number;
  lesson_name: string;
  lesson_name_en: string;
  description: string;
  description_en: string;
}

interface Props {
  trainType: string;
  lessons: Lesson[];
  onLessonSelect: (lessonName: string) => void;
  handleLessonDescription: (description: string) => void;
  trainingButtonText: string;
}

export const TakeoffStep = ({
  trainType,
  lessons,
  onLessonSelect,
  handleLessonDescription,
  trainingButtonText,
}: Props) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [selectedItem, setSelectedItem] = useState<Lesson | null>(null);
  const flatListRef = useRef<FlatList<Lesson> | null>(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    }
  }, [lessons]);

  useEffect(() => {
    setSelectedItem(null);
  }, [trainType, lessons]);

  const handleItemSelect = (item: Lesson) => {
    setSelectedItem(item);
    if (i18n.language === "en") {
      onLessonSelect(item.lesson_name_en);
      handleLessonDescription(item.description_en);
    } else {
      onLessonSelect(item.lesson_name);
      handleLessonDescription(item.description);
    }
  };

  const styles = StyleSheet.create({
    container: {
      marginVertical: spacing.md,
      paddingHorizontal: spacing.lg,
    },
    header: {
      marginBottom: spacing.md,
    },
    headerText: {
      fontSize: fontSizes.h3,
      fontWeight: "600",
      color: theme.text.primary,
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
      backgroundColor: "rgba(90, 145, 204, 1)",
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
      backgroundColor: "white",
    },
    selectedLessonName: {
      color: theme.text.inverse,
      fontSize: fontSizes.body,
      fontWeight: "500",
    },
    unselectedLessonName: {
      color: theme.text.primary,
      fontSize: fontSizes.body,
    },
  });

  if (!trainType) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {t("lesson")}: {trainType}
          1111111111
        </Text>
      </View>
      <FlatList
        ref={flatListRef}
        showsHorizontalScrollIndicator={false}
        data={lessons}
        keyExtractor={(item) => item.lesson_id.toString()}
        horizontal
        scrollEnabled={trainingButtonText !== t("touchScore")}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              selectedItem?.lesson_id === item.lesson_id
                ? styles.tabActive
                : styles.tabInactive,
            ]}
            onPress={() => handleItemSelect(item)}
            disabled={trainingButtonText === t("touchScore")}
          >
            <Text
              style={
                selectedItem?.lesson_id === item.lesson_id
                  ? styles.selectedLessonName
                  : styles.unselectedLessonName
              }
            >
              {i18n.language === "zh" ? item.lesson_name : item.lesson_name_en}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default TakeoffStep;

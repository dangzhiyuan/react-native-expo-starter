import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import SceneButton from "./SceneButton";
import ChildrenList from "./ChildrenList";
import TrainInfo from "./TrainInfo";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/themes/ThemeProvider";
import { Text } from "@/components/Text/Text";
import {
  spacing,
  scale,
  moderateScale,
  fontSizes,
  isTablet,
} from "@/utils/responsive";

interface Scene {
  id: string;
  name: string;
  children?: string[];
}

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const CreateTrain = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [currentPage, setCurrentPage] = useState<string>("");
  const [selectedLessonName, setSelectedLessonName] = useState<string | null>(
    null
  );
  const [categoryInfo, setCategoryInfo] = useState("");
  const subjectListRef = useRef<FlatList>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 场景数据
  const sceneData: Scene[] = [
    {
      id: "1",
      name: "单一本场",
      children: [],
    },
    {
      id: "2",
      name: "连续本场",
      children: [],
    },
    {
      id: "3",
      name: "起飞",
      children: ["起飞-1", "起飞-2"],
    },
    {
      id: "4",
      name: "着陆",
      children: ["着陆-1", "着陆-2", "着陆-3", "着陆-4"],
    },
  ];

  const getCurrentScene = () => {
    return sceneData.find((scene) => scene.id === currentPage);
  };

  const getCurrentSceneChildren = () => {
    const currentScene = getCurrentScene();
    return currentScene?.children || [];
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    content: {
      flex: 1,
    },
    section: {
      paddingVertical: spacing.md,
    },
    sectionTitle: {
      fontSize: fontSizes.h3,
      color: theme.text.primary,
      marginBottom: spacing.md,
      paddingHorizontal: spacing.md,
    },
    sceneList: {
      paddingHorizontal: spacing.md,
    },
    subjectSection: {
      marginTop: spacing.md,
    },
    scrollContent: {
      flex: 1,
    },
    description: {
      marginTop: spacing.xs,
      padding: spacing.lg,
    },
    descriptionText: {
      fontSize: fontSizes.small,
      color: theme.text.primary,
      lineHeight: scale(20),
      fontWeight: "400",
      textAlign: "justify",
      marginBottom: spacing.md,
    },
    imageContainer: {
      top: "-5%",
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: spacing.lg,
    },
    flightPath: {
      width: "100%",
      height: scale(300),
      resizeMode: "contain",
    },
    subjectButton: {
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.md,
      backgroundColor: theme.surface,
      borderRadius: moderateScale(8),
      marginRight: spacing.sm,
      borderWidth: 1,
      borderColor: theme.border,
      minWidth: scale(100),
      alignItems: "center",
      justifyContent: "center",
      height: scale(36),
    },
    selectedSubject: {
      backgroundColor: theme.primary,
      borderColor: theme.primary,
    },
    subjectText: {
      fontSize: fontSizes.small,
      color: theme.text.primary,
    },
    selectedSubjectText: {
      color: theme.text.inverse,
      fontWeight: "500",
    },
  });

  const handleScenePress = (sceneId: string) => {
    setCurrentPage(sceneId);
    setSelectedLessonName(null);
    // 重置科目列表的滚动位置
    subjectListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const renderSceneItem = ({ item }: { item: Scene }) => (
    <SceneButton
      item={item}
      isSelected={currentPage === item.id}
      onPress={() => handleScenePress(item.id)}
    />
  );

  const renderSubjectItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[
        styles.subjectButton,
        selectedLessonName === item && styles.selectedSubject,
      ]}
      onPress={() => {
        setSelectedLessonName(item);
        setCategoryInfo(`${item}的训练描述`);
      }}
    >
      <Text
        style={[
          styles.subjectText,
          selectedLessonName === item && styles.selectedSubjectText,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  const handleStartTraining = async () => {
    const currentScene = getCurrentScene();
    if (!currentScene) return;

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Start training error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>场景选择</Text>
          <FlatList
            data={sceneData}
            renderItem={renderSceneItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.sceneList}
          />
        </View>

        {getCurrentSceneChildren().length > 0 && (
          <View style={styles.subjectSection}>
            <Text style={styles.sectionTitle}>科目</Text>
            <FlatList
              ref={subjectListRef}
              data={getCurrentSceneChildren()}
              renderItem={renderSubjectItem}
              keyExtractor={(item) => item}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.sceneList}
            />
          </View>
        )}

        <ScrollView
          style={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.description}>
            <Text style={styles.descriptionText}>
              此平台为飞行训练平台，需完成机场气象条件满足目标跑道的结束条件，才可以执行目标跑道起飞程序，起飞机场高度为450米（高于机场跑道）或以上。
              如气象条件不满足目标跑道结束条件，则必须考虑改飞行，并需收集最新气象进行评估。在飞行训练时间内，应按照现实中的目标实施，不允许为追求高分而进行重复练习。
            </Text>
          </View>

          <View style={styles.imageContainer}>
            <Image
              source={require("../../../assets/images/trainIntro.png")}
              style={styles.flightPath}
            />
          </View>
        </ScrollView>
      </View>

      <TrainInfo
        currentTrainName={selectedLessonName || "请选择训练科目"}
        sceneName={getCurrentScene()?.name || null}
        hasChildren={getCurrentSceneChildren().length > 0}
        onStartTraining={handleStartTraining}
        trainingButtonText={selectedLessonName ? "开始训练" : "请选择训练科目"}
        disabled={
          !currentPage ||
          (getCurrentSceneChildren().length > 0 && !selectedLessonName)
        }
        loading={isLoading}
      />
    </View>
  );
};

export default CreateTrain;

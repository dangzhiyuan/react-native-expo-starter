import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ScrollView } from "react-native";
import SceneButton from "./SceneButton";
import ChildrenList from "./ChildrenList";
import TrainInfo from "./TrainInfo";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/themes/ThemeProvider";
import CustomModal from "@/components/CustomModal";
import Logo from "@/components/Logo/Logo";

const CreateTrain = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [currentPage, setCurrentPage] = useState("1");
  const [currentTrainName, setCurrentTrainName] = useState("训练名称");
  const [categoryInfo, setCategoryInfo] = useState("训练描述");
  const [filteredLessons, setFilteredLessons] = useState([]);
  const [selectedLessonName, setSelectedLessonName] = useState<string | null>(
    null
  );
  const [visible, setVisible] = useState(false);
  const [trainingButtonText, setTrainingButtonText] = useState(t("开始训练"));
  const [disable, setDisable] = useState(false);
  const [selectedScene, setSelectedScene] = useState(null);

  // 假数据
  const updatedData = [
    { id: "1", name: "场景一", children: ["子场景1-1", "子场景1-2"] },
    { id: "2", name: "场景二", children: ["子场景2-1", "子场景2-2"] },
    { id: "3", name: "场景三", children: ["子场景3-1", "子场景3-2"] },
  ];

  const renderButton = ({ item }) => (
    <SceneButton
      item={item}
      isSelected={currentPage === item.id}
      onPress={() => {
        setCurrentPage(item.id);
        setSelectedLessonName("");
        setSelectedScene(item);
      }}
    />
  );

  const hideModal = () => setVisible(false);

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <Text style={{ fontSize: 24, color: theme.text.primary }}>
        {t("home.createTrain")}
      </Text>

      <View style={{ padding: 10, flexDirection: "row" }}>
        <FlatList
          data={updatedData}
          renderItem={renderButton}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <ChildrenList
        selectedScene={selectedScene}
        filteredLessons={filteredLessons}
        setSelectedLessonName={setSelectedLessonName}
        setCategoryInfo={setCategoryInfo}
        trainingButtonText={trainingButtonText}
      />
      <ScrollView style={{ padding: 16 }}>
        <Text style={{ fontSize: 18, color: theme.text.secondary }}>
          {categoryInfo}
        </Text>
      </ScrollView>
      <TrainInfo
        currentTrainName={currentTrainName}
        trainingButtonText={trainingButtonText}
        onStartTraining={() => {
          /* 开始训练逻辑 */
        }}
      />

      <CustomModal
        visible={visible}
        onDismiss={hideModal}
        title={t("modalTitle")}
        description={t("modalDescription")}
        onConfirm={() => {
          // 处理确认逻辑
        }}
      />
    </View>
  );
};

export default CreateTrain;

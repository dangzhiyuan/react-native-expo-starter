import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import i18n from "../../locales";
import { COLORS } from "../settingScreens/theme";

const StageTabMenu = ({
  item,
  isActive,
  onSetActiveBBCTab,
  fetchAndSetSegmentData,
}) => {
  const minutes = Math.floor(item.duration_time / 60);
  const seconds = item.duration_time % 60;
  const formattedDuration =
    item.duration_time > 60
      ? `${minutes}${i18n.t("minutes")}${seconds}${i18n.t("seconds")}`
      : `${item.duration_time}s`;

  return (
    <TouchableOpacity
      style={[styles.tabButton, isActive ? styles.activeTab : null]}
      onPress={() => {
        console.log("iiiiiiii",item.segment_id);
        onSetActiveBBCTab(item.segment_id);
        fetchAndSetSegmentData(item.segment_id);
      }}
    >
      <Text style={styles.tabButtonIdent}>{item.ident}</Text>
      <Text style={styles.tabButtonStart}>
        {item.begin_time}~{item.end_time}
      </Text>
      <Text style={styles.tabButtonDuration}>
        {i18n.t("duration")} {formattedDuration}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tabButton: {
    width: 166,
    height: 89,
    backgroundColor: "rgba(25, 29, 40, 1)",
    alignItems: "center",
    justifyContent: "center",
  },
  activeTab: {
    backgroundColor: "rgba(10, 12, 16, 1)",
    borderBottomWidth: 3,
    borderBottomColor: COLORS.secondary,
  },
  tabButtonIdent: {
    fontSize: 20,
    color: "rgba(240, 245, 255, 1)",
    fontWeight: "500",
  },
  tabButtonStart: {
    fontSize: 13,
    color: "rgba(240, 245, 255, 1)",
    fontWeight: "300",
  },
  tabButtonDuration: {
    fontSize: 13,
    color: "rgba(240, 245, 255, 1)",
    fontWeight: "300",
  },
});

export default StageTabMenu;

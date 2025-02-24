import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, FONTS } from "./theme";
import { PaperProvider } from "react-native-paper";
import SwitchDarkModal from "./settingModals/SwitchDarkModal";
import { set } from "react-native-reanimated";
import SwitchColorModal from "./settingModals/SwitchColorModal";

type SettingScreenProps = {
  navigation: any;
  backgroundColor: string;
};

export default function SettingScreen({
  navigation,
  backgroundColor,
}: SettingScreenProps) {
  const [openDarkModal, setOpenDarkModal] = useState(false);
  const [openColorModal, setOpenColorModal] = useState(false);

  const navigateToEditProfile = () => {
    navigation.navigate("HelloWorld");
  };
  const navigateToNotifications = () => {
    navigation.navigate("SettingColors");
  };

  const navigateToSubscription = () => {
    console.log("Subscription function");
    navigation.navigate("SettingColors");
  };

  const openSwitchColorModal = () => {
    setOpenColorModal(true);
    console.log("Open Switch Color Modal");
  };

  const openSwitchDarkModal = () => {
    setOpenDarkModal(true);
    console.log("Open Switch Dark Modal");
  };

  const accountItems = [
    {
      icon: "person-outline",
      text: "修改资料",
      action: navigateToEditProfile,
    },
    { icon: "security", text: "登录会话", action: navigateToEditProfile },
    {
      icon: "notifications-none",
      text: "注销账号",
      action: navigateToNotifications,
    },
  ];

  const supportItems = [
    {
      icon: "format-line-style",
      text: "主题风格",
      action: openSwitchColorModal,
    },
    {
      icon: "theme-light-dark",
      text: "Dark模式",
      action: openSwitchDarkModal,
    },
    {
      icon: "alpha",
      text: "语言",
      action: navigateToEditProfile,
    },
  ];

  const cacheAndCellularItems = [
    {
      icon: "delete-outline",
      text: "数字密码",
      action: navigateToEditProfile,
    },
    { icon: "save-alt", text: "指纹解锁", action: navigateToEditProfile },
  ];

  const actionsItems = [
    {
      icon: "numeric",
      text: "版本号",
      action: navigateToEditProfile,
    },
    { icon: "playlist-check", text: "服务条款", action: navigateToEditProfile },
    { icon: "security", text: "隐私政策", action: navigateToEditProfile },
  ];

  const renderSettingsItem = ({ icon, text, action }) => (
    <TouchableOpacity
      onPress={action}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingLeft: 12,
        backgroundColor: COLORS.gray,
      }}
    >
      <MaterialCommunityIcons name={icon} size={24} color="black" />
      <Text
        style={{
          marginLeft: 36,
          ...FONTS.semiBold,
          fontWeight: 600,
          fontSize: 16,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );

  return (
    <PaperProvider>
      <SwitchDarkModal
        backgroundColor={backgroundColor}
        openModal={openDarkModal}
        setOpenModal={setOpenDarkModal}
      />

      <SwitchColorModal
        openModal={openColorModal}
        setOpenModal={setOpenColorModal}
      />

      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
        }}
      >
        <View
          style={{
            marginHorizontal: 12,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              position: "absolute",
              left: 0,
            }}
          >
            <MaterialIcons
              name="keyboard-arrow-left"
              size={24}
              color={COLORS.black}
            />
          </TouchableOpacity>

          <Text style={{ ...FONTS.h3 }}>Settings</Text>
        </View>

        <ScrollView style={{ marginHorizontal: 12 }}>
          {/* Account Settings */}
          {/* <View style={{ marginBottom: 12 }}>
          <Text style={{ ...FONTS.h4, marginVertical: 10 }}>账号</Text>
          <View
            style={{
              borderRadius: 12,
              backgroundColor: COLORS.gray,
            }}
          >
            {accountItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View> */}

          {/* Support and About settings */}

          <View style={{ marginBottom: 12 }}>
            <Text style={{ ...FONTS.h4, marginVertical: 10 }}>选项</Text>
            <View
              style={{
                borderRadius: 12,
                backgroundColor: COLORS.gray,
              }}
            >
              {supportItems.map((item, index) => (
                <React.Fragment key={index}>
                  {renderSettingsItem(item)}
                </React.Fragment>
              ))}
            </View>
          </View>

          {/* Cache & Cellular */}
          {/* <View style={{ marginBottom: 12 }}>
          <Text style={{ ...FONTS.h4, marginVertical: 10 }}>安全</Text>
          <View
            style={{
              borderRadius: 12,
              backgroundColor: COLORS.gray,
            }}
          >
            {cacheAndCellularItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View> */}

          <View style={{ marginBottom: 12 }}>
            <Text style={{ ...FONTS.h4, marginVertical: 10 }}>关于软件</Text>
            <View
              style={{
                borderRadius: 12,
                backgroundColor: COLORS.gray,
              }}
            >
              {actionsItems.map((item, index) => (
                <React.Fragment key={index}>
                  {renderSettingsItem(item)}
                </React.Fragment>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
}

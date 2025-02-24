import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  TextInput as RNTextInput,
  ScrollView,
} from "react-native";
import { Text } from "../../components/Text/Text";
import { useTheme } from "../../themes/ThemeProvider";
import { useNavigation } from "@react-navigation/native";
import type { CompositeNavigationProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { DrawerNavigationProp } from "@react-navigation/drawer";
import type {
  HomeStackParamList,
  DrawerParamList,
  RootStackParamList,
} from "@/navigation/types";
import { useResponsive, isTablet, screenWidth } from "../../utils/responsive";
import { useNetwork } from "../../contexts/NetworkProvider";
import { useTranslation } from "react-i18next";
import Button from "../../components/Button/Button";
import { MenuListItem } from "./MenuListItem";
import {
  spacing,
  fontSizes,
  scale,
  moderateScale,
} from "../../utils/responsive";
import { BlockButton } from "@/components/Button/BlockButton";
import { ProfileHeader } from "../../components/profile/ProfileHeader";
import { Modal, ModalContent, ModalFooter } from "../../components/Modal";
import { version } from "../../../package.json";
import { useAuthStore } from "@/store/authStore";
import { TextInput } from "@/components/TextInput";
import Logo from "../../components/Logo/Logo";
import Background from "@/components/layout/Background";
import { CommonActions } from "@react-navigation/native";

type HomeScreenNavigationProp = CompositeNavigationProp<
  CompositeNavigationProp<
    NativeStackNavigationProp<HomeStackParamList, "Home">,
    DrawerNavigationProp<DrawerParamList>
  >,
  NativeStackNavigationProp<RootStackParamList>
>;

export const HomeScreen = () => {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { isConnected, connectionType, withNetworkCheck } = useNetwork();
  const { device, layout } = useResponsive();
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [targetSimulator, setTargetSimulator] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const logout = useAuthStore((state) => state.logout);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [debugLoading, setDebugLoading] = useState(false);

  const handleRefresh = async () => {
    try {
      await withNetworkCheck(
        async () => {
          // 刷新逻辑
        },
        { useFallback: true }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDoubleTap = () => {
    // 处理双击
  };

  const handleImportantAction = async () => {
    await withNetworkCheck(async () => {
      // 重要操作逻辑
    });
  };

  const CreateTraining = () => {
    navigation.navigate("CreateTrain");
  };

  const history = () => {
    // 实现历史记录的逻辑
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "zh" : "en";
    i18n.changeLanguage(newLang);
  };

  const handleLogoutPress = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = async () => {
    setLogoutLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await logout();
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Auth" }],
        })
      );
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLogoutLoading(false);
      setShowLogoutModal(false);
    }
  };

  const getCurrentLanguage = () => {
    return i18n.language === "en" ? "English" : "中文";
  };

  const handleFabPress = () => {
    setModalVisible(true);
  };

  const handleModalSubmit = async () => {
    setIsLoading(true);

    try {
      // 模拟异步操作
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // 模拟成功
      setModalVisible(false);
      setInputValue("");
      setTargetSimulator("");
    } catch (error) {
      // 处理错误
      console.error("Modal submit error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    mainContainer: {
      flex: 1,
      padding: spacing.lg,
      marginBottom: spacing.lg,
    },
    scrollContent: {
      flexGrow: 1,
    },
    logo: {
      top: -spacing.sm,
      left: spacing.xs,
      width: screenWidth * 0.2,
      resizeMode: "contain",
    },
    buttonsContainer: {
      flexDirection: device === "tablet" ? "row" : "column",
      justifyContent: "space-between",
      alignItems: "stretch",
      marginBottom: spacing.md,
      width: "100%",
      ...(device === "tablet"
        ? {
            gap: spacing.sm,
            marginTop: spacing.md,
          }
        : {
            gap: spacing.lg,
            marginTop: -spacing.lg,
          }),
    },
    settingsSection: {
      paddingTop: spacing.md,
      marginBottom: spacing.lg * 3,
    },
    settingsTitle: {
      fontSize: fontSizes.h3,
      fontWeight: "600",
      marginBottom: spacing.md,
      color: theme.text.primary,
    },
    settingsCard: {
      backgroundColor: theme.surface,
      borderRadius: moderateScale(12),
      padding: spacing.lg,
      elevation: 2,
    },
    fab: {
      position: "absolute",
      right: spacing.lg,
      bottom: spacing.lg,
      width: isTablet ? scale(26) : scale(50),
      height: isTablet ? scale(26) : scale(50),
      borderRadius: scale(28),
      backgroundColor: theme.border,
      justifyContent: "center",
      alignItems: "center",
      elevation: 4,
    },
    fabIcon: {
      fontSize: fontSizes.h2,
      color: theme.text.inverse,
    },
    input: {
      width: "100%",
      height: scale(48),
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: moderateScale(8),
      marginBottom: spacing.md,
      paddingHorizontal: spacing.md,
      color: theme.text.primary,
      backgroundColor: theme.background,
    },
    modalContent: {
      width: "100%",
      gap: spacing.lg,
    },
    modalInput: {
      width: "100%",
      height: scale(48),
      backgroundColor: theme.background,
      borderRadius: moderateScale(8),
      borderWidth: 1,
      borderColor: theme.border,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      color: theme.text.primary,
      fontSize: fontSizes.body,
    },
    modalFooter: {
      flexDirection: "row",
      justifyContent: "center",
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      gap: spacing.md,
    },
    modalButton: {
      minWidth: scale(120),
    },
  });

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <Image
        style={{ position: "absolute", width: "100%" }}
        source={require("../../../assets/images/mainBack.png")}
        resizeMode="cover"
      />
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={require("../../../assets/logo3.png")}
          style={styles.logo}
        />
        <ProfileHeader />
        <View style={styles.buttonsContainer}>
          <BlockButton
            backgroundColor={theme.other?.button1}
            title={t("home.createTrain")}
            onPress={CreateTraining}
            backgroundImage={require("../../../assets/mainCreate.png")}
            icon={require("../../../assets/intro.png")}
          />

          <BlockButton
            backgroundColor={theme.other?.button2}
            title={t("home.history")}
            onPress={history}
            backgroundImage={require("../../../assets/mainHistory.png")}
            icon={require("../../../assets/intro.png")}
          />
        </View>
        <View style={styles.settingsSection}>
          <Text style={styles.settingsTitle}>{t("home.settings")}</Text>
          <View style={styles.settingsCard}>
            <MenuListItem
              icon={require("../../../assets/language.png")}
              text={t("home.language")}
              onPress={toggleLanguage}
              textColor={theme.text.primary}
              rightText={getCurrentLanguage()}
            />
            <MenuListItem
              icon={require("../../../assets/account.png")}
              text={t("home.account")}
              textColor={theme.text.primary}
              onPress={handleLogoutPress}
              rightText={t("logout.logout")}
            />
            <MenuListItem
              icon={require("../../../assets/version.png")}
              text={t("home.version")}
              showBorder={false}
              textColor={theme.text.primary}
              rightText={`v${version}`}
            />
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={handleFabPress}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        closeOnBackdropPress={true}
        onDismiss={() => !isLoading && setModalVisible(false)}
        title={t("auth.DebugModal")}
        avoidKeyboard
      >
        <ModalContent>
          <View style={styles.modalContent}>
            <TextInput
              placeholder={t("auth.sessionId")}
              placeholderTextColor={theme.text.disabled}
              value={inputValue}
              onChangeText={setInputValue}
            />

            <TextInput
              placeholder={t("auth.simulatorUrl")}
              placeholderTextColor={theme.text.disabled}
              value={targetSimulator}
              onChangeText={setTargetSimulator}
            />
          </View>
        </ModalContent>
        <ModalFooter>
          <View style={styles.modalFooter}>
            <Button
              title={t("common.confirm")}
              variant="secondary"
              onPress={handleModalSubmit}
              loading={isLoading}
              style={styles.modalButton}
              textStyle={{ fontSize: fontSizes.h3 }}
            />
          </View>
        </ModalFooter>
      </Modal>

      <Modal
        visible={showLogoutModal}
        showCloseButton={false}
        onDismiss={() => !logoutLoading && setShowLogoutModal(false)}
        title={t("logout.confirmTitle")}
        closeOnBackdropPress={!logoutLoading}
      >
        <ModalContent scrollable={false}>
          <Text
            style={{
              fontSize: fontSizes.body,
              color: theme.text.primary,
              textAlign: "center",
              marginVertical: spacing.lg * 2,
            }}
          >
            {t("logout.confirmMessage")}
          </Text>
        </ModalContent>
        <ModalFooter>
          <View
            style={{
              flexDirection: "row",
              gap: spacing.md,
              justifyContent: "center",
            }}
          >
            <Button
              title={t("common.cancel")}
              variant="outline"
              onPress={() => setShowLogoutModal(false)}
              disabled={logoutLoading}
              style={[logoutLoading && { opacity: 0.5 }]}
              textStyle={{ fontSize: fontSizes.h3 }}
            />
            <Button
              title={t("common.confirm")}
              variant="secondary"
              onPress={handleLogoutConfirm}
              loading={logoutLoading}
              textStyle={{ fontSize: fontSizes.h3 }}
            />
          </View>
        </ModalFooter>
      </Modal>
    </SafeAreaView>
  );
};

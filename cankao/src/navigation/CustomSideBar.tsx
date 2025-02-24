import React from "react";
import images from "../themes/images";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { userStore } from "../stroages/userStorage";
import i18n from "../locales";
import { useLanguage } from "../utils/LanguageContext";
import { COLORS } from "../themes/themes";

const { width, height } = Dimensions.get("window");

const CustomSidebar = (props) => {
  const u = userStore();
  const { currentLanguage, toggleLanguage } = useLanguage();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(35, 40, 56, 1)" }}>
      <View>
        <View style={styles.header}>
          <View>
            <Image
              source={require("../../assets/images/icon2.png")}
              style={[styles.sideMenuProfileIcon, { resizeMode: "contain" }]}
            />
          </View>
          <Text style={styles.title}>
            {i18n.t("teacher")}
            {userStore.getState().loginInfo}
          </Text>
        </View>
      </View>
      <DrawerContentScrollView {...props}>
        {/* <DrawerItemList {...props} /> */}
        <View style={styles.settingsContainer}>
          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.footerItem, styles.borderBottom]}
              onPress={toggleLanguage}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image source={require("../../assets/images/language.png")} />
                <Text
                  style={{
                    color: "rgba(197, 205, 222, 1)",
                    fontSize: 24,
                    fontWeight: "500",
                    marginLeft: 10,
                  }}
                >
                  {i18n.t("language")}
                </Text>
              </View>
              <Text
                style={{
                  color: "rgba(197, 205, 222, 1)",
                  fontSize: 24,
                  fontWeight: "500",
                }}
              >
                {">"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.footerItem, styles.borderBottom]}
              onPress={() => u.logout()}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image source={require("../../assets/images/account.png")} />
                <Text
                  style={{
                    color: "rgba(197, 205, 222, 1)",
                    fontSize: 24,
                    fontWeight: "500",
                    marginLeft: 10,
                  }}
                >
                  {i18n.t("account")}
                </Text>
              </View>
              <Text
                style={{
                  color: "rgba(197, 205, 222, 1)",
                  fontSize: 24,
                  fontWeight: "500",
                }}
              >
                {">"}
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={styles.homeButton}
              onPress={() => setSelectedItem(null)}
            >
              <Text style={{ fontSize: 20, fontWeight: "400", color: "black" }}>
                {i18n.t("back")}
              </Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </DrawerContentScrollView>
      <Text
        style={{
          fontSize: 16,
          textAlign: "center",
          color: "grey",
          marginBottom: height * 0.05,
        }}
      >
        上海华模科技有限公司
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: "center",
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: "center",
    marginRight: 15,
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  logoutText: {
    color: "white",
    marginRight: 10,
  },
  settingsContainer: {
    width: "100%",
    padding: 10,
    borderRadius: 20,
  },
  settingText: {
    left: width * 0.05,
    opacity: 1,
    fontSize: 20,
    fontWeight: "500",
    lineHeight: 28.96,
    color: COLORS.secondary,
  },
  footer: {
    margin: width * 0.02,
    marginTop: 20,
    backgroundColor: COLORS.background,
    padding: 10,
    borderRadius: 20,
    height: 273,
  },
  footerItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    height: 91,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: height * 0.05,
    marginTop: height * 0.05,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    lineHeight: 28.96,
    color: COLORS.buttonText,
  },
  hmeButton: {
    width: 30,
    height: 30,
    borderRadius: 100 / 2,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomSidebar;

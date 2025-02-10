import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import zh from "./locales/zh";
import en from "./locales/en";

const LANGUAGE_KEY = "@language";

export const resources = {
  zh: {
    translation: zh,
  },
  en: {
    translation: en,
  },
} as const;

export type Language = keyof typeof resources;

const getStoredLanguage = async () => {
  try {
    return (await AsyncStorage.getItem(LANGUAGE_KEY)) as Language | null;
  } catch (error) {
    console.error("Failed to get stored language:", error);
    return null;
  }
};

export const setStoredLanguage = async (lng: Language) => {
  try {
    await AsyncStorage.setItem(LANGUAGE_KEY, lng);
  } catch (error) {
    console.error("Failed to store language:", error);
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: Localization.locale.split("-")[0],
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

// 初始化时加载存储的语言设置
getStoredLanguage().then((lng) => {
  if (lng) {
    i18n.changeLanguage(lng);
  }
});

export default i18n;

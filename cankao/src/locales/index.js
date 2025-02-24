import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./languages/enUS.json";
import zh from "./languages/zhCN.json";

const resources = {
  en: {
    translation: en,
  },
  zh: {
    translation: zh,
  },
};

i18n.use(initReactI18next).init(
  {
    compatibilityJSON: "v3",
    resources,
    fallbackLng: "zh",
    interpolation: {
      escapeValue: false,
    },
  },
  (err) => {
    if (err) throw err;
    i18n.setLocalLanguage = function (value) {
      this.changeLanguage(value);
    };
    i18n.setLocalLanguage(i18n.language);
  }
);

export default i18n;

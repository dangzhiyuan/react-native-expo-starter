import { create } from "zustand";
import i18n, { Language, setStoredLanguage } from "../i18n";

interface LanguageState {
  currentLanguage: Language;
  setLanguage: (language: Language) => Promise<void>;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  currentLanguage: i18n.language as Language,
  setLanguage: async (language: Language) => {
    await setStoredLanguage(language);
    await i18n.changeLanguage(language);
    set({ currentLanguage: language });
  },
}));

export const SUPPORTED_LANGUAGES = ['en', 'zh'] as const;
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

export const SUPPORTED_THEMES = ['default', 'blue', 'orange'] as const;
export type SupportedTheme = typeof SUPPORTED_THEMES[number]; 
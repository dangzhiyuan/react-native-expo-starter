import * as Analytics from "expo-firebase-analytics";

export const analyticsService = {
  trackScreen: (screenName: string) => {
    Analytics.logEvent("screen_view", {
      screen_name: screenName,
    });
  },

  trackEvent: (eventName: string, params?: Record<string, any>) => {
    Analytics.logEvent(eventName, params);
  },

  setUserProperties: (properties: Record<string, any>) => {
    Object.entries(properties).forEach(([key, value]) => {
      Analytics.setUserProperty(key, String(value));
    });
  },
};

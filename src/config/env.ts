import Constants from "expo-constants";

type Environment = "development" | "staging" | "production";

interface EnvConfig {
  API_URL: string;
  APP_ENV: Environment;
  VERSION: string;
  BUILD_NUMBER: string;
}

const ENV = {
  development: {
    API_URL: "http://localhost:3000",
    APP_ENV: "development",
    VERSION: Constants.expoConfig?.version || "1.0.0",
    BUILD_NUMBER: Constants.expoConfig?.ios?.buildNumber || "1",
  },
  staging: {
    API_URL: "https://staging-api.example.com",
    APP_ENV: "staging",
    VERSION: Constants.expoConfig?.version || "1.0.0",
    BUILD_NUMBER: Constants.expoConfig?.ios?.buildNumber || "1",
  },
  production: {
    API_URL: "https://api.example.com",
    APP_ENV: "production",
    VERSION: Constants.expoConfig?.version || "1.0.0",
    BUILD_NUMBER: Constants.expoConfig?.ios?.buildNumber || "1",
  },
} as const;

export const getEnvVars = (): EnvConfig => {
  const env = process.env.APP_ENV || "development";
  return ENV[env as Environment];
};

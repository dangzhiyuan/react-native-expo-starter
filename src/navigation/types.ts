import type { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
  Auth: undefined;
  App: undefined;
  Main: NavigatorScreenParams<DrawerParamList>;
};

export type HomeStackParamList = {
  Home: undefined;
  CreateTrain: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type DrawerParamList = {
  HomeStack: NavigatorScreenParams<HomeStackParamList>;
  Profile: undefined;
  Components: undefined;
  Settings: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

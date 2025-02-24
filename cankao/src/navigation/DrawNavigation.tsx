import React, { useContext } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import CustomSidebar from "./CustomSideBar";
import { COLORS } from "../themes/themes";
import { useNavigation } from "@react-navigation/native";
import { IconButton } from "react-native-paper";
import AssessmentScreen from "../screens/AssessmentScreen";
import AssessmentScreenTab from "../screens/AssessmentScreenTab";
import CreateTrain from "../screens/CreateTrain";
import Main from "../screens/Main";
import HistoryScreen from "../screens/historyScreens/HistoryScreen";
import HistoryView from "../screens/historyScreens/HistoryView";
import ColorsChangeScreen from "../screens/settingScreens/ColorsChangeScreen";
import SettingScreen from "../screens/settingScreens/SettingScreen";
import PrivacyModal from "../screens/settingScreens/settingModals/PrivacyModal";
import ServeTermsModal from "../screens/settingScreens/settingModals/ServeTermsModal";
import SopShowScreen from "../screens/SopShowScreen";
// import { MyChart } from "../screens/charts-xl/testChart";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const MainStack = createStackNavigator();

const MainStackNavigation = () => (
  <MainStack.Navigator
    screenOptions={{
      headerShown: false,
      headerTitle: "",
    }}
  >
    {/* <MainStack.Screen name="Approach" component={FlattenStageView} /> */}
    {/* <MainStack.Screen name="Approach" component={ApproachAltitudeView} /> */}
    {/* <MainStack.Screen name="Approach" component={ApproachSpeedView} /> */}
    {/* <MainStack.Screen name="Approach" component={TakeOffAltitudeView} /> */}
    {/* <MainStack.Screen name="Approach" component={TakeOffDeviationView} /> */}
    {/* <MainStack.Screen name="Approach" component={TakeOffSpeedView} /> */}

    {/* <MainStack.Screen name="Approach" component={FlattenStageView} /> */}

    {/* <MainStack.Screen name="Approach" component={ApproachDeviationView} /> */}

    {/* <MainStack.Screen name="Approach" component={VerticalLoadView} /> */}
    {/* <MainStack.Screen name="lolo" component={ApproachHeight} /> */}
    {/* <MainStack.Screen name="BuildCurve" component={BuildCurve} /> */}
    {/* <MainStack.Screen name="Maaaain" component={ColorBarValue} /> */}
    {/* <MainStack.Screen name="chartTest" component={MyChart} /> */}
    <MainStack.Screen name="Sop" component={SopShowScreen} />
    <MainStack.Screen name="Main" component={Main} />
    <MainStack.Screen name="Create" component={CreateTrain} />
    <MainStack.Screen name="AssementScreen" component={AssessmentScreen} />
    <MainStack.Screen
      name="AssementScreenTab"
      component={AssessmentScreenTab}
    />
    <MainStack.Screen name="History" component={HistoryView} />
  </MainStack.Navigator>
);

const HistoryStack = createStackNavigator();

const HistoryStackNavigation = ({ backgroundColor }) => (
  <HistoryStack.Navigator
    screenOptions={{
      headerShown: false,
      headerTitle: "",
    }}
  >
    <HistoryStack.Screen
      name="History"
      children={() => <HistoryScreen backgroundColor={backgroundColor} />}
    />
    {/* <HistoryStack.Screen
      name="HistoryDetails"
      component={HistoryDetailsScreen}
    /> */}
  </HistoryStack.Navigator>
);

const SettingStack = createStackNavigator();

const SettingStackNavigation = ({ backgroundColor }) => (
  <SettingStack.Navigator
    screenOptions={{
      headerShown: false,
      headerTitle: "",
    }}
  >
    <SettingStack.Screen
      name="Setting"
      children={() => {
        const navigation = useNavigation();
        return (
          <SettingScreen
            navigation={navigation}
            backgroundColor={backgroundColor}
          />
        );
      }}
    />
    <SettingStack.Screen name="SettingColors" component={ColorsChangeScreen} />
    <SettingStack.Screen name="PrivacyModal" component={PrivacyModal} />
    <SettingStack.Screen name="ServeTermsModal" component={ServeTermsModal} />
  </SettingStack.Navigator>
);

const DrawNavigation = () => {
  // const [backgroundColor] = useContext(ThemeContext);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer.Navigator
        screenOptions={{
          headerTitle: "",
          drawerActiveTintColor: "backgroundColor",
          headerStyle: { backgroundColor: COLORS.background },
          drawerPosition: "right",
          drawerType: "front",
          headerTintColor: "white",
        }}
        drawerContent={(props) => <CustomSidebar {...props} />}
      >
        <Drawer.Screen name="首页">
          {() => <MainStackNavigation />}
        </Drawer.Screen>
        <Drawer.Screen name="历史训练">
          {() => <HistoryStackNavigation backgroundColor={"backgroundColor"} />}
        </Drawer.Screen>
        <Drawer.Screen name="设置">
          {() => <SettingStackNavigation backgroundColor={"backgroundColor"} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </GestureHandlerRootView>
  );
};

export default DrawNavigation;

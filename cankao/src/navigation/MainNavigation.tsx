import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { COLORS } from "../themes/themes";
import DrawNavigation from "./DrawNavigation";
import { ThemeContext } from "../screens/context/ThemeContext";
import { useContext } from "react";

export default function MainNavigation() {
  const Stack = createNativeStackNavigator();
  // const [backgroundColor, setBackgroundColor] = useContext(ThemeContext);
  return (
    <Stack.Navigator
      initialRouteName="DrawNavigation"
      screenOptions={{
        contentStyle: { backgroundColor: COLORS.gray },
        headerStyle: { backgroundColor: "backgroundColor" },
        headerShadowVisible: false,
        headerShown: false,
        headerTitle: "",
      }}
    >
      <Stack.Screen name="DrawNavigation" component={DrawNavigation} />
    </Stack.Navigator>
  );
}

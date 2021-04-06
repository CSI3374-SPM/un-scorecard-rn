import "react-native-gesture-handler";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import OptionsScreen from "../components/generate_code/OptionsScreen";
import GenerateCodeScreen from "../components/generate_code/GenerateCodeScreenRedux";
import JoinScreen from "../components/generate_code/JoinScreen";
import ModerateExistingScreen from "../components/organizer/ModerateExistingScreen";

const Stack = createStackNavigator();

export default function LandingPageNavigator() {
  return (
    <Stack.Navigator initialRouteName="Options">
      <Stack.Screen
        name="Options"
        component={OptionsScreen}
        options={{ title: "UN Scorecard" }}
      />
      <Stack.Screen
        name="Generate"
        component={GenerateCodeScreen}
        options={{ title: "New Survey", headerBackTitle: "Back" }}
      />
      <Stack.Screen
        name="Join"
        component={JoinScreen}
        options={{ title: "Take Survey", headerBackTitle: "Back" }}
      />
      <Stack.Screen
        name="ModerateExisting"
        component={ModerateExistingScreen}
        options={{ title: "Moderate Survey", headerBackTitle: "Back" }}
      />
    </Stack.Navigator>
  );
}

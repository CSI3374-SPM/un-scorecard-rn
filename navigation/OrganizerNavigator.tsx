import "react-native-gesture-handler";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import OrganizerScreen from "../components/organizer/OrganizerScreen";
import EmailScreen from "../components/organizer/EmailScreen";

const Stack = createStackNavigator();

export default function OrganizerNavigator() {
  return (
    <Stack.Navigator initialRouteName="Organizer">
      <Stack.Screen name="Organizer" component={OrganizerScreen} />
      <Stack.Screen name="Email" component={EmailScreen} />
    </Stack.Navigator>
  );
}

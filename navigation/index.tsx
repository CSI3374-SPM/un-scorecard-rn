import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import useColorScheme from "../hooks/useColorScheme";
import { DefaultTheme, DarkTheme } from "../constants/Colors";

import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList } from "../types";
import LandingPageNavigator from "./LandingPageNavigator";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
import OrganizerScreen from "../components/organizer/OrganizerScreen";

import mapDispatchToProps from "../components/generate_code/GenerateCodeScreenD2P";
import { mapStateToProps } from "../components/generate_code/GenerateCodeScreenRedux";
import { connect } from "react-redux";
import { authenticationProps } from "../components/generate_code/GenerateCodeScreen";

import JoinScreen from "../components/generate_code/JoinScreen";
import OrganizerNavigator from "./OrganizerNavigator";
// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation() {
  const colorScheme = useColorScheme();
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = connect(
  mapStateToProps,
  mapDispatchToProps
)((props: authenticationProps) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {props.data.id != "" ? (
        props.data.isOrganizer ? (
          <>
            <Stack.Screen name="Organizer" component={OrganizerNavigator} />
            <Stack.Screen
              name="NotFound"
              component={NotFoundScreen}
              options={{ title: "Oops!" }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Root" component={BottomTabNavigator} />
            <Stack.Screen
              name="NotFound"
              component={NotFoundScreen}
              options={{ title: "Oops!" }}
            />
          </>
        )
      ) : (
        <>
          <Stack.Screen name="Landing" component={LandingPageNavigator} />
          <Stack.Screen
            name="NotFound"
            component={NotFoundScreen}
            options={{ title: "Oops!" }}
          />
        </>
      )}
    </Stack.Navigator>
  );
});

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
import {useState} from "react";

import mapDispatchToProps from "../components/generate_code/JoinScreenD2P";
import {mapStateToProps} from "../components/generate_code/JoinScreenRedux";
import {connect} from "react-redux";
import {idProps} from "../components/generate_code/JoinScreen";

import JoinScreen from "../components/generate_code/JoinScreen";
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

const RootNavigator = connect(mapStateToProps, mapDispatchToProps)((props: idProps) => {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {props.data.id ? (
            <><Stack.Screen name="Root" component={BottomTabNavigator}/>
              <Stack.Screen
                  name="NotFound"
                  component={NotFoundScreen}
                  options={{title: "Oops!"}}/></>
        ):(
            <><Stack.Screen name="Landing" component={LandingPageNavigator} />
              <Stack.Screen
                  name="NotFound"
                  component={NotFoundScreen}
                  options={{title: "Oops!"}} /></>
        )}


      </Stack.Navigator>
  );
});

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

import { connect } from "react-redux";
import OrganizerNavigator from "./OrganizerNavigator";
import {
  mapDispatchToProps,
  mapStateToProps,
  SurveyProps,
} from "../store/survey/SurveyReducer";
import SplashScreen from "../screens/SplashScreen";
import AnimatedSplash from "react-native-animated-splash";

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation() {
  const colorScheme = useColorScheme();
  const [timePassed, setTimePassed] = React.useState(false);
  setTimeout(() => {setTimePassed(true)}, 2500);
  if(!timePassed) {
    return(
    <SplashScreen />
    );
  } else {
    
    return (
      <NavigationContainer
        linking={LinkingConfiguration}
        theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      >
        <RootNavigator />
      </NavigationContainer>
    );
  }
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = connect(
  mapStateToProps,
  mapDispatchToProps
)((props: SurveyProps) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {props.data.authentication.surveyId != "" ? (
        props.data.authentication.isOrganizer ? (
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

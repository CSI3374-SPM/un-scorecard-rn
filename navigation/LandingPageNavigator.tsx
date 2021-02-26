import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OptionsScreen from "../components/generate_code/OptionsScreen";
import GenerateCodeScreen from "../components/generate_code/GenerateCodeScreen";
import JoinScreen from "../components/generate_code/JoinScreen";

const Stack = createStackNavigator();

export default function LandingPageNavigator() {
    return (
            <Stack.Navigator initialRouteName="Options">
                <Stack.Screen name="Options" component={OptionsScreen} />
                <Stack.Screen name="Generate" component={GenerateCodeScreen} />
                <Stack.Screen name="Join" component={JoinScreen} />
            </Stack.Navigator>

    );
}

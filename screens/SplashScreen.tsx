import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { StyleSheet, ImageBackground, View, useColorScheme } from "react-native";
import theme from "react-native-elements/dist/config/theme";
import {ActivityIndicator, DarkTheme, DefaultTheme, FAB} from "react-native-paper";
import navigation from "../navigation";
import { RootNavigationProp } from "../types";

export default function SplashScreen() {
//  const navigation = useNavigation<RootNavigationProp>();
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;
  return(
  <View style={styles.container}>
    <ImageBackground source={require('../assets/images/splash.png')} style={styles.image}>
        <ActivityIndicator style={{paddingTop: 225}} size="large" color="#5b92e5"/>
    </ImageBackground>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
});
import * as React from "react";
import { StyleSheet, ImageBackground, View } from "react-native";
import {ActivityIndicator} from "react-native-paper";

export default function SplashScreen() {
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
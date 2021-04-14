import * as React from "react";
import { Button, StyleSheet, Image, ImageBackground } from "react-native";

import { View, Text } from "react-native";
import {ActivityIndicator} from "react-native-paper";



export default function SplashScreen() {
  return(
  <View style={styles.container}>
    <ImageBackground source={require('../assets/images/splash.png')} style={styles.image}>
      <ActivityIndicator  size="large" color="#154734"/>
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
  text: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000a0"
  },
  circle: {
    justifyContent: "center",
  }
});

/*
<Text style={styles.text}>Inside</Text>

export default function SplashScreen() {
    return (
      
        <View style={styles.container}>
          <ImageBackground style={styles.img} source={require('../assets/images/splash.png')} >
          </ ImageBackground>
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
        
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: "80%",
    },
    img: {
       flex:1,
       resizeMode: "contain"
    }
  });
  */
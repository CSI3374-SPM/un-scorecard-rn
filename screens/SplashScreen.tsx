import * as React from "react";
import { Button, StyleSheet, Image } from "react-native";

import { View } from "react-native";

export default function SplashScreen() {
    return (
        <View style={styles.container}>
            <Image style={styles.img} source={require('../assets/images/splash.png')}/>
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
  
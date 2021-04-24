import * as React from "react";
import { StyleSheet, View, Text, Linking} from "react-native";
import {Button} from "react-native-paper";

export default function SplashScreen() {
  return(
  <View style={styles.container}>
    <View style={styles.intro}>
      <Text>
      Introduction
      </Text>
    </View>
    <View style={styles.link}>
      <Button
              onPress={() => {
                Linking.openURL('https://www.undrr.org');
              }}>
              UN Disaster Risk Reduction Webpage
      </Button>
    </View>
    <View style={styles.credits}>
      <Text>
        Credits:
      </Text>
      <Text>
        Jacob Curtis - Baylor University
      </Text>
      <Text>
        Jose Carlos Acosta - Baylor University
      </Text>
      <Text>
        Leighton Glim - Baylor University
      </Text>
      <Text>
        Peiyang Chang - Baylor University
      </Text>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  intro: {
    flex: 0.7,
    marginLeft: "7%"
  },
  link: {
    flex: 0.1,
    justifyContent: "flex-end",

  },
  credits: {
    flex:0.2,
    marginBottom:"12%",
    marginLeft:"7%",
    justifyContent:"flex-end"
  }
});
import * as React from "react";
import { StyleSheet } from "react-native";

import { View } from "react-native";
import LandingPageNavigator from "../navigation/LandingPageNavigator";

export default function LandingScreen() {
  return (
    <View style={styles.container}>
      <LandingPageNavigator />
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
});

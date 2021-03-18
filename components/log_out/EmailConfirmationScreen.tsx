import React from "react";
import { Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import DoneButton from "./FinishButton";

export default function EmailConfirmationScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Email has been sent!</Text>
      <DoneButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
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

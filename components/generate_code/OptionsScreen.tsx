import React from "react";
import { Button } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootNavigationProp } from "../../types";

export default function OptionsScreen() {
  const navigation = useNavigation<RootNavigationProp>();
  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={() => navigation.navigate("Generate")}>
        Generate new session
      </Button>

      <Button mode="contained" onPress={() => navigation.navigate("Join")}>
        Join existing session
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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

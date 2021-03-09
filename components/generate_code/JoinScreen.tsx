import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootNavigationProp } from "../../types";
import BottomTabNavigator from "../../navigation/BottomTabNavigator";
import {idData} from "../../store/id/idReducer";


export type idProps = {
  data: idData;
  updateid: (id: idData) => void;
};

export default function JoinScreen(props: idProps) {
  const [id, setID] = useState("");
  const navigation = useNavigation<RootNavigationProp>();
  return (
    <View style={styles.container}>
      <TextInput
        label="Session code"
        value={id}
        onChangeText={(id) => setID(id)}
      />
      <Button mode="contained" onPress={() => {
        props.updateid({
          id: id,
        });
        setID("");
      }}>
        Join
      </Button>
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

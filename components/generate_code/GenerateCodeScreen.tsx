import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootNavigationProp } from "../../types";
import {createSurvey} from "../../api/Wrapper";

import {authenticationData} from "../../store/authentication/authenticationReducer";

export type authenticationProps = {
    data: authenticationData;
    updateAuthentication: (auth: authenticationData) => void;
};

export default function GenerateCodeScreen(props: authenticationProps) {
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        label="City"
        value={city}
        onChangeText={(city) => setCity(city)}
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={(email) => setEmail(email)}
      />
      <Button mode="contained" onPress={async () => await generateID(city, props)}>
        Generate code
      </Button>
    </View>
  );
}

async function generateID(city: string, props: authenticationProps){
    var surveyData = await createSurvey(city);

    let id = surveyData?.id
    if (id != null){
        props.updateAuthentication({isOrganizer: true, id: id});
    }
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

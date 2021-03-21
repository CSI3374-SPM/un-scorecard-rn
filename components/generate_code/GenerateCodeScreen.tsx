import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootNavigationProp } from "../../types";
import { createSurvey } from "../../api/Wrapper";
import { SurveyProps } from "../../store/survey/SurveyReducer";

export default function GenerateCodeScreen(props: SurveyProps) {
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
      <Button
        mode="contained"
        onPress={async () => await generateID(city, props)}
      >
        Generate code
      </Button>
    </View>
  );
}

async function generateID(city: string, props: SurveyProps) {
  var surveyData = await createSurvey(city);

  let id = surveyData?.id;
  if (id != null) {
    console.log("generated survey id " + id);
    props.updateAuthentication({
      isOrganizer: true,
      surveyId: id,
      responseId: null,
    });
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

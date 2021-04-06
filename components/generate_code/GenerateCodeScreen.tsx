import React, { useState } from "react";
import { FAB, TextInput } from "react-native-paper";
import { StyleSheet, useColorScheme, View } from "react-native";
import { createSurvey } from "../../api/Wrapper";
import { SurveyProps } from "../../store/survey/SurveyReducer";
import { DarkTheme, DefaultTheme } from "../../constants/Colors";

export default function GenerateCodeScreen(props: SurveyProps) {
  const [city, setCity] = useState("");
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;

  return (
    <View style={styles.container}>
      <TextInput
        label="City"
        value={city}
        onChangeText={(city) => setCity(city)}
      />

      <FAB
        icon=""
        label="Create Survey"
        style={{
          backgroundColor: theme.colors.confirm,
          width: "55%",
          alignSelf: "center",
        }}
        color={theme.colors.surface}
        onPress={async () => await generateID(city, props)}
      />
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

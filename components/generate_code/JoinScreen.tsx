import React, { useState } from "react";
import { FAB, TextInput } from "react-native-paper";
import { Alert, StyleSheet, useColorScheme, View } from "react-native";
import { fetchSurveyResults } from "../../api/Wrapper";
import { connect } from "react-redux";
import _ from "lodash";
import {
  mapDispatchToProps,
  mapStateToProps,
  SurveyProps,
} from "../../store/survey/SurveyReducer";
import { DarkTheme, DefaultTheme } from "../../constants/Colors";

function JoinScreen(props: SurveyProps) {
  const [id, setID] = useState("");
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;

  return (
    <View style={styles.container}>
      <TextInput
        label="Session code"
        value={id}
        onChangeText={(id) => setID(id)}
      />
      <FAB
        icon=""
        label="Go to survey"
        style={{
          backgroundColor: theme.colors.primary,
          width: "55%",
          alignSelf: "center",
        }}
        onPress={async () => {
          await validateId(id, props);
          setID("");
        }}
      />
    </View>
  );
}

async function validateId(id: string, props: SurveyProps) {
  let surveyResults = await fetchSurveyResults(id);
  console.log("Survey results ", !_.isNull(surveyResults));

  if (!_.isNull(surveyResults)) {
    props.updateAuthentication({
      isOrganizer: false,
      surveyId: id,
      responseId: null,
    });
  } else {
    Alert.alert("Invalid ID","Please Enter a Valid Session ID");
    console.log("invalid id");
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinScreen);

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

import React, { useState } from "react";
import { FAB, TextInput } from "react-native-paper";
import { StyleSheet, useColorScheme, View } from "react-native";
import { getQuestions } from "../../api/WrapperV2";
import { connect } from "react-redux";
import _ from "lodash";
import {
  mapDispatchToProps,
  mapStateToProps,
  SurveyProps,
} from "../../store/survey/SurveyReducer";
import { DarkTheme, DefaultTheme } from "../../constants/Colors";
import UserCategories from "./UserCategories";

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
        autoCorrect={false}
        autoCapitalize='none'
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
  let questions = await getQuestions(id);

  if (!_.isNull(questions)) {
    console.log(questions);
    /*
    props.updateAuthentication({
      isOrganizer: false,
      surveyId: id,
      responseId: null,
    });
    */
  } else {
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

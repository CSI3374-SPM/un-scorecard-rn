import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { fetchSurveyResults } from "../../api/Wrapper";
import { connect } from "react-redux";
import _ from "lodash";
import { SurveyProps } from "../../store/survey/SurveyReducer";
import { mapStateToProps } from "../question/QuestionRedux";
import mapDispatchToProps from "../question/QuestionD2P";

function JoinScreen(props: SurveyProps) {
  const [id, setID] = useState("");
  return (
    <View style={styles.container}>
      <TextInput
        label="Session code"
        value={id}
        onChangeText={(id) => setID(id)}
      />
      <Button
        mode="contained"
        onPress={async () => {
          await validateId(id, props);
          setID("");
        }}
      >
        Join
      </Button>
    </View>
  );
}

async function validateId(id: string, props: SurveyProps) {
  let surveyResults = await fetchSurveyResults(id);
  console.log("Survey results ", surveyResults);

  if (!_.isNull(surveyResults)) {
    props.updateAuthentication({
      isOrganizer: false,
      surveyId: id,
      responseId: null,
    });
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

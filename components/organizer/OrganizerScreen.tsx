import React, { useState } from "react";
import { Button, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";

import { fetchSurveyResults } from "../../api/Wrapper";
import { connect } from "react-redux";
import FinishButton from "../log_out/FinishButton";
import { useNavigation } from "@react-navigation/core";
import { RootNavigationProp } from "../../types";
import mapDispatchToProps from "../question/QuestionD2P";
import { mapStateToProps } from "../question/QuestionRedux";
import { SurveyProps } from "../../store/survey/SurveyReducer";

function OrganizerScreen(props: SurveyProps) {
  const navigator = useNavigation<RootNavigationProp>();
  const [id, setID] = useState("");
  const [results, setResults] = useState([]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.data.authentication.surveyId}</Text>
      <Text>{results}</Text>
      <Button mode="contained" onPress={() => navigator.navigate("Email")}>
        Email Results
      </Button>
      <FinishButton />
    </View>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(OrganizerScreen);

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

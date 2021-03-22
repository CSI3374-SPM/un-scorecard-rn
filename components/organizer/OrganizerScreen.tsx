import React, { useEffect, useState } from "react";
import { Button, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";

import {
  fetchSurveyResults,
  getSurveyProgress,
  updateSurveyProgress,
} from "../../api/Wrapper";
import { connect } from "react-redux";
import FinishButton from "../log_out/FinishButton";
import { useNavigation } from "@react-navigation/core";
import { RootNavigationProp } from "../../types";
import {
  mapDispatchToProps,
  mapStateToProps,
  SurveyProps,
  SurveyResponse,
} from "../../store/survey/SurveyReducer";
import SurveyRadarGraph from "../SurveyRadarGraph";
import _ from "lodash";

function OrganizerScreen(props: SurveyProps) {
  const navigator = useNavigation<RootNavigationProp>();
  // @ts-ignore
  const [results, setResults]: [
    SurveyResponse[][] | null,
    (r: SurveyResponse[][] | null) => void
  ] = useState(null);

  const requestResults = async () => {
    let resp = await fetchSurveyResults(props.data.authentication.surveyId);
    setResults(resp);
  };

  useEffect(() => {
    requestResults();
  }, [props.data.authentication.surveyId]);

  useEffect(() => {
    const timer = setInterval(requestResults, 5000);
    return () => clearInterval(timer);
  }, [props.data.authentication.surveyId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Responders:
        {_.isNull(results)
          ? 0 // @ts-ignore
          : results.length}
      </Text>
      <Button mode="contained" onPress={() => pushNextQuestion(props)}>
        Next
      </Button>
      <SurveyRadarGraph surveyData={results} />
      <Button mode="contained" onPress={() => navigator.navigate("Email")}>
        Email Results
      </Button>
      <FinishButton />
    </View>
  );
}

async function pushNextQuestion(props: SurveyProps) {
  let surveyProgress = await getSurveyProgress(
    props.data.authentication.surveyId
  );

  if (surveyProgress != null) {
    let currentQuestion = surveyProgress.currentQuestion;
    if (currentQuestion)
      updateSurveyProgress(
        props.data.authentication.surveyId,
        currentQuestion + 1
      );
  }
  console.log("updated question availability");
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

import React, { useEffect, useState } from "react";
import { Button, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";

import { fetchSurveyResults } from "../../api/Wrapper";
import { connect } from "react-redux";
import FinishButton from "../log_out/FinishButton";
import { useNavigation } from "@react-navigation/core";
import { RootNavigationProp } from "../../types";
import mapDispatchToProps from "../question/QuestionD2P";
import { mapStateToProps } from "../question/QuestionRedux";
import { SurveyProps, SurveyResponse } from "../../store/survey/SurveyReducer";
import SurveyRadarGraph from "../SurveyRadarGraph";
import _ from "lodash";

function OrganizerScreen(props: SurveyProps) {
  const navigator = useNavigation<RootNavigationProp>();
  const [id, setID] = useState("");
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
      <SurveyRadarGraph surveyData={results} />
      <Button mode="contained" onPress={async () => await requestResults()}>
        Get Results
      </Button>
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

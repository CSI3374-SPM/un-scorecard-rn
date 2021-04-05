import React, { useEffect, useState } from "react";
import { Text, List, Subheading, FAB } from "react-native-paper";
import { StyleSheet, useColorScheme, View } from "react-native";
import {
  fetchSurveyResults,
  getSurveyProgress,
  updateSurveyProgress,
  questions,
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
import { ScrollView } from "react-native-gesture-handler";
import _ from "lodash";
import SurveyBarGraph from "../SurveyBarGraph";
import { DefaultTheme } from "../../constants/Colors";
import { DarkTheme } from "../../constants/Colors";

function OrganizerScreen(props: SurveyProps) {
  const navigator = useNavigation<RootNavigationProp>();
  // @ts-ignore
  const [results, setResults]: [
    SurveyResponse[][] | null,
    (r: SurveyResponse[][] | null) => void
  ] = useState(null);
  const [expanded, setExpanded] = React.useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const handlePress = () => setExpanded(!expanded);

  const requestResults = async () => {
    let resp = await fetchSurveyResults(props.data.authentication.surveyId);
    setResults(resp);
  };

  const requestCurrentQuestion = async () => {
    let surveyProgress = await getSurveyProgress(
      props.data.authentication.surveyId
    );
    if (!_.isNull(surveyProgress)) {
      let currentQuestion = surveyProgress.currentQuestion;
      if (currentQuestion) {
        setCurrentQuestion(currentQuestion);
      }
    }
  };
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;

  useEffect(() => {
    navigator.setOptions({
      title:
        props.data.authentication.surveyId +
        "   -   " +
        (_.isNull(results)
          ? 0 // @ts-ignore
          : results.length) +
        " Responses",
    });
  });

  useEffect(() => {
    requestResults();
    requestCurrentQuestion();
  }, [props.data.authentication.surveyId]);

  useEffect(() => {
    const timer = setInterval(requestResults, 5000);
    return () => clearInterval(timer);
  }, [props.data.authentication.surveyId]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <SurveyRadarGraph surveyData={results} />
        <Subheading style={styles.item}>Current Question</Subheading>
        <Text style={styles.item}>
          {currentQuestion - 1 > -1 && currentQuestion - 1 < questions.length
            ? questions[currentQuestion - 1].question
            : "Could not find question"}
        </Text>

        <SurveyBarGraph
          surveyData={results}
          questionIndex={currentQuestion - 1}
        />

        <List.Accordion
          style={styles.item}
          title={`Justifications`}
          left={(props) => <List.Icon {...props} icon="folder" />}
        >
          {_.isNull(results)
            ? "0" // @ts-ignore
            : results.map((ID: SurveyResponse[], respIndex: number) =>
                ID.filter(
                  (res: SurveyResponse) =>
                    res.questionIndex === currentQuestion - 1 &&
                    !_.isUndefined(res.justification)
                ).map((res: SurveyResponse, ansIndex: number) => {
                  return (
                    <List.Item
                      title={res.justification}
                      key={`justification-${respIndex}-${ansIndex}`}
                    />
                  );
                })
              )}
        </List.Accordion>
        <View style={styles.separator} />
      </ScrollView>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: theme.colors.surface,
          justifyContent: "space-between",
          width: "70%",
          borderRadius: 50,
          position: "absolute",
          padding: 5,
          bottom: 30,
          alignSelf: "center",
          shadowColor: "grey",
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.1,
          shadowRadius: 2,
        }}
      >
        <FAB
          style={{ backgroundColor: theme.colors.exit }}
          icon="close"
          onPress={() => {
            props.updateAuthentication({
              isOrganizer: false,
              surveyId: "",
              responseId: null,
            });
            props.updateAnswer([]);
          }}
        />
        <FAB
          style={{ backgroundColor: theme.colors.primary }}
          icon="email"
          children={null}
          onPress={() => navigator.navigate("Email")}
        />
        <FAB
          style={{ backgroundColor: theme.colors.confirm }}
          icon="arrow-right"
          color="white"
          onPress={() => pushNextQuestion(props, setCurrentQuestion)}
        />
      </View>
    </View>
  );
}

async function pushNextQuestion(
  props: SurveyProps,
  setCurrentQuestion: (n: number) => void
) {
  let surveyProgress = await getSurveyProgress(
    props.data.authentication.surveyId
  );

  if (surveyProgress != null) {
    let currentQuestion = surveyProgress.currentQuestion;
    if (currentQuestion) {
      updateSurveyProgress(
        props.data.authentication.surveyId,
        currentQuestion + 1
      );
      setCurrentQuestion(currentQuestion + 1);
    }
  }
  console.log("updated question availability");
}

export default connect(mapStateToProps, mapDispatchToProps)(OrganizerScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    margin: "auto",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 8,
  },
  separator: {
    marginVertical: 55,
    height: 1,
    width: "80%",
  },
  item: {
    padding: 4,
  },
  email: {
    alignItems: "center",
    justifyContent: "center",
  },
  exit: {
    alignItems: "center",
    justifyContent: "center",
  },
  next: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {},
});

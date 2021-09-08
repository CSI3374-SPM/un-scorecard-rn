import React, { useEffect, useState } from "react";
import { Text, List, Subheading, FAB } from "react-native-paper";
import { Image, StyleSheet, useColorScheme, View } from "react-native";
import {
  fetchSurveyResults,
  getSurveyProgress,
  updateSurveyProgress,
  fetchSurveyResultsStream,
  closeResultsSocket,
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
import _, { toNumber } from "lodash";
import SurveyBarGraph from "../SurveyBarGraph";
import { DefaultTheme } from "../../constants/Colors";
import { DarkTheme } from "../../constants/Colors";
import {
  fetchSurveyResultsStreamV2,
  fetchSurveyResultsV2,
  getQuestions,
  QuestionType,
} from "../../api/WrapperV2";

function OrganizerScreen(props: SurveyProps) {
  const navigator = useNavigation<RootNavigationProp>();
  // @ts-ignore
  const [results, setResults]: [
    SurveyResponse[] | null,
    (r: SurveyResponse[] | null) => void
  ] = useState(null);

  const [expanded, setExpanded] = React.useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(0);

  // @ts-ignore
  const [questions, setQuestions]: [
    QuestionType[] | null,
    (questions: QuestionType[] | null) => void
  ] = useState([]);
  useEffect(() => {
    async function loadQuestions() {
      setQuestions(await getQuestions(props.data.authentication.surveyId));
      console.log("Fetched questions from organizer screen");
    }
    loadQuestions();
  }, []);

  const [socket, setSocket]: [
    SocketIOClient.Socket | null,
    (s: SocketIOClient.Socket | null) => void
  ] = useState(null as SocketIOClient.Socket | null);
  const handlePress = () => setExpanded(!expanded);

  const requestCurrentQuestion = async () => {
    let surveyProgress = await getSurveyProgress(
      props.data.authentication.surveyId
    );
    if (!_.isNull(surveyProgress)) {
      console.log(
        "Updated current question to: ",
        surveyProgress.currentQuestion
      );
      let currentQuestion = surveyProgress.currentQuestion;
      if (currentQuestion) {
        setCurrentQuestion(currentQuestion);
      }
    }
  };
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;
  let populatedScores: number[] = [];

  useEffect(() => {
    navigator.setOptions({
      title: props.data.authentication.surveyId,
    });
  });

  useEffect(() => {
    async function loadResults() {
      setResults(
        await fetchSurveyResultsV2(props.data.authentication.surveyId, null)
      );
    }
    loadResults();
    console.log("Loaded results from organizer screen");
  }, [props.data.authentication.surveyId]);

  useEffect(() => {
    if (_.isNull(socket) && props.data.authentication.surveyId != "") {
      setSocket(
        fetchSurveyResultsStreamV2(
          props.data.authentication.surveyId,
          setResults
        )
      );
      requestCurrentQuestion();
    } else if (!_.isNull(socket)) {
      closeResultsSocket(socket);
      setSocket(null);
    }
    return () => {
      if (!_.isNull(socket)) {
        console.log("results a");
        closeResultsSocket(socket);
      }
    };
  }, [props.data.authentication.surveyId]);

  useEffect(() => {
    return () => {
      if (!_.isNull(socket)) {
        console.log("results b");
        closeResultsSocket(socket);
      }
    };
  }, []);

  useEffect(() => {
    if (_.isNull(results)) {
      setAnswers(0);
    } else {
      console.log("Setting answers");
      setAnswers(currentResponses(results, currentQuestion, 0));
    }
  }, [results, currentQuestion]);

  // @ts-ignore
  // @ts-ignore
  return (
    <View style={styles.container}>
      <ScrollView>
        <SurveyRadarGraph
          surveyData={results}
          currentQuestion={currentQuestion}
        />
        <View style={styles.currentQuestionTitle}>
          <Subheading style={styles.title}>Current Question</Subheading>
          <View style={styles.titleRight}>
            <Subheading style={styles.title}>
              {" "}
              {answers}/
              {_.isNull(results)
                ? 0 // @ts-ignore
                : results["ResultCount"]}
              {" answers "}
            </Subheading>
            <View style={styles.indicatorContainer}>
              {_.isNull(results) ? (
                <Image
                  style={styles.indicator}
                  source={require("../../assets/images/red-circle.png")}
                />
              ) : answers ==
                // @ts-ignore
                results?.length ? (
                <Image
                  style={styles.indicator}
                  source={require("../../assets/images/green-circle.png")}
                />
              ) : (
                <Image
                  style={styles.indicator}
                  source={require("../../assets/images/red-circle.png")}
                />
              )}
            </View>
          </View>
        </View>

        <View style={styles.questionContainer}>
          <Text style={styles.questionNumber}>
            {currentQuestion > -1 && currentQuestion < questions.length
              ? questions[currentQuestion].number + " -"
              : ""}
          </Text>
          <Text style={styles.item}>
            {currentQuestion > -1 && currentQuestion < questions.length
              ? questions[currentQuestion].text
              : "Could not find question"}
          </Text>
        </View>

        <SurveyBarGraph surveyData={results} questionIndex={currentQuestion} />

        <List.Accordion
          style={styles.item}
          title="Justifications"
          left={(props) => <List.Icon {...props} icon="folder" />}
        >
          {_.isNull(results)
            ? "0"
            : _.filter(
                _.filter(results.Data, {
                  question_id: currentQuestion + 1,
                }),
                {
                  function(justification) {
                    return justification != "No response given";
                  },
                }
              ).map((response) => {
                return (
                  <>
                    <List.Item
                      title={<Text>{response.justification}</Text>}
                      key={response.user_id}
                    ></List.Item>
                  </>
                );
              })}
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
          onPress={() => pushNextQuestion(props, questions, setCurrentQuestion)}
        />
      </View>
    </View>
  );
}

const currentResponses = (
  data: SurveyResponse[][] | null,
  ndx: number,
  answers: number
) => {
  let responses = data["Data"];
  if (_.isUndefined(responses)) return 0;
  let scoreTotals = [0, 0, 0, 0, 0, 0];
  responses
    .filter((response: SurveyResponse) => {
      return response["question_id"] == ndx;
    })
    .map((response: SurveyResponse) => {
      let score = toNumber(response["score"]);
      console.log("score: ", score);
      if (score >= 0 && score <= 5) {
        scoreTotals[score]++;
      }
    });
  for (var i = 0; i < scoreTotals.length; i++) {
    answers += scoreTotals[i];
  }
  console.log("answers: ", answers);
  return answers;
};

async function pushNextQuestion(
  props: SurveyProps,
  questions: QuestionType[],
  setCurrentQuestion: (n: number) => void
) {
  let surveyProgress = await getSurveyProgress(
    props.data.authentication.surveyId
  );

  if (surveyProgress != null) {
    let currentQuestion = surveyProgress.currentQuestion;
    if (currentQuestion && currentQuestion + 1 <= questions.length) {
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
  currentQuestionTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
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
  indicator: {
    flex: 1,
    width: undefined,
    height: undefined,
    aspectRatio: 1,
    resizeMode: "center",
  },
  indicatorContainer: {
    height: 22,
    width: 22,
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
  noJustification: {
    marginLeft: 16,
  },
  titleRight: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: 16,
  },
  questionNumber: {
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 5,
  },
  questionContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    alignItems: "center",
    marginLeft: 16,
  },
});

import React, { useEffect, useState } from "react";
import {
  Button,
  TextInput,
  Title,
  RadioButton,
  ActivityIndicator,
} from "react-native-paper";
import {
  addSurveyResponse,
  getSurveyProgress,
  questions,
} from "../../api/Wrapper";

import { ScrollView } from "react-native-gesture-handler";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import _ from "lodash";
import { SurveyProps } from "../../store/survey/SurveyReducer";
import FinishButton from "../log_out/FinishButton";

export const rating = (n: number) => 5 - n;

export default function Question(props: SurveyProps) {
  const [index, setIndex]: [number, (index: number) => void] = useState(0);
  const [checked, setChecked]: [number, (n: number) => void] = useState(-1);
  const [justification, setJustification]: [
    string,
    (j: string) => void
  ] = useState("");

  const [loading, setLoading] = useState(false);

  const progress = async () => {
    console.log("function ran, index: ", index);
    let surveyProgress = await getSurveyProgress(
      props.data.authentication.surveyId
    );
    if (
      surveyProgress != null &&
      typeof surveyProgress.currentQuestion != "undefined"
    ) {
      if (index + 1 > surveyProgress.currentQuestion) {
        setLoading(true);
      } else {
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    progress();
  }, [props.data.authentication.surveyId, index]);
  useEffect(() => {
    const timer = setInterval(progress, 5000);
    return () => clearInterval(timer);
  }, [props.data.authentication.surveyId, index]);
  if (index < questions.length - 1) {
    if (loading) {
      return (
        <View style={styles.waiting}>
          <Title style={styles.item}>Waiting for next question</Title>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <Title style={styles.item}>{questions[index].question}</Title>
              <RadioButton.Group
                onValueChange={(n: string) => setChecked(rating(parseInt(n)))}
                value={`${rating(checked)}`}
              >
                {questions[index].descriptions.map((text, ndx) => (
                  <RadioButton.Item
                    label={text}
                    value={`${ndx}`}
                    key={`${ndx}-${questions[index].question}-${text}`}
                  />
                ))}
              </RadioButton.Group>
              <TextInput
                style={styles.item}
                multiline
                label={questions[index].justification}
                value={justification}
                onChangeText={(text) => setJustification(text)}
              />
              <Button
                style={styles.button}
                mode="contained"
                disabled={checked < 0}
                onPress={async () => {
                  if (checked > -1) {
                    let newAnswer = {
                      questionIndex: index,
                      score: checked,
                      justification:
                        justification !== "" ? justification : undefined,
                    };
                    let ans = _.clone(props.data.responses);
                    ans.push(newAnswer);
                    props.updateAnswer(ans);
                    let newResponseId = await addSurveyResponse(
                      props.data.authentication.surveyId,
                      [newAnswer],
                      props.data.authentication.responseId
                    );
                    if (!_.isNull(newResponseId)) {
                      let auth = {
                        ...props.data.authentication,
                        responseId: newResponseId,
                      };
                      props.updateAuthentication(auth);
                    } else {
                      console.log("Failed to submit response");
                    }

                    setChecked(-1);
                    setJustification("");
                    setIndex(index + 1);
                    console.log("Changed index ", index);
                  } else {
                    alert("Please select a score");
                  }
                }}
              >
                Submit Answer
              </Button>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  } else {
    return (
      <>
        <Title>You finished the survey!</Title>
        <FinishButton />
        {/* <Button mode="contained" onPress={() => navigation.navigate("Answer")}>
          See Results
        </Button> */}
      </>
    );
  }
}

// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    flexGrow: 1,
    padding: 12,
  },
  item: {
    marginVertical: 8,
  },
  button: {
    borderRadius: 50,
    height: 50,
    justifyContent: "center",
  },
  waiting: {
    flexDirection: "column",
    alignItems: "center",
  },
});

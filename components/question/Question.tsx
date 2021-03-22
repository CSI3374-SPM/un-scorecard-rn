import React, { useEffect, useState } from "react";
import {
  Button,
  TextInput,
  Title,
  RadioButton,
  ActivityIndicator,
} from "react-native-paper";
import { SurveyResponse } from "../../store/survey/SurveyReducer";
import {
  addSurveyResponse,
  getSurveyProgress,
  questions,
} from "../../api/Wrapper";
import { useNavigation } from "@react-navigation/core";
import { RootNavigationProp } from "../../types";
import { ScrollView } from "react-native-gesture-handler";
import { StyleSheet, View } from "react-native";
import _ from "lodash";
import { SurveyProps } from "../../store/survey/SurveyReducer";
import FinishButton from "../log_out/FinishButton";
//import { Simulate } from "react-dom/test-utils";
//import progress = Simulate.progress;
//import { Simulate } from "react-dom/test-utils";
//import load = Simulate.load;

export const rating = (n: number) => 5 - n;

export default function Question(props: SurveyProps) {
  const navigation = useNavigation<RootNavigationProp>();
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
      }
    }
  };
  useEffect(() => {
    progress();
  }, [props.data.authentication.surveyId, index]);
  useEffect(() => {
    console.log("I did something");
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
            style={styles.item}
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
            Send Response
          </Button>
        </View>
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
  waiting: {
    flexDirection: "column",
    alignItems: "center",
  },
});

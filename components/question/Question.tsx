import React, { useCallback, useState, useEffect } from "react";
import {
  Button,
  TextInput,
  Title,
  RadioButton,
  ActivityIndicator,
  FAB,
  Text,
} from "react-native-paper";
import {
  addSurveyEmail,
  addSurveyResponse,
  getSurveyProgressStream,
  questions,
  closeProgressSocket,
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
import { useFocusEffect } from "@react-navigation/native";
//import { Simulate } from "react-dom/test-utils";
//import progress = Simulate.progress;
//import { Simulate } from "react-dom/test-utils";
//import load = Simulate.load;

export const rating = (n: number) => 5 - n;

export default function Question(props: SurveyProps) {
  const [index, setIndex]: [number, (index: number) => void] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [checked, setChecked]: [number, (n: number) => void] = useState(-1);
  const [justification, setJustification]: [
    string,
    (j: string) => void
  ] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [socket, setSocket]: [
    SocketIOClient.Socket | null,
    (s: SocketIOClient.Socket | null) => void
  ] = useState(null as SocketIOClient.Socket | null);

  const progress = (newCurrentQuestion: number) => {
    console.log("function ran, index: ", index);
    setCurrentQuestion(newCurrentQuestion);
    if (index + 1 > newCurrentQuestion) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (props.data.authentication.surveyId != "")
      setSocket(
        getSurveyProgressStream(props.data.authentication.surveyId, progress)
      );
    else if (!_.isNull(socket)) {
      closeProgressSocket(socket);
      setSocket(null);
    }
    return () => {
      if (!_.isNull(socket)) {
        console.log("progress a");
        closeProgressSocket(socket);
      }
    };
  }, [props.data.authentication.surveyId]);

  useEffect(() => {
    return () => {
      if (!_.isNull(socket)) {
        console.log("progress b");
        closeProgressSocket(socket);
      }
    };
  }, []);

  if (index < questions.length) {
    if (loading) {
      return (
        <View style={styles.waiting}>
          <Title style={styles.item}>Waiting for moderator to reveal next question</Title>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <ScrollView>
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
            </ScrollView>
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
                  console.log(index + 1);
                  console.log(currentQuestion);
                  if (index + 1 > currentQuestion - 1) {
                    setLoading(true);
                  } else {
                    setLoading(false);
                  }
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
    );
  } else {
    return (
      <View style={{ ...styles.container, justifyContent: "center" }}>
        <Title>You finished the survey!</Title>
        <Text>Send your email to the survey organizer</Text>
        <View style={styles.emailContainer}>
          <TextInput
            mode="flat"
            label="Enter email"
            value={email}
            onChangeText={setEmail}
            style={styles.emailInput}
          />
          <FAB
            onPress={async () => {
              await addSurveyEmail(props.data.authentication.surveyId, email);
              setEmail("");
            }}
            small
            icon="mail"
            style={styles.fabMinus}
          />
        </View>
        <FinishButton />
        {/* <Button mode="contained" onPress={() => navigation.navigate("Answer")}>
          See Results
        </Button> */}
      </View>
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
  emailContainer: {
    flex: 1,
    flexDirection: "row",
    maxHeight: 64,
    justifyContent: "center",
    alignContent: "stretch",
    marginBottom: 8,
  },
  emailInput: {
    alignSelf: "stretch",
    width: "80%",
  },
  fabMinus: {
    padding: 8,
    marginHorizontal: 8,
    alignSelf: "center",
  },
});

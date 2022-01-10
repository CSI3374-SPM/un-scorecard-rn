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
import { addSurveyEmail, closeProgressSocket } from "../../api/Wrapper";

import { ScrollView } from "react-native-gesture-handler";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import _, { set } from "lodash";
import { SurveyProps } from "../../store/survey/SurveyReducer";
import FinishButton from "../log_out/FinishButton";
import {
  addSurveyResponseV2,
  closeProgressSocketV2,
  getQuestions,
  getSurveyProgressStreamV2,
} from "../../api/WrapperV2";

export const rating = (n: number) => 5 - n;
export default function Question(props: SurveyProps) {
  const [index, setIndex]: [number, (index: number) => void] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [checked, setChecked]: [number, (n: number) => void] = useState(-1);
  const [justification, setJustification]: [
    string,
    (j: string) => void
  ] = useState("");
  const [email, setEmail] = useState("");
  const [questions, setQuestions] = useState([]);

  const [loading, setLoading] = useState(false);
  const [socket, setSocket]: [
    SocketIOClient.Socket | null,
    (s: SocketIOClient.Socket | null) => void
  ] = useState(null as SocketIOClient.Socket | null);

  const progress = (newCurrentQuestion: number) => {
    console.log("function ran, index: ", index);
    console.log("newCurrentQuestion ", newCurrentQuestion);
    setCurrentQuestion(newCurrentQuestion);
    if (index > newCurrentQuestion) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  };

  // @ts-ignore
  useEffect(() => {
    async function loadQuestions() {
      setQuestions(await getQuestions(props.data.authentication.surveyId));
    }
    loadQuestions();
  }, [props.data.authentication.surveyId]);

  useEffect(() => {
    if (props.data.authentication.surveyId != "")
      setSocket(
        getSurveyProgressStreamV2(props.data.authentication.surveyId, progress)
      );
    else if (!_.isNull(socket)) {
      closeProgressSocketV2(socket);
      setSocket(null);
    }
    return () => {
      if (!_.isNull(socket)) {
        console.log("progress a");
        closeProgressSocketV2(socket);
      }
    };
  }, [props.data.authentication.surveyId]);

  useEffect(() => {
    return () => {
      if (!_.isNull(socket)) {
        console.log("progress b");
        closeProgressSocketV2(socket);
      }
    };
  }, []);

  if (_.isNull(questions)) {
    console.log("Questions is null");
    return (
      <View style={styles.waiting}>
        <Title style={styles.item}>Loading questions</Title>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (index < questions.length) {
    if (loading) {
      return (
        <View style={styles.waiting}>
          <Title style={styles.item}>
            Waiting for moderator to reveal next question
          </Title>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    // @ts-ignore
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={200}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView>
              <Title style={styles.item}>{questions[index].text}</Title>
              <RadioButton.Group
                onValueChange={(n: string) => setChecked(rating(parseInt(n)))}
                value={`${rating(checked)}`}
              >
                {questions[index].options.map((option) => (
                  <RadioButton.Item
                    label={`${option.score}.- ${option.text}`}
                    value={`${option.score}`}
                    key={`${option.score}-${questions[index].number}-${option.text}`}
                  />
                ))}
              </RadioButton.Group>
            </ScrollView>
            <TextInput
              style={styles.item}
              multiline
              label={"Optional: Please provide justification"}
              value={justification}
              onChangeText={(text) => setJustification(text)}
            />

            <Button
              style={styles.button}
              mode="contained"
              disabled={checked < 0}
              onPress={async () => {
                if (checked > -1) {
                  console.log("index: ", index);
                  let newAnswer = {
                    id: questions[index].id,
                    questionIndex: index,
                    score: questions[index].options[checked].score,
                    justification:
                      justification !== "" ? justification : undefined,
                  };
                  let ans = _.clone(props.data.responses);
                  ans.push(newAnswer);
                  props.updateAnswer(ans);
                  let newResponseId = await addSurveyResponseV2(
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
          </>
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

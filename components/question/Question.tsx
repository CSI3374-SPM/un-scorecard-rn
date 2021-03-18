import React, { useState } from "react";
import { Button, TextInput, Title, RadioButton } from "react-native-paper";
import { SurveyResponse } from "../../store/survey/SurveyReducer";
import { addSurveyResponse, questions } from "../../api/Wrapper";
import { useNavigation } from "@react-navigation/core";
import { RootNavigationProp } from "../../types";
import { ScrollView } from "react-native-gesture-handler";
import { StyleSheet, View } from "react-native";
import _ from "lodash";
import { SurveyProps } from "../../store/survey/SurveyReducer";
import FinishButton from "../log_out/FinishButton";

export type AnswerProps = {
  data: SurveyResponse[];
  updateAnswer: (a: SurveyResponse[]) => void;
};

export const rating = (n: number) => 5 - n;

export default function Question(props: SurveyProps) {
  const navigation = useNavigation<RootNavigationProp>();
  const [index, setIndex]: [number, (index: number) => void] = useState(0);
  const [checked, setChecked]: [number, (n: number) => void] = useState(-1);
  const [justification, setJustification]: [
    string,
    (j: string) => void
  ] = useState("");

  if (index < questions.length - 1) {
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
                  console.log(
                    "1 updating auth data with " + JSON.stringify(auth)
                  );
                  props.updateAuthentication(auth);
                } else {
                  console.log("Failed to submit response");
                }

                setChecked(-1);
                setJustification("");
                setIndex(index + 1);
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
        <Title>You finished the survery!</Title>
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
});

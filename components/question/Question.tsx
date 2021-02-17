import React, { useState } from "react";
import { Button, Text, TextInput } from "react-native-paper";
import { RadioButton } from "react-native-paper";
import { AnswerData } from "../../store/answer/AnswerReducer";

export type AnswerProps = {
  data: AnswerData;
  updateAnswer: (answer: AnswerData) => void;
};

export const description: string[] = [
  "Terrible",
  "Bad",
  "Decent",
  "Good",
  "Fantastic",
  "Best I've Ever Had",
].reverse();

export const rating = (n: number) => 5 - n;

export default function Question(props: AnswerProps) {
  const [checked, setChecked]: [number, (n: number) => void] = useState(0);
  const [justification, setJustification]: [
    string,
    (j: string) => void
  ] = useState("");

  const question = "How would you rate the last restaraunt you ate at?";

  return (
    <>
      <Text>{question}</Text>
      <RadioButton.Group
        onValueChange={(n: string) => setChecked(rating(parseInt(n)))}
        value={`${rating(checked)}`}
      >
        {description.map((text, ndx) => (
          <RadioButton.Item
            label={text}
            value={`${ndx}`}
            key={`${ndx}-${question}`}
          />
        ))}
      </RadioButton.Group>
      <TextInput
        label="(Optional) Provide justification"
        value={justification}
        onChangeText={(text) => setJustification(text)}
      />
      <Button
        mode="contained"
        onPress={() => {
          props.updateAnswer({
            score: checked,
            justification: justification !== "" ? justification : undefined,
          });
          setChecked(0);
          setJustification("");
        }}
      >
        Save
      </Button>
    </>
  );
}

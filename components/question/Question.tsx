import React, { useState } from "react";
import { Button, Text, TextInput, Divider} from "react-native-paper";
import { RadioButton } from "react-native-paper";
import { AnswerData } from "../../store/answer/AnswerReducer";
import {questions} from "../../api/Wrapper"

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

export default function Question({navigation}:{navigation : any}, props: AnswerProps) {
  const [index, setIndex]: [number, (index: number) => void] = useState(0);
  const [checked, setChecked]: [number, (n: number) => void] = useState(0);
  const [justification, setJustification]: [
    string,
    (j: string) => void
  ] = useState("");

if(index < 23){
    return (
      <> 
        <Text>{questions[index].question}</Text>
        <RadioButton.Group
          onValueChange={(n: string) => setChecked(rating(parseInt(n)))}
          value={`${rating(checked)}`}
        >
          {description.map((text, ndx) => (
            <RadioButton.Item
              label={text}
              value={`${ndx}`}
              key={`${ndx}-${questions[index].question}`}
            />
          ))}
        </RadioButton.Group>
        <TextInput
          label={questions[index].justification}
          value={justification}
          onChangeText={(text) => setJustification(text)}
        />
        <Button
          mode="contained"
          onPress={() => {
            props.updateAnswer({
              num: index,
              score: checked,
              justification: justification !== "" ? justification : undefined,
            });
            setChecked(0);
            setJustification("");
          }}
        >
          Save
        </Button>
        <Divider></Divider>
        <Button mode="contained" onPress={() => setIndex(index+1)}>
                  Next
              </Button>
      </>
    );
  }
  else{
    return(
      <>
        <Text>You finish the survery!</Text>
        <Divider></Divider>
        <Button mode="contained" onPress={() => navigation.navigate('Root')}>
          Done
        </Button>
      </>
    );
  }
  
}

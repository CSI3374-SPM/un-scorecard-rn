import React, { useState } from "react";
import { Button, Text, TextInput, Divider} from "react-native-paper";
import { RadioButton, Title } from "react-native-paper";
import { AnswerData } from "../../store/answer/AnswerReducer";
import {questions} from "../../api/Wrapper"

export type AnswerProps = {
  data: AnswerData;
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

export const ans: Array<AnswerData> = [];

export default function Question({navigation}:{navigation : any}, props: AnswerProps) {
  const [index, setIndex]: [number, (index: number) => void] = useState(0);
  const [checked, setChecked]: [number, (n: number) => void] = useState(-1);
  const [justification, setJustification]: [
    string,
    (j: string) => void
  ] = useState("");
  

if(index < questions.length-1){
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
            if(checked > -1) {
            ans.push({
              score: checked,
              justification: justification !== "" ? justification : undefined, 
            });
            setChecked(-1);
            setJustification("");
            setIndex(index+1);
            console.log(index);
            } else {
              alert("Please select a score");
            }
          }}
        >
          Save
        </Button>
      </>
    );
  }
  else{
    return(
      <>
        <Text>You finish the survery!</Text>
        <Divider></Divider>
        <Button mode="contained" onPress={() => navigation.navigate('Answer')}>
          See Results
        </Button>
      </>
    );
  }
  
}

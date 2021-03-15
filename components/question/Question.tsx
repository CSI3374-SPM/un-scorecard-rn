import React, { useState } from "react";
import { Button, Text, TextInput, Divider} from "react-native-paper";
import { RadioButton } from "react-native-paper";
import { AnswerData, State } from "../../store/answer/AnswerReducer";
import { questions } from "../../api/Wrapper"

export type AnswerProps = {
  data: State;
  updateAnswer: (answer: State) => void;
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

const ans: AnswerData = {
  num: 0,
  score: 0,
  justification: undefined,
}
const a: Array<AnswerData> = [];

export default function Question({navigation}:{navigation : any}, props: AnswerProps) {

  const [index, setIndex]: [number, (index: number) => void] = useState(0);
  const [checked, setChecked]: [number, (n: number) => void] = useState(0);
  const [justification, setJustification]: [
    string,
    (j: string) => void
  ] = useState("");
  //const [answers, setAnswers]: [AnswerData, (ans: AnswerData) => void] = useState(AnswerData);

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
            ans.num = index;
            ans.score = checked;
            ans.justification !== "" ? justification : undefined;
            a.push(ans);
            props.updateAnswer({
              data: a,
            });
            setChecked(0);
            setJustification("");
            }
          }
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
        <Button mode="contained">
          Done
        </Button>
      </>
    );
  }
  
}

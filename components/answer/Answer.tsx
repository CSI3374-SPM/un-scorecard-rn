import React from "react";
import { Title, Text } from "react-native-paper";
import { AnswerProps, description, rating } from "../question/Question";
import {fetchSurveyResults, SurveyResponse} from "../../api/Wrapper"

export default function Answer(props: AnswerProps) {
  var res = fetchSurveyResults("1");

  //for (let index = 0; index < props.data.length; index++) {
    let x = props.data.length;
  return (
    
    <>
    {props.data.forEach(function (value) {
      <><Title>Score</Title><Text>{`${value.score} (${description[rating(value.score)]})`}</Text><Title>Justification</Title>
        <Text>{`${value.justification === undefined
            ? "None provided"
            : value.justification}`}</Text></>
})}
      </>
  
   /* <>
      <Title>Number of Answers</Title>
      <Text>{`${props.data.num}`}</Text>

      <Title>Score</Title>
      <Text>{`${props.data.score} (${
        description[rating(props.data.score)]
      })`}</Text>

      <Title>Justification</Title>
      <Text>{`${
        props.data.justification === undefined
          ? "None provided"
          : props.data.justification
      }`}</Text>
    </>*/
  );
   // }

}

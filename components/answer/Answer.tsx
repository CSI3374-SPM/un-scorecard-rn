import React from "react";
import { Title, Text } from "react-native-paper";
import { AnswerProps, description, rating } from "../question/Question";
import {fetchSurveyResults, SurveyResponse, questions} from "../../api/Wrapper"

export default function Answer(props: AnswerProps) {
  /*
  var res = fetchSurveyResults("1");

  //for (let index = 0; index < props.data.length; index++) {
    let x = props.data.length;
  return (
    
    <>
    {props.data.forEach(function (value) {
      <>
      <Title># of Answer</Title>
        <Text>{`${value.num}`}</Text>

      <Title>Score</Title>
        <Text>{`${value.score} (${description[rating(value.score)]})`}</Text>

      <Title>Justification</Title>
        <Text>{`${value.justification === undefined
            ? "None provided"
            : value.justification}`}
        </Text></>
})}
      </>
  */
 var list = [];

for(let i = 0; i < questions.length;i++){
  list.push(
    <>
      <Title>Number of Answers</Title>
      <Text>{`${props.data.data[i].num}`}</Text>

      <Title>Score</Title>
      <Text>{`${props.data.data[i].score} (${
        description[rating(props.data.data[i].score)]
      })`}</Text>

      <Title>Justification</Title>
      <Text>{`${
        props.data.data[i].justification === undefined
          ? "None provided"
          : props.data.data[i].justification
      }`}</Text>
    </>
  )
}
return(
  <div>
    {list}
  </div>
)

}

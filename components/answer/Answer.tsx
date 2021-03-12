import React from "react";
import { Title, Text } from "react-native-paper";
import { AnswerProps, description, rating } from "../question/Question";
import {fetchSurveyResults, SurveyResponse} from "../../api/Wrapper"

export default function Answer(props: AnswerProps) {
  var res = fetchSurveyResults("1");
  return (
    <>
    
      {res.map((items: any[], index: any) => {
        return (
          <ol>
            {items.map((subItems, sIndex) => {
              return <li> {subItems} </li>;
            })}
          </ol>
        );
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

}

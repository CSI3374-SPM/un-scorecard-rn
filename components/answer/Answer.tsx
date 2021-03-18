import React from "react";
import { Title, Text } from "react-native-paper";
import FinishButton from "../log_out/FinishButton";
import { AnswerProps, description, rating } from "../question/Question";

export default function Answer(props: AnswerProps) {
  return (
    <>
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
      <FinishButton />
    </>
  );
}

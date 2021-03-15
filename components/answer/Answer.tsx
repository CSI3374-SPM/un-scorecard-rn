import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Title, Text, Divider, Button } from "react-native-paper";
import { AnswerProps, description, rating } from "../question/Question";

export default function Answer(props: AnswerProps) {
  return (
    <ScrollView>
      {props.data.map((items, index) => (
        <>
          <Title>ID</Title>
          <Text key={`${index}-question-num`}>{index + 1}</Text>

          <Title>Score</Title>
          <Text key={`${index}-score`}>{`${items.score} (${
            description[rating(items.score)]
          })`}</Text>

          <Title>Justification</Title>
          <Text key={`${index}-justification`}>{`${
            items.justification === undefined
              ? "None provided"
              : items.justification
          }`}</Text>
          <Divider></Divider>
        </>
      ))}
      <Button
        mode="contained"
        style={{
          marginTop: 20,
          height: 50,
          marginLeft: 500,
          marginRight: 500,
          justifyContent: "center",
        }}
      >
        Done
      </Button>
    </ScrollView>
  );
}

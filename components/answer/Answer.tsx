import React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Title, Text, Divider, Button } from "react-native-paper";
import FinishButton from "../log_out/FinishButton";
import { AnswerProps, description, rating } from "../question/Question";
import WebView from "react-native-webview";

export default function Answer(props: AnswerProps) {
  return (
    <ScrollView>
      {props.data.map((items, index) => (
        <View key={`answer-${index}`}>
          <Title>ID</Title>
          <Text>{index + 1}</Text>

          <Title>Score</Title>
          <Text>{`${items.score} (${description[rating(items.score)]})`}</Text>

          <Title>Justification</Title>
          <Text>{`${
            items.justification === undefined
              ? "None provided"
              : items.justification
          }`}</Text>
          <Divider></Divider>
        </View>
      ))}
      <FinishButton
        style={{
          marginTop: 20,
          height: 50,
          marginLeft: 500,
          marginRight: 500,
          justifyContent: "center",
        }}
      />
    </ScrollView>
  );
}

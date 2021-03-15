import { values } from "lodash";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Title, Text, Divider, Button } from "react-native-paper";
import { AnswerProps, description, rating, ans } from "../question/Question";

export default function Answer(props: AnswerProps) {
  return(
    <ScrollView>
    {ans.map((items, key)=>(
            <>
            <Title>ID</Title>
            <Text key={key}>{key+1}</Text>
            
            <Title>Score</Title>
            <Text key={key}>{`${items.score} (${
              description[rating(items.score)]
            })`}</Text>
    
            <Title>Justification</Title>
            <Text key={key}>{`${
              items.justification === undefined
                ? "None provided"
                : items.justification
            }`}</Text>
            <Divider></Divider>
          </>
          
    ))}
    <Button mode="contained" 
            style={{marginTop: 20,
              height: 50,
              marginLeft: 500,
              marginRight: 500,
              justifyContent: 'center',}}   
              >Done</Button>
    </ScrollView>
    
    
  );

}

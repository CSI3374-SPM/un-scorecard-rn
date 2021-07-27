import * as React from "react";
import { StyleSheet, View, Text, Linking} from "react-native";
import {Button, Title} from "react-native-paper";
import Unorderedlist from 'react-native-unordered-list';

export default function IntroductionScreen() {
  return(
  <View style={styles.container}>
    <View style={styles.intro}>
      <Title style={{fontWeight:"bold", fontSize: 22}}>
      Introduction
      </Title>
      <Text >
      This app is intended to improve collaboration and discussion as well as 
      data visualization for Disaster Risk Reduction when compared to the existing UNDRR website.
      </Text>
      <Text></Text>
      <Text style={styles.section}>
            Moderator
      </Text>
      <Unorderedlist>
        <Text style={{marginTop:3, marginLeft: 10}}>
              A moderator is able to control the pace/flow of a survey for users and view data as questions
              in the survey are answered.
        </Text>
      </Unorderedlist>
      <Unorderedlist>
        <Text style={{marginTop:5, marginLeft: 10}}>
              Moderators can also email survey results to whomever they choose.
        </Text>
      </Unorderedlist>
      <Text></Text>
      <Text style={styles.section}>
            User
      </Text>
      <Unorderedlist>
        <Text style={{marginTop:3, marginLeft: 10}}>
              A user is able to respond to each question of the survey with a score (0-5) based on how prepared
              or well equipped they feel the organization is.
        </Text>
      </Unorderedlist>
      <Unorderedlist>
        <Text style={{marginTop:5, marginLeft: 10}}>
              Users can also provide a justification for their score for a given question, if they choose.
        </Text>
      </Unorderedlist>
    </View>
    <View style={styles.link}>
      <Button
              onPress={() => {
                Linking.openURL('https://www.undrr.org');
              }}>
              UN Disaster Risk Reduction Webpage
      </Button>
    </View>
    <View style={styles.credits}>
      <Text>
        Credits:
      </Text>
      <Text>
        Jacob Curtis - Baylor University
      </Text>
      <Text>
        Jose Carlos Acosta - Baylor University
      </Text>
      <Text>
        Leighton Glim - Baylor University
      </Text>
      <Text>
        Peiyang Chang - Baylor University
      </Text>
      <Text>
        Josh McKone - Baylor University
      </Text>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  intro: {
    flex: 0.7,
    marginLeft: "7%",
    marginRight: "7%",
  },
  section: {
    fontWeight:"bold", 
    fontSize:17,
    marginTop: 25
  },
  link: {
    flex: 0.1,
    justifyContent: "flex-end",

  },
  credits: {
    flex:0.2,
    marginBottom:"12%",
    marginLeft:"7%",
    justifyContent:"flex-end"
  }
});
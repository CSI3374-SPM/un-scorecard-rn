import React, { useState } from "react";
import { Button, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";

import { fetchSurveyResults } from "../../api/Wrapper";
import { authenticationProps } from "../generate_code/GenerateCodeScreen";
import { connect } from "react-redux";
import { mapStateToProps } from "../generate_code/GenerateCodeScreenRedux";
import mapDispatchToProps from "../generate_code/GenerateCodeScreenD2P";

function OrganizerScreen(props: authenticationProps) {
  const [results, setResults] = useState([]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.data.id}</Text>
      <Text>{results}</Text>
      <Button
        mode="contained"
        onPress={() => {
          props.updateAuthentication({ isOrganizer: false, id: "" });
        }}
      >
        Reset props
      </Button>
    </View>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(OrganizerScreen);

async function getResults(id: string) {
  let surveyResults = await fetchSurveyResults(id);

  return surveyResults;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

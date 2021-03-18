import React, { useState } from "react";
<<<<<<< HEAD
import { Button, Text, TextInput } from "react-native-paper";
=======
import { Button, Text } from "react-native-paper";
>>>>>>> master
import { StyleSheet, View } from "react-native";

import { fetchSurveyResults } from "../../api/Wrapper";
import { authenticationProps } from "../generate_code/GenerateCodeScreen";
import { connect } from "react-redux";
import { mapStateToProps } from "../generate_code/GenerateCodeScreenRedux";
import mapDispatchToProps from "../generate_code/GenerateCodeScreenD2P";
import FinishButton from "../log_out/FinishButton";
import { useNavigation } from "@react-navigation/core";
import { RootNavigationProp } from "../../types";

function OrganizerScreen(props: authenticationProps) {
<<<<<<< HEAD
  const navigator = useNavigation<RootNavigationProp>();
  const [id, setID] = useState("");
=======
>>>>>>> master
  const [results, setResults] = useState([]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.data.id}</Text>
      <Text>{results}</Text>
<<<<<<< HEAD
      <Button mode="contained" onPress={() => navigator.navigate("Email")}>
        Email Results
      </Button>
      <FinishButton />
=======
      <Button
        mode="contained"
        onPress={() => {
          props.updateAuthentication({ isOrganizer: false, id: "" });
        }}
      >
        Reset props
      </Button>
>>>>>>> master
    </View>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(OrganizerScreen);
<<<<<<< HEAD
=======

async function getResults(id: string) {
  let surveyResults = await fetchSurveyResults(id);

  return surveyResults;
}
>>>>>>> master

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

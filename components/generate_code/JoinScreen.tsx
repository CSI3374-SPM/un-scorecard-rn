import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { fetchSurveyResults } from "../../api/Wrapper";
import { authenticationProps } from "./GenerateCodeScreen";
import { mapStateToProps } from "./GenerateCodeScreenRedux";
import mapDispatchToProps from "./GenerateCodeScreenD2P";
import { connect } from "react-redux";
import _ from "lodash";

function JoinScreen(props: authenticationProps) {
  const [id, setID] = useState("");
  return (
    <View style={styles.container}>
      <TextInput
        label="Session code"
        value={id}
        onChangeText={(id) => setID(id)}
      />
      <Button
        mode="contained"
        onPress={async () => {
          await validateId(id, props);
          setID("");
        }}
      >
        Join
      </Button>
    </View>
  );
}

async function validateId(id: string, props: authenticationProps) {
  let surveyResults = await fetchSurveyResults(id);
  console.log("Survey results ", surveyResults);

  if (!_.isNull(surveyResults)) {
    props.updateAuthentication({ isOrganizer: false, id: id });
  } else {
    console.log("invalid id");
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinScreen);

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

import React from "react";
import { Button, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";

import { authenticationProps } from "../generate_code/GenerateCodeScreen";
import { connect } from "react-redux";
import { mapStateToProps } from "../generate_code/GenerateCodeScreenRedux";
import mapDispatchToProps from "../generate_code/GenerateCodeScreenD2P";

function SurveyEndScreen(props: authenticationProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thank you for asnwering this survey!</Text>
      <Button
        mode="contained"
        onPress={() => {
          props.updateAuthentication({ isOrganizer: false, id: "" });
        }}
      >
        Exit
      </Button>
    </View>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveyEndScreen);

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

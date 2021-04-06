import React from "react";
import { Button, FAB } from "react-native-paper";

import { connect } from "react-redux";
import {
  mapDispatchToProps,
  mapStateToProps,
  SurveyProps,
} from "../../store/survey/SurveyReducer";
import { DarkTheme, DefaultTheme } from "../../constants/Colors";
import { useColorScheme } from "react-native";

function FinishButton(props: SurveyProps) {
  const theme = useColorScheme() === "dark" ? DarkTheme : DefaultTheme;
  return (
    <FAB
      icon=""
      label="Exit Survey"
      style={{
        backgroundColor: theme.colors.exit,
      }}
      onPress={() => {
        props.updateAuthentication({
          isOrganizer: false,
          surveyId: "",
          responseId: null,
        });
        props.updateAnswer([]);
      }}
    />
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(FinishButton);

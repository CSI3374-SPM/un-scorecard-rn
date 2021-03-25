import React from "react";
import { Button } from "react-native-paper";

import { connect } from "react-redux";
import {
  mapDispatchToProps,
  mapStateToProps,
  SurveyProps,
} from "../../store/survey/SurveyReducer";

function FinishButton(props: SurveyProps) {
  return (
    <Button
      mode="contained"
      onPress={() => {
        props.updateAuthentication({
          isOrganizer: false,
          surveyId: "",
          responseId: null,
        });
        props.updateAnswer([]);
      }}
    >
      Finish Survey
    </Button>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(FinishButton);

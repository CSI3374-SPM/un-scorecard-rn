import React from "react";
import { Button } from "react-native-paper";

import { connect } from "react-redux";
import { SurveyProps } from "../../store/survey/SurveyReducer";
import mapDispatchToProps from "../question/QuestionD2P";
import { mapStateToProps } from "../question/QuestionRedux";

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
      }}
    >
      Finish Survey
    </Button>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(FinishButton);

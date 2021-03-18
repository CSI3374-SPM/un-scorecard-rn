import React from "react";
import { Button } from "react-native-paper";

// import { authenticationProps } from "../generate_code/GenerateCodeScreen";
import { connect } from "react-redux";
import { SurveyProps } from "../../store/survey/SurveyReducer";
import mapDispatchToProps from "../question/QuestionD2P";
// import { mapStateToProps } from "../generate_code/GenerateCodeScreenRedux";
// import mapDispatchToProps from "../generate_code/GenerateCodeScreenD2P";
import { mapStateToProps } from "../question/QuestionRedux";

function FinishButton(props: SurveyProps) {
  //authenticationProps) {
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

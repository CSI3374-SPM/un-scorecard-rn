import { Dispatch } from "redux";
import {
  SurveyAction,
  SurveyActionTypes,
} from "../../store/survey/SurveyAction";
import {
  AuthenticationData,
  SurveyResponse,
} from "../../store/survey/SurveyReducer";

function dispatchAnswerUpdate(
  dispatch: Dispatch<SurveyAction>,
  answer: SurveyResponse[]
) {
  // Dispatch update
  dispatch({
    type: SurveyActionTypes.UPDATE_ANSWERS_ACTION,
    payload: answer,
  });
}

function dispatchAuthenticationUpdate(
  dispatch: Dispatch<SurveyAction>,
  authentication: AuthenticationData
) {
  // Dispatch update
  dispatch({
    type: SurveyActionTypes.UPDATE_AUTH_ACTION,
    payload: authentication,
  });
}

const mapDispatchToProps = (dispatch: Dispatch<SurveyAction>) => {
  return {
    updateAnswer: (answer: SurveyResponse[]) => {
      dispatchAnswerUpdate(dispatch, answer);
    },
    updateAuthentication: (authentication: AuthenticationData) => {
      dispatchAuthenticationUpdate(dispatch, authentication);
    },
    dispatch,
  };
};

export default mapDispatchToProps;

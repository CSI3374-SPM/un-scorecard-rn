import { Dispatch } from "redux";
import {
  AnswerAction,
  AnswerActionTypes,
} from "../../store/answer/AnswerAction";
import { AnswerData } from "../../store/answer/AnswerReducer";

function dispatchAnswerUpdate(
  dispatch: Dispatch<AnswerAction>,
  answer: AnswerData[]
) {
  // Dispatch update
  dispatch({
    type: AnswerActionTypes.UPDATE_ACTION,
    payload: answer,
  });
}

const mapDispatchToProps = (dispatch: Dispatch<AnswerAction>) => {
  return {
    updateAnswer: (answer: AnswerData[]) => {
      dispatchAnswerUpdate(dispatch, answer);
    },
    dispatch,
  };
};

export default mapDispatchToProps;

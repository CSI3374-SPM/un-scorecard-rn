import { Dispatch } from "redux";
import {
  ExampleAction,
  ExampleActionTypes,
} from "../../store/example/ExampleActions";

function dispatchNumberUpdate(dispatch: Dispatch<ExampleAction>, n: number) {
  // Dispatch update
  dispatch({
    type: ExampleActionTypes.UPDATE_ACTION,
    payload: { n: n },
  });
}

const mapDispatchToProps = (dispatch: Dispatch<ExampleAction>) => {
  return {
    updateNumber: (n: number) => dispatchNumberUpdate(dispatch, n),
    dispatch,
  };
};

export default mapDispatchToProps;

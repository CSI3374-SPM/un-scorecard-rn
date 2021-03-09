import { Dispatch } from "redux";
import {
    idAction,
    idActionTypes,
} from "../../store/id/idAction";
import { idData } from "../../store/id/idReducer";

function dispatchidUpdate(
    dispatch: Dispatch<idAction>,
    id: idData
) {
    // Dispatch update
    dispatch({
        type: idActionTypes.UPDATE_ACTION,
        payload: id,
    });
}

const mapDispatchToProps = (dispatch: Dispatch<idAction>) => {
    return {
        updateid: (id: idData) => {
            dispatchidUpdate(dispatch, id);
        },
        dispatch,
    };
};

export default mapDispatchToProps;

import { Dispatch } from "redux";
import {
    authenticationAction,
    authenticationActionTypes,
} from "../../store/authentication/authenticationAction";
import { authenticationData } from "../../store/authentication/authenticationReducer";

function dispatchAuthenticationUpdate(
    dispatch: Dispatch<authenticationAction>,
    authentication: authenticationData
) {
    // Dispatch update
    dispatch({
        type: authenticationActionTypes.UPDATE_ACTION,
        payload: authentication,
    });
}



const mapDispatchToProps = (dispatch: Dispatch<authenticationAction>) => {
    return {
        updateAuthentication: (authentication: authenticationData) => {
            dispatchAuthenticationUpdate(dispatch, authentication);
        },
        dispatch,
    };
};

export default mapDispatchToProps;

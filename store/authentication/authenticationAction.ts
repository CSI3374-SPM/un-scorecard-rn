import { authenticationData } from "./authenticationReducer";

export const authenticationReduxName = "authentication";
export enum authenticationActionTypes {
    UPDATE_ACTION = "authentication/update",
}

// Aggregate action type; | all action types together => FirstAction | SecondAction
export type authenticationAction = UpdateAction;

export interface UpdateAction {
    type: authenticationActionTypes.UPDATE_ACTION;
    payload: authenticationData;
}

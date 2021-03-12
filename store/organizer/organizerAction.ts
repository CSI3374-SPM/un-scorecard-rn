import { organizerData } from "./organizerReducer";

export const organizerReduxName = "organizer";
export enum organizerActionTypes {
    UPDATE_ACTION = "organizer/update",
}

// Aggregate action type; | all action types together => FirstAction | SecondAction
export type organizerAction = UpdateAction;

export interface UpdateAction {
    type: organizerActionTypes.UPDATE_ACTION;
    payload: organizerData;
}

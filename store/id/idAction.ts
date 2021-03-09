import { idData } from "./idReducer";

export const idReduxName = "id";
export enum idActionTypes {
    UPDATE_ACTION = "id/update",
}

// Aggregate action type; | all action types together => FirstAction | SecondAction
export type idAction = UpdateAction;

export interface UpdateAction {
    type: idActionTypes.UPDATE_ACTION;
    payload: idData;
}

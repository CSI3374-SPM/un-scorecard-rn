import { AnswerData } from "./AnswerReducer";

export const answerReduxName = "answer";
export enum AnswerActionTypes {
  UPDATE_ACTION = "answer/update",
}

// Aggregate action type; | all action types together => FirstAction | SecondAction
export type AnswerAction = UpdateAction;

export interface UpdateAction {
  type: AnswerActionTypes.UPDATE_ACTION;
  payload: AnswerData[];
}


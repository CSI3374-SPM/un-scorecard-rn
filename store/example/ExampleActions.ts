import { ExampleData } from "./ExampleReducer";

export const exampleReduxName = "example";
export enum ExampleActionTypes {
  UPDATE_ACTION = "example/update",
}

// Aggregate action type; | all action types together => FirstAction | SecondAction
export type ExampleAction = UpdateAction;

export interface UpdateAction {
  type: ExampleActionTypes.UPDATE_ACTION;
  payload: ExampleData;
}

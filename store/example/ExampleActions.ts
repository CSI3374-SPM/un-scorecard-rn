import { ExampleData } from "./ExampleReducer";

export const exampleReduxName = "user";
export enum ExampleActionTypes {
  FIRST_ACTION = "example/first",
  SECOND_ACTION = "example/second"
}

// Aggregate action type; | all action types together
export type ExampleAction = FirstAction | SecondAction;

export interface FirstAction {
  type: ExampleActionTypes.FIRST_ACTION;
  payload: ExampleData;
}

export interface SecondAction {
  type: ExampleActionTypes.SECOND_ACTION;
  payload: ExampleData;
}
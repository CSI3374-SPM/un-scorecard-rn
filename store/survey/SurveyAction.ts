import {
  SurveyResponse,
  AuthenticationData,
  LanguageData,
} from "./SurveyReducer";

export const surveyReduxName = "survey";
export enum SurveyActionTypes {
  UPDATE_ANSWERS_ACTION = "survey/answer-update",
  UPDATE_AUTH_ACTION = "survey/auth-update",
  UPDATE_LANG_ACTION = "survey/lang-update",
}

// Aggregate action type; | all action types together => FirstAction | SecondAction
export type SurveyAction =
  | UpdateAnswersAction
  | UpdateAuthAction
  | UpdateLanguageAction;

export interface UpdateAnswersAction {
  type: SurveyActionTypes.UPDATE_ANSWERS_ACTION;
  payload: SurveyResponse[];
}

// Aggregate action type; | all action types together => FirstAction | SecondAction
export interface UpdateAuthAction {
  type: SurveyActionTypes.UPDATE_AUTH_ACTION;
  payload: AuthenticationData;
}

export interface UpdateLanguageAction {
  type: SurveyActionTypes.UPDATE_LANG_ACTION;
  payload: LanguageData;
}

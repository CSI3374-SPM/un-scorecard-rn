import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import {
  SurveyActionTypes,
  SurveyAction,
  surveyReduxName,
} from "./SurveyAction";

// The data field for the state
export interface SurveyResponse {
  questionIndex: number;
  // Score restricted to 0 to 5
  score: number;
  justification?: string;
}

// The data field for the state
export interface AuthenticationData {
  // isOrganizer boolean value
  isOrganizer: boolean;
  // id String
  surveyId: string;
  responseId: string | null;
}

interface State {
  data: SurveyData;
}

export interface SurveyData {
  responses: SurveyResponse[];
  authentication: AuthenticationData;
}

export interface SurveyProps {
  data: SurveyData;
  updateAnswer: (answer: SurveyResponse[]) => void;
  updateAuthentication: (authentication: AuthenticationData) => void;
}

// Create the example state slice
const surveySlice = createSlice({
  name: surveyReduxName,
  initialState: {
    data: {
      responses: [],
      authentication: {
        isOrganizer: false,
        surveyId: "",
        responseId: null,
      },
    },
  },
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<State>) => {
    // @ts-ignore
    builder
      .addCase(
        SurveyActionTypes.UPDATE_ANSWERS_ACTION,
        (state: State, action: SurveyAction) => {
          // @ts-ignore
          state.data.responses = action.payload;
          return state;
        }
      )
      .addCase(
        SurveyActionTypes.UPDATE_AUTH_ACTION,
        (state: State, action: SurveyAction) => {
          // @ts-ignore
          state.data.authentication = action.payload;
          return state;
        }
      );
  },
});

export default surveySlice;

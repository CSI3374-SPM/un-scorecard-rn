import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import {
  AnswerActionTypes,
  AnswerAction,
  answerReduxName,
} from "./AnswerAction";

// The data field for the state
export interface AnswerData {
  // Score restricted to 0 to 5
  num: number;
  score: number;
  justification?: string;
}

interface State {
  data: AnswerData;
}

// Create the example state slice
const answerSlice = createSlice({
  name: answerReduxName,
  initialState: {
    data: {
      num: 0,
      score: 0,
    },
  },
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<State>) => {
    builder.addCase(
      AnswerActionTypes.UPDATE_ACTION,
      (state: any, action: AnswerAction) => {
        state.data = action.payload;
        return state;
      }
    );
  },
});

export default answerSlice;

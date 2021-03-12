import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
//import { State } from "react-native-gesture-handler";
import { act } from "react-test-renderer";
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
  data: AnswerData[];
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
  extraReducers: (builder: ActionReducerMapBuilder<any>) => {
    builder.addCase(
      AnswerActionTypes.UPDATE_ACTION,
      (state: any, action: AnswerAction) => {
      return {
        ...state,
        data: [...state.data, action.payload] 
      }
       // state.data = action.payload;
      //  state.data.push(action.payload);
     //   return state;
      }
    );
  },
});

export default answerSlice;

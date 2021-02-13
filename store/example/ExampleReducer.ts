import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import {
  ExampleActionTypes,
  UpdateAction,
  exampleReduxName,
} from "./ExampleActions";

// The data field for the state
export interface ExampleData {
  n: number;
}

interface State {
  data: ExampleData;
}

// Create the example state slice
const exampleSlice = createSlice({
  name: exampleReduxName,
  initialState: {
    data: {
      n: 0,
    },
  },
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<State>) => {
    builder.addCase(
      ExampleActionTypes.UPDATE_ACTION,
      (state: any, action: UpdateAction) => {
        state.data = action.payload;
        return state;
      }
    );
  },
});

export default exampleSlice;

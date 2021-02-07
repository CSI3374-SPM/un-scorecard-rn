import { createSlice } from '@reduxjs/toolkit'
import { ExampleActionTypes, FirstAction, SecondAction, exampleReduxName } from './ExampleActions';

// The data field for the state
export interface ExampleData {
  // ...
}

// Create the example state slice
const exampleSlice = createSlice({
  name: exampleReduxName,
  initialState: {
    data: {}
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(ExampleActionTypes.FIRST_ACTION, (state: any, action: FirstAction) => {
      state.data = action.payload;
      return state;
    });
    builder.addCase(ExampleActionTypes.SECOND_ACTION, (state: any, action: SecondAction) => {
      state.data = action.payload;
      return state;
    });
  }
});

export default exampleSlice;
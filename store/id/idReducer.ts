import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import {
    idActionTypes,
    idAction,
    idReduxName,
} from "./idAction";

// The data field for the state
export interface idData {
    // Id string value
    id: string;
}

interface State {
    data: idData;
}

// Create the example state slice
const idSlice = createSlice({
    name: idReduxName,
    initialState: {
        data: {
            id: "",
        },
    },
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<State>) => {
        builder.addCase(
            idActionTypes.UPDATE_ACTION,
            (state: any, action: idAction) => {
                state.data = action.payload;
                return state;
            }
        );
    },
});

export default idSlice;

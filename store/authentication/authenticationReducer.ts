import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import {
    authenticationActionTypes,
    authenticationAction,
    authenticationReduxName,
} from "./authenticationAction";

// The data field for the state
export interface authenticationData {
    // isauthentication boolean value
    isOrganizer: boolean;
    id: string;
}

interface State {
    data: authenticationData;
}

// Create the example state slice
const authenticationSlice = createSlice({
    name: authenticationReduxName,
    initialState: {
        data:{
            isOrganizer: false,
            id: "",
        },
    },
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<State>) => {
        builder.addCase(
            authenticationActionTypes.UPDATE_ACTION,
            (state: any, action: authenticationAction) => {
                state.data = action.payload;
                return state;
            }
        );
    },
});

export default authenticationSlice;

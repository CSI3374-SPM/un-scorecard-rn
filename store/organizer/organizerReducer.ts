import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import {
    organizerActionTypes,
    organizerAction,
    organizerReduxName,
} from "./organizerAction";

// The data field for the state
export interface organizerData {
    // isOrganizer boolean value
    isOrganizer: boolean;
}

interface State {
    data: organizerData;
}

// Create the example state slice
const organizerSlice = createSlice({
    name: organizerReduxName,
    initialState: {
        data:{
            isOrganizer: false,
        },
    },
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<State>) => {
        builder.addCase(
            organizerActionTypes.UPDATE_ACTION,
            (state: any, action: organizerAction) => {
                state.data = action.payload;
                return state;
            }
        );
    },
});

export default organizerSlice;

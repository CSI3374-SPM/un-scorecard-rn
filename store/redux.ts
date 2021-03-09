import { combineReducers } from "redux";
import { configureStore, DeepPartial } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { answerReduxName } from "./answer/AnswerAction";
import answerReducer from "./answer/AnswerReducer";
import {idReduxName} from "./id/idAction";
import idReducer from "./id/idReducer";

const reducers = combineReducers({
  // ... reducers go here
  [answerReduxName]: answerReducer.reducer,
  [idReduxName]: idReducer.reducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const buildStore = <S>(
  initialState: DeepPartial<S extends any ? S : S>
) => {
  return configureStore({
    preloadedState: initialState,
    reducer: persistedReducer,
    middleware: [thunk],
    devTools: process.env.NODE_ENV !== "production",
  });
};

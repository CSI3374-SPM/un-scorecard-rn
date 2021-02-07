import { combineReducers } from 'redux';
import { configureStore, DeepPartial } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { exampleReduxName } from './example/ExampleActions';
import exampleReducer from './example/ExampleReducer';

const reducers = combineReducers({
  // ... reducers go here
  [exampleReduxName]: exampleReducer.reducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const buildStore = <S>(initialState: DeepPartial<S extends any ? S : S>) => {
  return configureStore({
    preloadedState: initialState,
    reducer: persistedReducer,
    middleware: [thunk],
    devTools: process.env.NODE_ENV !== 'production'
  });
};
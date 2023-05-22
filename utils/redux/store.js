import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import storage from 'redux-persist/lib/storage';
import {
    persistReducer,  
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,} from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';

const persistConfig = {
    key:'root',
    version: 1,
    storage
};

const reducer = combineReducers({
    user: userSlice,
})

const persistedReducer = persistReducer(persistConfig, reducer);


export default configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
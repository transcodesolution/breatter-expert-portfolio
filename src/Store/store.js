import { combineReducers, configureStore } from "@reduxjs/toolkit";
import auth from "./Reducers/Authreducer/auth";
import profile from "./Reducers/Profilereducer/profile";
import storage from "redux-persist/lib/storage";
import currency from "./Reducers/Currencyreducer/currency";
import notification from "./Reducers/Notificationreducer/notificatoin";

import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";

const persistConfigExpertAuth = { key: "expertAuth", storage, version: 1 };
const persistConfigCurrency = { key: "currenctExpert", storage, version: 1 };
// const persistConfigExpertProfile = { key: "expertProfile", storage, version: 1 };
const persistedReducerUser = persistReducer(persistConfigExpertAuth, auth);
const persistedReducerCurrency = persistReducer(persistConfigCurrency, currency);
const combineReducer = combineReducers({ expert: persistedReducerUser, profile,currencyExpert:persistedReducerCurrency,notification })
const store = configureStore({
    reducer: combineReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});
export default store;
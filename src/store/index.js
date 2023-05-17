import { combineReducers, configureStore } from "@reduxjs/toolkit";

import auth from "./reducer/auth";
import recipe from "./reducer/recipe";

import { persistStore, persistReducer } from "redux-persist";

import storageSession from "redux-persist/lib/storage/session";

//COMBINE ALL REDUCERS
const reducers = combineReducers({
  auth,
  recipe,
});

const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["auth", "recipe"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;

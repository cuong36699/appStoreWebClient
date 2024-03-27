import { configureStore } from "@reduxjs/toolkit";
import Reducer from "./reducers";
import CommonReducer from "./reducers/common";

export const store = configureStore({
  reducer: {
    api: Reducer,
    common: CommonReducer,
  },
});

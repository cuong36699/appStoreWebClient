import { configureStore } from "@reduxjs/toolkit";
import Reducer from "./reducers";

export const store = configureStore({
  reducer: {
    api: Reducer,
  },
});

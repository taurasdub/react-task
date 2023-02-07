import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./filter";
import extendedReducer from "./extendedInfo";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    extendedInformation: extendedReducer,
  },
});

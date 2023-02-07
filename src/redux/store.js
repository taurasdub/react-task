import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./filter";
import extendedReducer from "./extendedInfo";
import editReducer from "./edit";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    extendedInformation: extendedReducer,
    edit: editReducer,
  },
});

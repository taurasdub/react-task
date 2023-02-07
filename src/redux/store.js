import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./filter";
import extendedReducer from "./extendedInfo";
import editReducer from "./edit";
import addReducer from "./addRecipe";
import newRecipeReducer from "./newRecipeSlice";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    extendedInformation: extendedReducer,
    edit: editReducer,
    addRecipe: addReducer,
    newRecipe: newRecipeReducer,
  },
});

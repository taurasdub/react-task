import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./filter";
import extendedReducer from "./extendedInfo";
import editReducer from "./edit";
import listReducer from "./list";
import addReducer from "./addRecipe";
import newRecipeReducer from "./newRecipeSlice";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    extendedInformation: extendedReducer,
    edit: editReducer,
    list: listReducer,
    addRecipe: addReducer,
    newRecipe: newRecipeReducer,
  },
});

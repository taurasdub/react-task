import { createSlice } from "@reduxjs/toolkit";

const addRecipeSlice = createSlice({
  name: "addRecipe",
  initialState: false,
  reducers: {
    setAddRecipe: (state, action) => {
      return action.payload;
    },
  },
});

export const { setAddRecipe } = addRecipeSlice.actions;

export default addRecipeSlice.reducer;

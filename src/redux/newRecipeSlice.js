import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  name: "",
  tags: [],
  country: "",
  preparationInstructions: [],
  ingredientsList: [],
  imageUrl: "",
  videoUrl: "",
};

const newRecipeSlice = createSlice({
  name: "newRecipe",
  initialState,
  reducers: {
    setAddRecipe: (state, action) => {
      return action.payload;
    },
  },
});

export const { setAddRecipe } = newRecipeSlice.actions;

export default newRecipeSlice.reducer;

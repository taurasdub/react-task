import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  tags: "",
  country: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state[action.payload.name] = action.payload.value;
    },
  },
});

export const { setFilter } = filterSlice.actions;

export default filterSlice.reducer;

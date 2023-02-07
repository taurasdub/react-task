import { createSlice } from "@reduxjs/toolkit";

const extendedInformationSlice = createSlice({
  name: "extendedInformation",
  initialState: null,
  reducers: {
    setExtendedInformation: (state, action) => {
      return action.payload;
    },
  },
});

export const { setExtendedInformation } = extendedInformationSlice.actions;

export default extendedInformationSlice.reducer;

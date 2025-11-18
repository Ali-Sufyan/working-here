import { createSlice } from "@reduxjs/toolkit";
import { MinilayoutI } from "./mini-layout.interface";

const miniLayoutInitialState: MinilayoutI = {
  showMiniLayout: true,
};

const miniLayoutSlice = createSlice({
  name: "miniLayout",
  initialState: miniLayoutInitialState,
  reducers: {
    showMiniLayout: (state) => {
      state.showMiniLayout = true;
    },
    hideMiniLayout: (state) => {
      state.showMiniLayout = false;
    },
  },
});

export const { showMiniLayout, hideMiniLayout } = miniLayoutSlice.actions;
export const miniLayoutReducer = miniLayoutSlice.reducer;

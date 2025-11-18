import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FormsReducerI } from "./forms.interface";

const initialState: FormsReducerI = {};

const formSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    setKeyValue: (state, { payload }: PayloadAction<FormsReducerI>) => {
      Object.keys(payload).forEach((key) => {
        state[key] = { ...state[key], ...payload[key] };
      });

      return state;
    },
    deleteFormKeys: (state, { payload }: { payload: string[] }) => {
      payload.forEach((name) => {
        if (state[name]) delete state[name];
      });
      return state;
    },
  },
});

export const { setKeyValue, deleteFormKeys } = formSlice.actions;
export const formReducer = formSlice.reducer;

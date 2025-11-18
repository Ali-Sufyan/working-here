import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { systemI } from "./system.types";

const initialState: systemI = {
  _id: "",
  canRegisterOnAdminPanel: true,
  frontendLogo: "",
  frontendUrl: "",
  sendSms: false,
};

const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    updateSystem(state, action: PayloadAction<systemI>) {
      state = action.payload;
      return state;
    },
    resetSystem() {
      return initialState;
    },
  },
});

export const { updateSystem, resetSystem } = systemSlice.actions;
export const systemReducer = systemSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { InitialRoleStateI } from "./roles.types";

const initialState: InitialRoleStateI = {
  name: "",
  details: "",
  permissions: [],
};

const roleSlice = createSlice({
  initialState,
  name: "role",
  reducers: {
    setRole: (state, action) => {
      state.name = action.payload.name;
      state.details = action.payload.details;
      state.permissions = action.payload.permissions;
    },
  },
});

export const { setRole } = roleSlice.actions;
export const roleReducer = roleSlice.reducer;

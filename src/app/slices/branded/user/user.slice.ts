import { createSlice } from "@reduxjs/toolkit";
import { UserI } from "./user.types";

const initialState: { id: UserI["id"][] } = {
  id: [],
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser (state, action) {
      console.log(action.payload, "action.payload user added");
      const user: UserI[] = action.payload;

      state.id = user.map((e) => e.id);
    },
    removeUser(state, action) {
      state.id.filter((user) => user !== action.payload);
      return state;
    },
    resetUsers() {
      return initialState;
    },
  },
});

export const { addUser, removeUser, resetUsers } = userSlice.actions;
export const userReducer = userSlice.reducer;

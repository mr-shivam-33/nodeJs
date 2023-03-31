import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isLoading: false,
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userPending: (state) => {
      state.isLoading = true;
    },
    userSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
      state.error = "";
    },
    userFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    userClear: (state) => {
      state.isLoading = false;
      state.error = "";
      state.user = {};
    },
  },
});

export const { userPending, userSuccess, userFail, userClear } =
  userSlice.actions;

export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
};

export const authSlice = createSlice({
  name: "expertAuth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.token = action.payload.token;
    },
    setLogout: (state, action) => {
      state.token = null;
    },
  },
});
export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;

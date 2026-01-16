import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAuth: boolean;
}

const initialState: AuthState = {
  isAuth: false,
};

export const authSlice = createSlice({
  name: "IsAuth",
  initialState,
  reducers: {
    setAuthState: (state, action) => {
      state.isAuth = action.payload;
    },
    login(state) {
      state.isAuth = true;
    },
    logout: (state) => {
      state.isAuth = false;
    },
  },
});

export const { reducer, actions } = authSlice;
export const { login, logout, setAuthState } = actions;
export default reducer;

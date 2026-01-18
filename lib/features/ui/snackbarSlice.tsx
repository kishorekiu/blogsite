import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SnackbarSeverity = "info" | "success" | "warning" | "error";

interface SnackbarState {
  open?: boolean;
  message: string | undefined;
  severity: SnackbarSeverity;
}

const initialState: SnackbarState = {
  open: false,
  message: "",
  severity: "info",
};

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    openSnackbar: (state, action: PayloadAction<SnackbarState>) => {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity;
    },
    closeSnackbar: (state) => {
      state.open = false;
    },
  },
});

const { actions, reducer } = snackbarSlice;

export const { closeSnackbar, openSnackbar } = actions;
export default reducer;

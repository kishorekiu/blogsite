import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "@/lib/features/auth/authSlice";
import blogReducer from "@/lib/features/blog/blogSlice";
import snackbarReducer from "@/lib/features/ui/snackbarSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  blog: blogReducer,
  snackbar: snackbarReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];

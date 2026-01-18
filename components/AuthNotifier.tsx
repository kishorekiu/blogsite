"use client";
import { openSnackbar } from "@/lib/features/ui/snackbarSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { useEffect, useRef } from "react";

const AuthNotifier = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    if (isAuth) {
      dispatch(
        openSnackbar({
          message: "Successfully Signed In",
          severity: "success",
        }),
      );
    } else {
      dispatch(openSnackbar({ message: "Signed Out", severity: "info" }));
    }
  }, [isAuth, dispatch]);

  return null;
};

export default AuthNotifier;

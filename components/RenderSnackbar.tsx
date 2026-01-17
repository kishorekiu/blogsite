"use client";
import { useAppSelector } from "@/lib/hooks";
import { Snackbar } from "@mui/material";
import React, { useEffect, useRef } from "react";

const RenderSnackbar = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const [open, setOpen] = React.useState(false);
  const isMounted = useRef(false);
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    setOpen(true);
  }, [isAuth]);
  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        message={isAuth ? "Signed In" : "Signed Out"}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      />
    </div>
  );
};

export default RenderSnackbar;

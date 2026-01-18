"use client";
import { closeSnackbar } from "@/lib/features/ui/snackbarSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Alert, Snackbar, useMediaQuery, useTheme } from "@mui/material";

const RenderSnackbar = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme?.breakpoints?.down("sm"));
  const { message, open, severity } = useAppSelector((state) => state.snackbar);
  const handleClose = () => {
    dispatch(closeSnackbar());
  };
  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      autoHideDuration={4000}
      anchorOrigin={{
        vertical: isMobile ? "bottom" : "top",
        horizontal: "center",
      }}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default RenderSnackbar;

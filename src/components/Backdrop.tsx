import * as React from "react";
import { default as MuiBackdrop } from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { useAppContext } from "../context/index";

const Backdrop = () => {
  const {
    backdrop: { isOpen, closeBackdrop },
  } = useAppContext();
  return (
    <div>
      <MuiBackdrop
        sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }}
        open={isOpen}
        onClick={closeBackdrop}
      >
        <CircularProgress color="inherit" />
      </MuiBackdrop>
    </div>
  );
};

export default Backdrop;

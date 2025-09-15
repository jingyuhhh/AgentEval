import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const GlobalPopup = ({ open, onClose, onDisable }) => {
  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
          onClose();
        }
      }}
      disableEscapeKeyDown
      disableBackdropClick
      sx={{
        zIndex: 9999,
      }}
    >
      <DialogTitle>Share Your Data</DialogTitle>
      <DialogContent>
        <p>
          We would like to access your location to improve your experience.
          Would you like to share your location with us?
        </p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="outlined">
          Not now
        </Button>
        <Button onClick={onDisable} color="primary" variant="outlined">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GlobalPopup;

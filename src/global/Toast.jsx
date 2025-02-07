import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

let showToast = () => {};

export default function ToastContainer() {
  const [toast, setToast] = useState({ open: false, message: "", severity: "info" });

  showToast = (message, severity = "info") => {
    setToast({ open: true, message, severity });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setToast({ open: false, message: "", severity: "info" });
  };

  return (
    <Snackbar className="mx-[6vw]" open={toast.open} autoHideDuration={2000} onClose={handleClose}>
      <MuiAlert onClose={handleClose} severity={toast.severity} sx={{ width: "100%" }}>
        {toast.message}
      </MuiAlert>
    </Snackbar>
  );
}

export { showToast };
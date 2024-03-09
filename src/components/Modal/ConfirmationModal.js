import React from "react";
import { useSnackbar } from "notistack";
import "./ConfirmationModal.css";

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleConfirm = () => {
    onConfirm();
    enqueueSnackbar("Successfully Deleted the Item.", {
      variant: "success",
    });
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="confirmation-dialog-container">
      <div className="confirmation-message">{message}</div>
      <div className="confirmation-buttons">
        <button onClick={handleCancel}>Cancel</button>
        <button onClick={handleConfirm}>Confirm</button>
      </div>
    </div>
  );
};

export default ConfirmationDialog;

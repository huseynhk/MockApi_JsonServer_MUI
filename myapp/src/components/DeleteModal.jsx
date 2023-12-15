import React from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";

const DeleteModal = ({ deleteUser }) => {
  const { show, deletedItem, closeDeleteModal } = useGlobalContext();
  return (
    <Dialog open={show} onClose={closeDeleteModal}>
      <DialogContent>
        Are you sure you want to delete
        <span className="deletedItem">
          {deletedItem && deletedItem.fullName} ?
        </span>
        <Button
          variant="contained"
          color="error"
          onClick={() => deleteUser(deletedItem.id)}
        >
          Delete
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;

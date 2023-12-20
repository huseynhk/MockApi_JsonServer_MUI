import React from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import { DeleteUser } from "../api/apiRequest";
import { QUERIES } from "../constant/Queries";
import { useMutation, useQueryClient } from "react-query";

const DeleteModal = () => {
  const { show, deletedItem, closeDeleteModal } = useGlobalContext();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: DeleteUser, // (userId) => DeleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries(QUERIES.Users);
      closeDeleteModal();
      toast.success("User deleted successfully!", {
        autoClose: 1000,
      });
    },
  });

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
          onClick={() => mutation.mutate(deletedItem.id)}
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "Deleting..." : "Delete"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;

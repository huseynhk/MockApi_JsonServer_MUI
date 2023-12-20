import React, { useState } from "react";
import { EditUsers } from "../api/apiRequest";
import { useGlobalContext } from "../contexts/GlobalContext";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { QUERIES } from "../constant/Queries";
import { useMutation, useQueryClient } from "react-query";

const EditUser = () => {
  const { isModalOpen, editedItem, closeModal } = useGlobalContext();
  const [editedUser, setEditedUser] = useState(editedItem);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn:() => EditUsers(editedUser.id, editedUser),
    onSuccess: () => {
      queryClient.invalidateQueries(QUERIES.SingleUser);
      closeModal();
    },
  });
  const updateUser = async () => {
    mutation.mutate(editedUser);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setEditedUser({
      ...editedUser,
      [name]: value,
    });
  };

  return (
    <>
      <Dialog open={isModalOpen} onClose={closeModal}>
        <DialogContent>
          <h3>Edit Product</h3>
          <TextField
            type="text"
            label="FullName"
            name="fullName"
            value={editedUser.fullName}
            onChange={handleInputChange}
          />
          <TextField
            type="number"
            label="Age"
            name="age"
            value={editedUser.age}
            onChange={handleInputChange}
          />
          <TextField
            type="email"
            label="Email"
            name="email"
            value={editedUser.email}
            onChange={handleInputChange}
          />
          <TextField
            type="text"
            label="Phone"
            name="phone"
            value={editedUser.phone}
            onChange={handleInputChange}
          />

          <Button
            style={{ marginTop: "10px" }}
            variant="contained"
            color="primary"
            onClick={updateUser}
          >
            Save Changes
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditUser;

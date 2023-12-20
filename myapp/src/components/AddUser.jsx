import React, { useState, useEffect } from "react";
import { AddUsers } from "../api/apiRequest";
import { useNavigate } from "react-router-dom";
import { ROUTER } from "../constant/Router";
import { toast } from "react-toastify";
import { useGlobalContext } from "../contexts/GlobalContext";
import { TextField, Button } from "@mui/material";
import moment from "moment";
import { isValidEmail, isValidPhone } from "../utils/ValidRegex";
import { useMutation } from "react-query";

const initialState = {
  fullName: "",
  age: 0,
  email: "",
  phone: "",
};

const AddUser = () => {
  const { inputRef, setFocus } = useGlobalContext();
  const [newUser, setNewUser] = useState(initialState);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: AddUsers, // () => AddUsers(newUser),
    onSuccess: () => {
      setNewUser(initialState);
      toast.success("User added successfully!", {
        autoClose: 1000,
      });
      setTimeout(() => {
        navigate(ROUTER.Home);
      }, 1500);
    },
    onError: (error) => {
      console.error("Error adding user:", error.message);
      toast.error("Error adding user", {
        autoClose: 1000,
      });
    },
  });

  const isFormValid = () => {
    return Object.values(newUser).every((value) => value !== "");
  };

  const handleAddUser = async () => {
    if (!isValidEmail(newUser.email)) {
      toast.error("Invalid email address", {
        autoClose: 1000,
      });
      return;
    }

    if (!isValidPhone(newUser.phone)) {
      toast.error("Invalid phone number", {
        autoClose: 1000,
      });
      return;
    }
    const createDate = moment().valueOf();
    const userWithDate = { ...newUser, create_at: createDate };

    mutation.mutate(userWithDate);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  useEffect(() => {
    setFocus();
  }, []);

  return (
    <>
      <div className="center">
        <h1>Add User</h1>
        <div>
          <TextField
            type="text"
            name="fullName"
            value={newUser.fullName}
            onChange={handleInputChange}
            variant="standard"
            color="secondary"
            inputProps={{ ref: inputRef }}
            sx={{ width: "75ch", padding: "3ch" }}
            placeholder="Please enter fullName"
          />
        </div>
        <div>
          <TextField
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
            variant="standard"
            color="secondary"
            sx={{ width: "75ch", padding: "3ch" }}
            placeholder="Please enter email"
          />
        </div>
        <div>
          <TextField
            type="number"
            name="age"
            value={newUser.age}
            onChange={handleInputChange}
            variant="standard"
            color="secondary"
            sx={{ width: "75ch", padding: "3ch" }}
            placeholder="Please enter age"
          />
        </div>
        <div>
          <TextField
            type="text"
            name="phone"
            value={newUser.phone}
            onChange={handleInputChange}
            variant="standard"
            color="secondary"
            sx={{ width: "75ch", padding: "3ch" }}
            placeholder="Please enter phone number"
          />
        </div>

        <Button
          variant="contained"
          onClick={handleAddUser}
          color="secondary"
          sx={{ width: "77.5ch", marginTop: "2.5ch" }}
          disabled={!isFormValid()}
        >
          {mutation.isLoading ? "Adding User..." : "Add User"}
        </Button>
      </div>
    </>
  );
};

export default AddUser;

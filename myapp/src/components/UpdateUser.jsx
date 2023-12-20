import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTER } from "../constant/Router";
import { GetSingleUser, EditUsers } from "../api/apiRequest";
import { toast } from "react-toastify";
import { useGlobalContext } from "../contexts/GlobalContext";
import { TextField, Button } from "@mui/material";
import { isValidEmail, isValidPhone } from "../utils/ValidRegex";
import { QUERIES } from "../constant/Queries";
import { useQuery, useMutation } from "react-query";

const initialState = {
  fullName: "",
  age: 0,
  email: "",
  phone: "",
};

const UpdateUser = () => {
  const { inputRef, setFocus } = useGlobalContext();
  const [editedUser, setEditedUser] = useState(initialState);
  const { userId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: QUERIES.SingleUser,
    queryFn: () => GetSingleUser(userId),
    config: {
      refetchOnReconnect: true,
      refetchInterval: false,
    },
  });

  const mutation = useMutation({
    mutationFn: () => EditUsers(userId, editedUser),
    onSuccess: () => {
      setEditedUser(initialState);
      toast.success("User updated successfully!", {
        autoClose: 1000,
      });
      setTimeout(() => {
        navigate(ROUTER.Home);
      }, 1500);
    },
    onError: (error) => {
      console.error("Error updating user:", error.message);
      toast.error("Error updating user", {
        autoClose: 1000,
      });
    },
  });

  const handleEditUser = async () => {
    if (!isValidEmail(editedUser.email)) {
      toast.error("Invalid email address", {
        autoClose: 1000,
      });
      return;
    }

    if (!isValidPhone(editedUser.phone)) {
      toast.error("Invalid phone number", {
        autoClose: 1000,
      });
      return;
    }
    mutation.mutate(editedUser);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUser({
      ...editedUser,
      [name]: value,
    });
  };

  useEffect(() => {
    if (data) {
      setEditedUser(data);
    }
  }, [data]);

  useEffect(() => {
    setFocus();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching user</div>;
  }
  return (
    <>
      <div className="center">
        <h1>Update User</h1>

        <div>
          <TextField
            type="text"
            name="fullName"
            value={editedUser.fullName}
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
            value={editedUser.email}
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
            value={editedUser.age}
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
            value={editedUser.phone}
            onChange={handleInputChange}
            variant="standard"
            color="secondary"
            sx={{ width: "75ch", padding: "3ch" }}
            placeholder="Please enter phone number"
          />
        </div>

        <Button
          variant="contained"
          onClick={handleEditUser}
          color="secondary"
          sx={{ width: "77.5ch", marginTop: "2.5ch" }}
        >
          {mutation.isLoading ? "Updating User..." : "Update User"}
        </Button>
      </div>
    </>
  );
};

export default UpdateUser;

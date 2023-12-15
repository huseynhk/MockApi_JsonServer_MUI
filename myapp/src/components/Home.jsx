import React, { useEffect } from "react";
import { GetUsers, DeleteUser } from "../api/apiRequest";
import EditUser from "./EditUser";
import { useNavigate } from "react-router-dom";
import { ROUTER } from "../constant/Router";
import { toast } from "react-toastify";
import { useGlobalContext } from "../contexts/GlobalContext";
import DeleteModal from "./DeleteModal";
import moment from "moment";
import { styled } from "@mui/system";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Home = () => {
  const {
    isModalOpen,
    editedItem,
    openModal,
    openDeleteModal,
    closeDeleteModal,
    users,
    setUsers,
    handleSortUsers,
  } = useGlobalContext();

  const navigate = useNavigate();

  const fetchUsers = async () => {
    const response = await GetUsers();
    setUsers(response);
  };

  const deleteUser = async (userId) => {
    await DeleteUser(userId);
    fetchUsers();
    toast.success("User deleted successfully!", {
      autoClose: 1000,
    });
    closeDeleteModal();
  };

  const resetSortedData = async () => {
    await fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, [isModalOpen]);

  const StyledContainer = styled("div")({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    "& h1": {
      marginBottom: "-5px",
      fontSize: "36px",
      color: "blue",
    },
  });

  const StyledChild = styled("div")({
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    margin: "10px 0px",
    "& Button": {
      margin: "0px 10px",
    },
  });

  return (
    <>
      <StyledContainer>
        <h1>Table</h1>
        <StyledChild>
          <h3 className="sort">Sort Users</h3>
          <Select onChange={handleSortUsers}>
            <MenuItem value="A-Z">A-Z Fullname</MenuItem>
            <MenuItem value="Z-A">Z-A Fullname</MenuItem>
            <MenuItem value="Low-to-High">Low To High Age</MenuItem>
            <MenuItem value="High-to-Low">High To Low Age</MenuItem>
          </Select>

          <Button onClick={resetSortedData} variant="contained">
            Reset Sort
          </Button>
        </StyledChild>

        <div>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>S.No</TableCell>
                  <TableCell>FullName</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Email Address</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Added_Time</TableCell>
                  <TableCell>Updates</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <TableRow key={user.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{user.fullName}</TableCell>
                      <TableCell>{user.age}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>{moment(user?.create_at).fromNow()}</TableCell>
                      <TableCell>
                        <div className="btns">
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => openModal(user)}
                          >
                            Modal Edit
                          </Button>
                          <Button
                            variant="contained"
                            color="warning"
                            onClick={() =>
                              navigate(`${ROUTER.UpdateUser}/${user.id}`)
                            }
                          >
                            Page Edit
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="btns">
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => openDeleteModal(user)}
                          >
                            <DeleteIcon />
                          </Button>
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() =>
                              navigate(`${ROUTER.Detail}/${user.id}`)
                            }
                          >
                            <VisibilityIcon />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7}>No User available</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        {editedItem && <EditUser />}
        <DeleteModal deleteUser={deleteUser} />
      </StyledContainer>
    </>
  );
};

export default Home;

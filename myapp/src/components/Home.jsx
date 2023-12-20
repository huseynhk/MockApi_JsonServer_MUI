import React, { useEffect, useState } from "react";
import { GetUsers } from "../api/apiRequest";
import EditUser from "./EditUser";
import { useNavigate } from "react-router-dom";
import { ROUTER } from "../constant/Router";
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
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { QUERIES } from "../constant/Queries";
import { useQuery } from "react-query";

const Home = () => {
  const { isModalOpen, editedItem, openModal, openDeleteModal } =
    useGlobalContext();
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: QUERIES.Users,
    queryFn: GetUsers,
    config: {
      refetchOnReconnect: true,
      refetchInterval: false,
    },
  });
  const [sortedUsers, setSortedUsers] = useState([]);

  const handleSortUsers = (event) => {
    const sortedValue = event.target.value;
    const sortedData = [...data];

    sortedData.sort((a, b) => {
      if (sortedValue === "A-Z") {
        return a.fullName.localeCompare(b.fullName);
      } else if (sortedValue === "Z-A") {
        return b.fullName.localeCompare(a.fullName);
      } else if (sortedValue === "Low-to-High") {
        return a.age - b.age;
      } else {
        return b.age - a.age;
      }
    });

    setSortedUsers(sortedData);
  };

  const resetSortedData = async () => {
    await refetch();
    setSortedUsers([]);
  };

  useEffect(() => {
    refetch();
  }, [isModalOpen]);

  const StyledContainer = styled("div")({
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    flexDirection: "column",
    "& h1": {
      fontSize: "40px",
      color: "blue",
      marginBottom: "-3px"
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
            <Table aria-label="simple table" >
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

              <TableBody >
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7}>Loading...</TableCell>
                  </TableRow>
                ) : isError ? (
                  <TableRow>
                    <TableCell colSpan={7}>Error fetching users</TableCell>
                  </TableRow>
                ) : (
                  <>
                    {(sortedUsers.length > 0 ? sortedUsers : data).map(
                      (user, index) => (
                        <TableRow key={user.id} >
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{user.fullName}</TableCell>
                          <TableCell>{user.age}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.phone}</TableCell>
                          <TableCell>
                            {moment(user?.create_at).fromNow()}
                          </TableCell>
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
                                <DeleteForeverIcon />
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
                      )
                    )}
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        {editedItem && <EditUser />}
        <DeleteModal />
      </StyledContainer>
    </>
  );
};

export default Home;

import React, { useState, useEffect } from "react";
import { GetSingleUser } from "../api/apiRequest";
import { useParams } from "react-router-dom";
import { Card, CardContent, Typography } from "@mui/material";

const Detail = () => {
  const [user, setUser] = useState("");
  const { userId } = useParams();

  const fetchUser = async () => {
    const response = await GetSingleUser(userId);
    setUser(response);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <Card style={{ maxWidth: 400, margin: "auto", marginTop:"5rem"}}>
        <CardContent >
          <Typography variant="h4" gutterBottom>
          Datas of  {user.fullName} 
          </Typography>

          <Typography variant="h6" gutterBottom>
            <strong>Name:</strong>
            {user.fullName}
          </Typography>

          <Typography color="textSecondary">
            <strong>Email:</strong> {user.email}
          </Typography>

          <Typography color="textSecondary">
            <strong>Age:</strong> {user.age}
          </Typography>
          <Typography color="textSecondary">
            <strong>Phone:</strong> {user.phone}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default Detail;

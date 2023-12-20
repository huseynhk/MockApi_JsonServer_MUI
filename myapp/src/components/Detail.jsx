import React from "react";
import { GetSingleUser } from "../api/apiRequest";
import { useParams } from "react-router-dom";
import { Card, CardContent, Typography } from "@mui/material";
import { QUERIES } from "../constant/Queries";
import { useQuery } from "react-query";


const Detail = () => {
  const { userId } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: QUERIES.SingleUser,
    queryFn: () => GetSingleUser(userId),
    config: {
      refetchOnReconnect: true,
      refetchInterval: false,
    },
  });

  return (
    <>
      <Card style={{ maxWidth: 400, margin: "auto", marginTop: "5rem" }}>
        <CardContent>
          {isLoading && <Typography variant="h4">Loading...</Typography>}
          {isError && <Typography variant="h4">Error fetching user</Typography>}
          {data && (
            <>
              <Typography variant="h4" gutterBottom>
                Datas of {data.fullName}
              </Typography>

              <Typography variant="h6" gutterBottom>
                <strong>Name:</strong>
                {data.fullName}
              </Typography>

              <Typography color="textSecondary">
                <strong>Email:</strong> {data.email}
              </Typography>

              <Typography color="textSecondary">
                <strong>Age:</strong> {data.age}
              </Typography>
              <Typography color="textSecondary">
                <strong>Phone:</strong> {data.phone}
              </Typography>
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default Detail;

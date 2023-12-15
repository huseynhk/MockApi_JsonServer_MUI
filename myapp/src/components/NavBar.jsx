import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ROUTER } from "../constant/Router";
import { activeLink } from "../utils/ActiveLink";
import { AppBar, Toolbar, Typography } from "@mui/material";

const NavBar = () => {
  const { pathname } = useLocation();
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            Mock Api Crud
          </Typography>

          <Link
            to={ROUTER.Home}
            className={
              activeLink(ROUTER.Home, pathname) ? "activeLink" : "Link"
            }
          >
            Table
          </Link>
          <Link
            to={ROUTER.AddUser}
            className={
              activeLink(ROUTER.AddUser, pathname) ? "activeLink" : "Link"
            }
          >
            Add User
          </Link>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;

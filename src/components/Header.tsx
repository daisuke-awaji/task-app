import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import LogoutButton from "./auth/LogoutButton";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
      color: theme.palette.primary.main,
    },
  })
);
export const Header = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{ background: "transparent", boxShadow: "none" }}
      >
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Tasks App
          </Typography>
          <LogoutButton color="primary" />
        </Toolbar>
      </AppBar>
    </div>
  );
};

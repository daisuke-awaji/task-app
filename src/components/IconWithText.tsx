import React from "react";
import { Typography, Avatar, makeStyles } from "@material-ui/core";
import { VpnKey } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(2),
    width: theme.spacing(7),
    height: theme.spacing(7),
    backgroundColor: theme.palette.primary.main,
  },
}));

export const SignInIconWithText = ({ text }: { text: string }) => {
  const classes = useStyles();
  return (
    <>
      <Avatar className={classes.avatar}>
        <VpnKey />
      </Avatar>
      <Typography component="h1" variant="h5">
        {text}
      </Typography>
    </>
  );
};

import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import { IconButton, Avatar } from "@material-ui/core";
import { useAuth } from "../../cognito/CognitoAuthProvider";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    img: {
      width: theme.spacing(5),
      height: theme.spacing(5),
    },
  })
);

export const UserProfileButton = (props: any) => {
  const classes = useStyles();
  const { user, isAuthenticated } = useAuth();

  const history = useHistory();

  if (!isAuthenticated) return null;
  return (
    <IconButton
      color="inherit"
      onClick={() => {
        history.push("/profile");
      }}
      {...props}
    >
      <Avatar
        alt={user + "ProfileImage"}
        src={
          "https://lh3.googleusercontent.com/ogw/ADGmqu_xwvqPaarEc_Q0405X0zJLWw8nZcdVul-0gdGl=s83-c-mo"
        }
        className={classes.img}
      />
    </IconButton>
  );
};

import React from "react";
import { useAuth } from "../../cognito/AuthContext";
import { Tooltip, IconButton } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

export default function LogoutButton(props: any) {
  const { isAuthenticated, signOut } = useAuth();

  if (!isAuthenticated) return null;

  return (
    <Tooltip title="Logout">
      <IconButton onClick={() => signOut()} {...props}>
        <ExitToAppIcon />
      </IconButton>
    </Tooltip>
  );
}

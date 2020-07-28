import React from "react";
import Button from "@material-ui/core/Button";
import { Loading } from "../Loading";
import { useAuth } from "../../CognitoAuthProvider";

export default function LogoutButton() {
  const { isLoading, logout } = useAuth();

  if (isLoading) return <Loading />;
  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => logout()}>
        LOGOUT
      </Button>
    </div>
  );
}

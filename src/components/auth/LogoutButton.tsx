import React from "react";
import Button from "@material-ui/core/Button";
import { Loading } from "../Loading";
import { useAuth } from "../../cognito/CognitoAuthProvider";

export default function LogoutButton() {
  const { isAuthenticated, isLoading, signOut } = useAuth();

  if (isLoading) return <Loading />;

  if (!isAuthenticated) return null;

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => signOut()}>
        LOGOUT
      </Button>
    </div>
  );
}

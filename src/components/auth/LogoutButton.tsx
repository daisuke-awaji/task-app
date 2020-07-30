import React from "react";
import Button from "@material-ui/core/Button";
import { Loading } from "../Loading";
import { useAuth } from "../../cognito/CognitoAuthProvider";

export default function LogoutButton(props: any) {
  const { isAuthenticated, isLoading, signOut } = useAuth();

  if (isLoading) return <Loading />;

  if (!isAuthenticated) return null;

  return (
    <div>
      <Button onClick={() => signOut()} {...props}>
        LOGOUT
      </Button>
    </div>
  );
}

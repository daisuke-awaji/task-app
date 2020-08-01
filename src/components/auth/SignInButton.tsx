import React from "react";
import Button from "@material-ui/core/Button";
import { useAuth } from "../../cognito/CognitoAuthProvider";
import { useHistory } from "react-router-dom";

export default function SignInButton(props: any) {
  const { isAuthenticated } = useAuth();
  const history = useHistory();

  if (isAuthenticated) return null;

  const handleClick = () => {
    history.push("/login");
  };

  return (
    <div>
      <Button onClick={handleClick} {...props}>
        SIGN IN
      </Button>
    </div>
  );
}

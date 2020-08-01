import React from "react";
import Button from "@material-ui/core/Button";
import { useAuth } from "../../cognito/CognitoAuthProvider";
import { useHistory } from "react-router-dom";

export default function SignUpButton(props: any) {
  const { isAuthenticated } = useAuth();
  const history = useHistory();

  if (isAuthenticated) return null;

  const handleClick = () => {
    history.push("/signup");
  };
  return (
    <div>
      <Button variant="outlined" onClick={handleClick} {...props}>
        SIGN UP
      </Button>
    </div>
  );
}

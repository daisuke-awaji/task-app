import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../cognito/CognitoAuthProvider";
import { Loading } from "./Loading";

const ProtectedRoute = ({ component: Component, ...rest }: any) => {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoading) return <Loading />;
        if (isAuthenticated) return <Component {...props} />;
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }}
    />
  );
};

export default ProtectedRoute;

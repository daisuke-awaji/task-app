import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

const Loading = () => <div>Loading...</div>;

const ProtectedRoute = ({ component: Component, ...rest }: any) => {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  return (
    <Route
      render={(props) => {
        if (isLoading) return <Loading />;
        if (isAuthenticated) return <Component {...props} />;
        return <Redirect to={rest.redirectTo ? rest.redirectTo : "/login"} />;
      }}
      {...rest}
    />
  );
};

export default ProtectedRoute;

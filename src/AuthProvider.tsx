import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";

export const AuthContext = React.createContext({
  isAuthenticated: false,
  isLoading: false,
});

export default function AuthProvider({ children }: any) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    Auth.currentSession()
      .then((data: any) => {
        if (data.getAccessToken()) setIsAuthenticated(true);
      })
      .catch((err) => console.log("current session error", err))
      .then(() => setIsLoading(false));
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

import React, { useState, useEffect, useContext } from "react";
import { Auth } from "aws-amplify";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
Amplify.configure(awsconfig);

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: any;
  logout: any;
  error: any;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
  login: null,
  logout: null,
  error: null,
};

export const AuthContext = React.createContext(initialState);

export default function CognitoAuthProvider({ children }: any) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const login = (username: string, password: string) => {
    Auth.signIn(username, password)
      .then(() => setIsAuthenticated(true))
      .catch((error: any) => {
        console.log("error signing in", error);
        setError(error);
      });
  };

  const logout = () => {
    Auth.signOut()
      .then(() => setIsAuthenticated(false))
      .catch((err) => console.log("error signing out: ", err));
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, login, logout, error }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

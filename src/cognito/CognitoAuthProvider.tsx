import React, { useState, useEffect, useContext } from "react";
import { SignUpParams } from "@aws-amplify/auth/lib-esm/types";
import { CognitoUser } from "amazon-cognito-identity-js";

import { Auth } from "aws-amplify";
import Amplify from "aws-amplify";
import awsconfig from "../aws-exports";
Amplify.configure(awsconfig);

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user?: CognitoUser;
  error?: any;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
};

type LoginOption = {
  username: string;
  password: string;
};

interface IAuthContext extends AuthState {
  signIn: (signInOption: LoginOption) => void;
  signUp: (params: SignUpParams) => Promise<CognitoUser | undefined>;
  confirmSignUp: (params: any) => Promise<"SUCCESS" | "FAILED">;
  signOut: () => void;
}

const stub = (): never => {
  throw new Error(
    "You forgot to wrap your component in <CognitoAuthProvider>."
  );
};
const initialContext = {
  ...initialState,
  signIn: stub,
  signUp: stub,
  confirmSignUp: stub,
  signOut: stub,
};

export const AuthContext = React.createContext<IAuthContext>(initialContext);

export default function CognitoAuthProvider({ children }: any) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState<CognitoUser>();

  useEffect(() => {
    checkAuthenticated();
    currentAuthenticatedUser();
  }, []);

  const checkAuthenticated = () => {
    setIsLoading(true);
    Auth.currentSession()
      .then((data) => {
        if (data) setIsAuthenticated(true);
      })
      .catch((err) => console.log("current session error", err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const currentAuthenticatedUser = async (): Promise<void> => {
    const user: CognitoUser = await Auth.currentAuthenticatedUser();

    setUser(user);
  };

  const signIn = ({ username, password }: LoginOption) => {
    setIsLoading(true);
    Auth.signIn(username, password)
      .then(() => {
        setIsAuthenticated(true);
      })
      .catch((error: any) => {
        console.log("error signing in", error);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const signUp = async (
    param: SignUpParams
  ): Promise<CognitoUser | undefined> => {
    setIsLoading(true);
    try {
      const result = await Auth.signUp(param);
      setUser(result.user);
      setIsLoading(false);
      return result.user;
    } catch (error) {
      console.log("error signing up", error);
      setError(error);
      setIsLoading(false);
      return;
    }
  };

  const confirmSignUp = async ({
    username,
    code,
  }: any): Promise<"SUCCESS" | "FAILED"> => {
    setIsLoading(true);
    try {
      await Auth.confirmSignUp(username, code);
      setIsLoading(false);
      setIsAuthenticated(true);
      return "SUCCESS";
    } catch (error) {
      console.log("error confirming sign up", error);
      setError(error);
      setIsLoading(false);
      return "FAILED";
    }
  };

  const signOut = () => {
    setIsLoading(true);
    Auth.signOut()
      .then(() => {
        setIsAuthenticated(false);
      })
      .catch((err) => console.log("error signing out: ", err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        signIn,
        signUp,
        confirmSignUp,
        signOut,
        user,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

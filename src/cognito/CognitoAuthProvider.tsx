import React from "react";

import { useState, useEffect } from "react";
import { SignUpParams } from "@aws-amplify/auth/lib-esm/types";
import { CognitoUser } from "amazon-cognito-identity-js";

import { Auth } from "aws-amplify";
import Amplify from "aws-amplify";
import { AuthContext } from "./AuthContext";

export type LoginOption = {
  username: string;
  password: string;
};
interface ICognitoAuthProviderParams {
  amplifyConfig: {
    aws_project_region: string;
    aws_cognito_identity_pool_id: string;
    aws_cognito_region: string;
    aws_user_pools_id: string;
    aws_user_pools_web_client_id: string;
    oauth: {
      domain: string;
      scope: string[];
      redirectSignIn: string;
      redirectSignOut: string;
      responseType: string;
    };
    federationTarget: string;
  };
  children: any;
}

export default function CognitoAuthProvider(props: ICognitoAuthProviderParams) {
  Amplify.configure(props.amplifyConfig);
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

  const signIn = async ({ username, password }: LoginOption): Promise<void> => {
    setIsLoading(true);
    try {
      await Auth.signIn(username, password);
      currentAuthenticatedUser();
      setIsAuthenticated(true);
    } catch (error) {
      console.log("error signing in", error);
      setError(error);
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  };

  const signUp = async (
    param: SignUpParams
  ): Promise<CognitoUser | undefined> => {
    setIsLoading(true);
    let result;
    try {
      result = await Auth.signUp(param);
      setUser(result.user);
    } catch (error) {
      console.log("error signing up", error);
      setError(error);
    }
    setIsLoading(false);
    return result?.user;
  };

  const confirmSignUp = async ({ username, code }: any): Promise<void> => {
    setIsLoading(true);
    try {
      await Auth.confirmSignUp(username, code);
      setIsAuthenticated(true);
    } catch (error) {
      console.log("error confirming sign up", error);
      setError(error);
    }
    setIsLoading(false);
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
      {props.children}
    </AuthContext.Provider>
  );
}

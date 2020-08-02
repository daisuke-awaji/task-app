import React, { useContext } from "react";
import { SignUpParams } from "@aws-amplify/auth/lib-esm/types";
import { CognitoUser } from "amazon-cognito-identity-js";
import { AuthState, initialContext } from "./AuthState";
import { LoginOption } from "./CognitoAuthProvider";
interface IAuthContext extends AuthState {
  signIn: (signInOption: LoginOption) => Promise<void>;
  signUp: (params: SignUpParams) => Promise<CognitoUser | undefined>;
  confirmSignUp: (params: any) => Promise<void>;
  signOut: () => void;
}
export const AuthContext = React.createContext<IAuthContext>(initialContext);
export const useAuth = () => useContext(AuthContext);

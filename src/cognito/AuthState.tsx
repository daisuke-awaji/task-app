import { CognitoUser } from "amazon-cognito-identity-js";
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
const stub = (): never => {
  throw new Error(
    "You forgot to wrap your component in <CognitoAuthProvider>."
  );
};
export const initialContext = {
  ...initialState,
  signIn: stub,
  signUp: stub,
  confirmSignUp: stub,
  signOut: stub,
};

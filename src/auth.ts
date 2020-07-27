import { Auth } from "aws-amplify";

type User = {
  [key: string]: string;
};

export const signIn = async (
  username: string,
  password: string
): Promise<User | void> => {
  const user = await Auth.signIn(username, password).catch((error: any) => {
    console.log("error signing in", error);
  });
  return user;
};

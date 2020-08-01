import React from "react";
import { useAuth } from "../cognito/CognitoAuthProvider";
import { Loading } from "../components/Loading";

const ProfilePage = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <Loading />;

  return (
    <>
      <h1>Profile</h1>
      <div>こんにちは {user}　さん</div>
    </>
  );
};

export default ProfilePage;

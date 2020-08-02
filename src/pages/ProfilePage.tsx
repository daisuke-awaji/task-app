import React from "react";
import { useAuth } from "../cognito/AuthContext";
import { Loading } from "../components/Loading";

const ProfilePage = () => {
  const { user, isLoading } = useAuth();
  const [email, setEmail] = React.useState("");
  React.useEffect(() => {
    user?.getUserAttributes((e, attributes) => {
      if (attributes) {
        for (const attribute of attributes) {
          console.log(attribute);
          if (attribute.getName() === "email") {
            setEmail(attribute.getValue());
          }
        }
      }
    });
  }, [setEmail, user]);

  if (isLoading) return <Loading />;

  return (
    <>
      <h1>Profile</h1>
      <div>こんにちは {user?.getUsername()}　さん</div>
      <div>email: {email} </div>
    </>
  );
};

export default ProfilePage;

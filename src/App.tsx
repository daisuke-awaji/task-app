import React from "react";
import { SignInPage } from "./pages/SignInPage";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import CognitoAuthProvider, { useAuth } from "./cognito/CognitoAuthProvider";
import LogoutButton from "./components/auth/LogoutButton";
import { ConfirmSignUpPage } from "./pages/ConfirmSignUp";
import { SignUpPage } from "./pages/SignUpPage";

const Home = () => <div>Home</div>;
const ProfilePage = () => {
  const { user } = useAuth();

  return <div>{user?.getUsername()}</div>;
};

function App() {
  return (
    <CognitoAuthProvider>
      <Router>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Sign up</Link>
          </li>
          <li>
            <Link to="/confirm">confirm</Link>
          </li>
          <LogoutButton />
        </ul>
        <Switch>
          <Route path="/" exact component={Home} />
          <ProtectedRoute path="/profile" component={ProfilePage} />
          <Route path="/login" exact component={SignInPage} />
          <Route path="/signup" exact component={SignUpPage} />
          <Route path="/confirm" exact component={ConfirmSignUpPage} />
        </Switch>
      </Router>
    </CognitoAuthProvider>
  );
}

export default App;

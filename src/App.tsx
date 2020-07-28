import React from "react";
import { LoginPage } from "./components/LoginPage";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import CognitoAuthProvider from "./CognitoAuthProvider";
import LogoutButton from "./components/auth/LogoutButton";
const Home = () => <div>Home</div>;
const Profile = () => <div>Profile</div>;

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
          <LogoutButton />
        </ul>
        <Switch>
          <Route path="/" exact component={Home} />
          <ProtectedRoute path="/profile" component={Profile} />
          <Route path="/login" exact component={LoginPage} />
        </Switch>
      </Router>
    </CognitoAuthProvider>
  );
}

export default App;

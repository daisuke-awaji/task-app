import React from "react";
import { LoginPage } from "./components/LoginPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import AuthProvider from "./AuthProvider";
Amplify.configure(awsconfig);

const Home = () => <div>Home</div>;
const Profile = () => <div>Profile</div>;

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <ProtectedRoute path="/profile" component={Profile} />
          <Route path="/login" exact component={LoginPage} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;

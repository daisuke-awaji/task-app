import React from "react";
import { SignInPage } from "./pages/SignInPage";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import ProtectedRoute from "./components/route/ProtectedRoute";
import CognitoAuthProvider from "./cognito/CognitoAuthProvider";
import { ConfirmSignUpPage } from "./pages/ConfirmSignUp";
import { SignUpPage } from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import { DashboardLayout, NormalLayout } from "./components/layout/Layouts";
import { AppRoute } from "./components/route/AppRoute";
import { Home } from "./pages/Home";
import { SettingsPage } from "./pages/SettingsPage";

function App() {
  return (
    <CognitoAuthProvider>
      <Router>
        <Switch>
          <ProtectedRoute
            layout={DashboardLayout}
            path="/"
            exact
            component={Home}
          />
          <ProtectedRoute
            path="/profile"
            layout={DashboardLayout}
            component={ProfilePage}
          />
          <ProtectedRoute
            path="/settings"
            layout={DashboardLayout}
            component={SettingsPage}
          />
          <AppRoute
            layout={NormalLayout}
            path="/login"
            exact
            component={SignInPage}
          />
          <AppRoute
            layout={NormalLayout}
            path="/signup"
            exact
            component={SignUpPage}
          />
          <AppRoute
            layout={NormalLayout}
            path="/confirm"
            exact
            component={ConfirmSignUpPage}
          />
        </Switch>
      </Router>
    </CognitoAuthProvider>
  );
}

export default App;

import "./App.css";
import RegisterLogin from "./pages/RegisterLogin";
import Dashboard from "./pages/Dashboard";
import { GrowrSubscribed, Subscribe } from "./components";
import { CurrentUserContext } from "./utils/contexts/Contexts";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import PrivateRoute from "./utils/authentication/PrivateRoute";
import axios from "axios";
import Toaster from "./utils/toaster/Toaster";
import { SocketProvider } from "./utils/contexts/SocketProvider";
import ForgotPasswordUpdate from "./components/registerAndLogin/ForgotPasswordUpdate";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [showToast, setShowToast] = useState({
    invalidLogin: false,
    invalidUpdatePassword: false,
    postBlogPost: false,
    updateBlogPost: false,
    successfulProfileUpdate: false,
    successfulNewPost: false,
    successfulUpdatePost: false,
    successfulDeletePost: false,
    successfulUpdatePassword: false,
    forgotPasswordSent: false,
    forgotPasswordAlreadySent: false,
    invalidNewPost: false,
    successfulReviewSubmitted: false,
  });

  const toastOn = (tag) => {
    setShowToast({ ...showToast, [tag]: true });
  };

  return (
    <div className="App">
      <SocketProvider>
        <CurrentUserContext.Provider
          value={{
            currentUser,
            setCurrentUser,
            showToast,
            setShowToast,
            toastOn,
          }}
        >
          <div className="toaster">
            <Toaster showToast={showToast} setShowToast={setShowToast} />
          </div>

          <Route exact path="/" component={RegisterLogin} />
          <Route path="/forgot-password" component={ForgotPasswordUpdate} />
          {/* <PrivateRoute path="/dashboard" component={Dashboard} /> */}
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/subscribed" component={GrowrSubscribed} />
        </CurrentUserContext.Provider>
      </SocketProvider>
    </div>
  );
}

export default App;

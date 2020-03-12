import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// styles for this kit

import "./assets/css/bootstrap.min.css";
import "./assets/css/demo.css";
import "./assets/scss/now-ui-kit.scss";
import "./assets/scss/now-ui-dashboard.scss?v1.2.0";
import "./assets/demo/demo.css";
import "./assets/demo/nucleo-icons-page-styles.css";
import * as serviceWorker from "./registerServiceWorker";

// pages for this kit
import Index from "./views/Index.js";
import LoginIndex from "./views/LoginIndex.js";
import NucleoIcons from "./views/NucleoIcons.js";
import LoginPage from "./views/examples/Login.js";
import SignupPage from "./views/examples/Signup.js";
import LandingPage from "./views/examples/LandingPage.js";
import ProfilePage from "./views/examples/ProfilePage.js";
import DoctorLayout from "./layouts/Doctor.jsx";
import PatientLayout from "./layouts/Patient.jsx";
import RecordLayout from "./layouts/Record.jsx";
import history from './history.js';
// import DoctorProfile from "views/examples/DoctorProfile.js";

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Switch>
        <Route path="/index" render={props => <Index {...props} />} />
        <Route path="/home/:id" render={props => <LoginIndex {...props} />} />
        <Route
          path="/nucleo-icons"
          render={props => <NucleoIcons {...props} />}
        />
        <Route
          path="/landing-page"
          render={props => <LandingPage {...props} />}
        />
        <Route
          path="/profile-page"
          render={props => <ProfilePage {...props} />}
        />
        <Route path="/login" render={props => <LoginPage {...props} />} />
        <Route path="/register" render={props => <SignupPage {...props} />} />
        {/* <Route path="/doctor" render={props => <DoctorProfile {...props} />} /> */}
        <Route path="/doctor" render={props => <DoctorLayout {...props} />} />
        <Route path="/patient" render={props => <PatientLayout {...props} />} />
        <Route path="/record" render={props => <RecordLayout {...props} />} />
        <Redirect to="/index" />
        <Redirect from="/" to="/index" />
      </Switch>*
    </Switch>
  </Router>,
  document.getElementById("root")
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
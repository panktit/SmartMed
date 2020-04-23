import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from 'history';

// styles for this kit

import "./assets/css/bootstrap.min.css";
import "./assets/css/demo.css";
import "./assets/scss/now-ui-kit.scss";
import "./assets/scss/now-ui-dashboard.scss?v1.2.0";
import "./assets/demo/demo.css";
import "./assets/demo/nucleo-icons-page-styles.css";
import * as serviceWorker from "./registerServiceWorker";

// pages for this kit
import Index from "./components/Index.js";
import LoginIndex from "./components/LoginIndex.js";
import LoginPage from "./components/Login.js";
import SignupPage from "./components/Signup.js";
import NotFound from "./components/NotFound.js";
import PatientUpload from "./components/Dashboard/Patient/PatientUpload.jsx";
import PatientRecordList from "./components/Dashboard/Patient/RecordList.jsx";
import PatientUserPage from "./components/Dashboard/Patient/PatientUserpage.jsx"
import PatientPermission from "./components/Dashboard/Patient/PatientPermission.jsx"
import DoctorUserPage from "./components/Dashboard/Doctor/DoctorUserpage.jsx"
import PatientList from "./components/Dashboard/Doctor/PatientList.jsx";
import DoctorRecordList from "./components/Dashboard/Doctor/RecordList.jsx";
import DoctorUpload from "./components/Dashboard/Doctor/DoctorUpload.jsx";

ReactDOM.render(
  <Router history={createBrowserHistory()}>
    <Switch>
      <Switch>
        <Route exact path="/" render={props => <Index {...props} />} />
        <Route path="/home/:id" render={props => <LoginIndex {...props} />} />
        <Route path="/login" render={props => <LoginPage {...props} />} />
        <Route path="/register" render={props => <SignupPage {...props} />} />
        <Route path="/patient/profile/:id" render={props => <PatientUserPage {...props} />} />
        <Route path="/patient/view/:id" render={props => <PatientRecordList {...props} />} />
        <Route path="/patient/upload/:id" render={props => <PatientUpload {...props} />} />
        <Route path="/patient/grant/:id" render={props => <PatientPermission {...props} />} />
        <Route path="/doctor/profile/:id" render={props => <DoctorUserPage {...props} />} />
        <Route path="/doctor/view/:id" render={props => <PatientList {...props} />} />
        <Route path="/record/view/:id" render={props => <DoctorRecordList {...props} />} />
        <Route path="/record/upload/:id" render={props => <DoctorUpload {...props} />} />
        <Route path="*" component={NotFound} />
      </Switch>*
    </Switch>
  </Router>,
  document.getElementById("root")
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
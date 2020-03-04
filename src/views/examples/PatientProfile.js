// NOT USED

import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import "assets/scss/now-ui-dashboard.scss?v1.2.0";
import "assets/css/demo.css";

import PatientLayout from "layouts/Patient.jsx";

function PatientProfile() {
    const hist = createBrowserHistory();
    return (
        <>
            <Router history={hist}>
                <Switch>
                <Route path="/patient" render={props => <PatientLayout {...props} />} />
                {/* <Redirect to="/index" />
                <Redirect from="/patient" to="/index" /> */}
                </Switch>
            </Router>
        </>

    );
}

export default PatientProfile;
// FRONT END LOGIN
import React from "react";
import "./signuplogin.scss";
import { Login } from "./login/index";
import TransparentFooter from "../../components/Footers/TransparentFooter.js";
import ExamplesNavbar from "../../components/Navbars/ExamplesNavbar";



class LoginPage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
      <ExamplesNavbar />
      <div className="App">
        <div className="login">
          <div className="container">
            <Login />
          </div>
        </div>
      </div>
      <TransparentFooter />
      </>
    );
  }
}

export default LoginPage;
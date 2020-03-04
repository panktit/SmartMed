// FRONT END SIGN UP
import React from "react";
import "./signuplogin.scss";
import { Register } from "./login/index";
import TransparentFooter from "../../components/Footers/TransparentFooter.js";
import ExamplesNavbar from "../../components/Navbars/ExamplesNavbar";

class SignupPage extends React.Component {
  render() {
    return (
      <>
      <ExamplesNavbar />
      <div className="App">
        <div className="register">
          <div className="container">
            <Register />
          </div>
        </div>
      </div>
      <TransparentFooter />
      </>
    );
  }
}

export default SignupPage;
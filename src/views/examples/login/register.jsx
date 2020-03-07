import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Button } from "reactstrap";
import loginImg from "../../../assets/img/login.png";
import history from "../../../history.js";
import axios from 'axios';

const initialState = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  cnfpassword: "",
  userType: "",

  // doctor specific
  qualification:"",
  specialization:"",
  license: "",

  // patient specific
  age: "",
  blood_group: "",

  // for errors
  fnameError: "",
  lnameError: "",
  emailError: "",
  passwordLengthError: "",
  passwordMatchError: "",
  userTypeError: "",

};

export class Register extends React.Component {
  state = initialState;
  handleChange = event => {
    const isCheckbox = event.target.type === "checkbox";
    this.setState({
      [event.target.name]: isCheckbox
        ? event.target.checked
        : event.target.value
    });
  };

  validate = () => {
    let emailError = "";
    let fnameError = "";
    let lnameError = "";
    let passwordLengthError = "";
    let passwordMatchError = "";
    let userTypeError= "";
    if (!this.state.first_name) {
        fnameError = "First Name cannot be blank";
    }

    if (!this.state.last_name) {
      lnameError = "Last Name cannot be blank";
    }

    if (!this.state.email.includes("@") && !this.state.email.includes(".")) {
      emailError = "Invalid Email";
    }

    if(this.state.password.length < 8) {
        passwordLengthError = "Password should contain atleast 8 characters"
    }

    if(!(this.state.password === this.state.cnfpassword)) {
        passwordMatchError = "Passwords do not match"
    }

    if(!this.state.userType) {
      userTypeError = "Please select a user type"
    }

    if (fnameError || lnameError || emailError || passwordLengthError || passwordMatchError || userTypeError) {
      this.setState({ fnameError, lnameError, emailError, passwordLengthError, passwordMatchError, userTypeError });
      return false;
    }

    return true;
  };

 
  handleSubmit = event => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      this.setState(initialState);
      // save the entry in database
      if(this.state.userType === "doctor") {
        axios.post('http://localhost:4000/api/user/signup', { first_name: this.state.first_name, 
          last_name: this.state.last_name, 
          email: this.state.email, 
          password: this.state.password,
          userType: this.state.userType,
          qualification: this.state.qualification, 
          specialization: this.state.specialization, 
          license: this.state.license })
        .then((result) => {
          history.push("/")
        });
      } else if(this.state.userType === "patient") {
        axios.post('http://localhost:4000/api/user/signup', { first_name: this.state.first_name, 
          last_name: this.state.last_name, 
          email: this.state.email, 
          password: this.state.password,
          userType: this.state.userType,
          age: this.state.age, 
          blood_group: this.state.blood_group })
        .then((result) => {
          history.push("/")
        });
      }
    }
  };

  render() {
    return (
    <form onSubmit={this.handleSubmit} >
      <div className="base-container">
        <div className="header">Welcome to SmartMed!</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form">
            <div className="form-group">
                <input type="text" name="first_name" placeholder="First Name" value={this.state.first_name} onChange={this.handleChange} />
                <div style={{ fontSize: 12, color: "red" }}>{this.state.fnameError}</div>
            </div>
            <div className="form-group">
                <input type="text" name="last_name" placeholder="Last Name" value={this.state.last_name} onChange={this.handleChange} />
                <div style={{ fontSize: 12, color: "red" }}>{this.state.lnameError}</div>
            </div>
            <div className="form-group">
                <input type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} />
                <div style={{ fontSize: 12, color: "red" }}>{this.state.emailError}</div>
            </div>
            <div className="form-group">
                <input type="password" name="password" placeholder="Password (atleast 8 characters)" value={this.state.password} onChange={this.handleChange} />
                <div style={{ fontSize: 12, color: "red" }}>{this.state.passwordLengthError}</div>
            </div>
            <div className="form-group">
                <input type="password" name="cnfpassword" placeholder="Confirm Password" value={this.state.cnfpassword} onChange={this.handleChange} />
                <div style={{ fontSize: 12, color: "red" }}>{this.state.passwordMatchError}</div>
            </div>
            <p>Register as:</p>

            <div onChange={this.handleChange}>
              <input type="radio" value="doctor" name="userType"/> Doctor&nbsp;&nbsp;&nbsp;
              <input type="radio" value="patient" name="userType"/> Patient
            </div>
            <div style={{ fontSize: 12, color: "red" }}>{this.state.userTypeError}</div>
            <br/>
            {/* conditional components for doctor */}
            <div className="form-group"> {this.state.userType === "doctor" ? 
              <input type="text" name="qualification" placeholder="Qualification" value={this.state.qualification} onChange={this.handleChange} /> : "" }
            </div>

            <div className="form-group"> {this.state.userType === "doctor" ? 
              <input type="text" name="specialization" placeholder="Specialization" value={this.state.specialization} onChange={this.handleChange} /> : "" }
            </div>

            <div className="form-group"> {this.state.userType === "doctor" ? 
              <input type="text" name="license" placeholder="License" value={this.state.license} onChange={this.handleChange} /> : "" }
            </div>

            {/* conditional components for patient */}
            <div className="form-group"> {this.state.userType === "patient" ? 
              <input type="text" name="age" placeholder="Age" value={this.state.age} onChange={this.handleChange} /> : "" }
            </div>

            <div className="form-group"> {this.state.userType === "patient" ? 
              <input type="text" name="blood_group" placeholder="Blood Group" value={this.state.blood_group} onChange={this.handleChange} /> : "" }
            </div>

          </div>
        </div>
        <div className="footer">
        <Button
          className="submit-btn"
          color="info"
        >
          Register
        </Button><br/><br/>
        <p>Already have an account? <Link to="/login">Log in</Link></p>
        </div>
      </div>  
    </form>
    );
  }
}

export default withRouter(Register);
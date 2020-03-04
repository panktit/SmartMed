import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import loginImg from "../../../assets/img/login.png";
import history from "../../../history.js";
import axios from 'axios';
import bcrypt from 'bcryptjs';

const initialState = {
  email: "",
  password: "",
  userType: "",
};

export class Login extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   user: {}
    // };
  }
  state = initialState;
  handleChange = event => {
    const isCheckbox = event.target.type === "checkbox";
    this.setState({
      [event.target.name]: isCheckbox
        ? event.target.checked
        : event.target.value
    });
  }; 

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state);
      // get the entry in database
      // axios.post('/api/user', { first_name, 
      //                           last_name, 
      //                           email, 
      //                           password,
      //                           userType,
      //                           qualification, 
      //                           specialization, 
      //                           license })
      // .then((result) => {
      //   console.log(result);
      //   history.push("/index")
      // });
      if(this.state.userType === "doctor") {
        const { first_name, last_name, email, password, userType, qualification, specialization, license} = this.state;        
      } else if(this.state.userType == "patient") {
      }
    }
    render() {
    return (
      <form onSubmit={this.handleSubmit} >
      <div className="base-container">
        <div className="header">Welcome Back!</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form">
            <div className="form-group">
                <input type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} />
            </div>
            <div className="form-group">
                <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
            </div>
          </div>
        </div>
        <div className="footer">
        <Button
          className="submit-btn"
          color="info"
        >
          Login
        </Button><br/><br/>
        <p>New to SmartMed? <Link to="/register">Register</Link></p>
        </div>
      </div>
      </form>
    );
  }
}
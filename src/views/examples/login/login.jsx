import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Button } from "reactstrap";
import loginImg from "../../../assets/img/login.png";
import history from "../../../history.js";
import axios from 'axios';

const initialState = {
  email: "",
  password: "",
  userType: "",
  error: "",
};

export class Login extends React.Component { 

  constructor(props) {
    super(props);
    console.log("Props in login: ", this.props);
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
    axios.post('http://localhost:4000/api/user/login', {email: this.state.email, password: this.state.password})
    .then(res => {
      if('message' in res.data) {
        this.setState({error: res.data.message});
      } else { 
        console.log("GET res in login: " , res.data._id);
        this.props.history.push({
          pathname:`/${res.data.userType}/profile/${res.data._id}`,
          state: res.data
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
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
                  <div style={{ fontSize: 12, color: "red", alignSelf:"center" }}>{this.state.error}</div>
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

export default withRouter(Login);
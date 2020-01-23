import React from "react";
import axios from "axios";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      username: "",
      email: "",
      password: "",
      password2: "",
      register: false
    };
  }

  inputChange = event => {
    event.preventDefault();

    this.setState({
      [event.target.name]: event.target.value
    });
  };

  submit = event => {
    event.preventDefault();

console.log('sub')
    if (this.state.register) 
        this.submitRegistration();
    else 
        this.sumbitLogin();
  };

  register = event => {
    event.preventDefault();
  };

  login = event => {
    event.preventDefault();

    console.log(this.state.username + "   " + this.state.password);
    if (this.state.register === true) this.setState({ register: false });
    else {
      this.sumbitLogin();
    }
  };

  sumbitLogin = () => {
    axios
      .post("https://lambdamud-2020.herokuapp.com/api/v1/rest-auth/login/", {
        username: this.state.username,
        password: this.state.password
      })
      .then(res => {
        localStorage.setItem("token", res.key);
        localStorage.setItem("gametag", this.state.name);
      })
      .catch(err => {
        console.log(err);
      });
  };

  submitRegistration = () => {};

  register = event => {
    event.preventDefault();

    if (this.state.register === false) this.setState({ register: true });
    else {
      this.submitRegistration();
    }
  };

  render() {
    return (
      <div className="login">
        {!this.state.register ? (
          <form onSubmit={this.submit} className="login-form">
            <input
              label="Game Tag"
              className="form-input"
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.inputChange}
            />
            <input
              label="Username"
              className="form-input"
              name="username"
              type="text"
              value={this.state.username}
              onChange={this.inputChange}
            />
            <input
              label="Password"
              className="form-input"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.inputChange}
            />
          </form>
        ) : (
          <form onSubmit={this.register} className="register-form">
            <input
              label="Email"
              className="form-input"
              name="email"
              type="text"
              value={this.state.email}
              onChange={this.inputChange}
            />
            <input
              label="Username"
              className="form-input"
              name="username"
              type="text"
              value={this.state.username}
              onChange={this.inputChange}
            />
            <input
              label="Password1"
              className="form-input"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.inputChange}
            />
            <input
              label="Password2"
              className="form-input"
              name="password2"
              type="password"
              value={this.state.password2}
              onChange={this.inputChange}
            />
          </form>
        )}
        <button className="login-button" onClick={this.login}>
          {!this.state.register ? "Login" : "Cancel"}
        </button>
        <button className="register-button" onClick={this.register}>
          Register
        </button>
      </div>
    );
  }
}

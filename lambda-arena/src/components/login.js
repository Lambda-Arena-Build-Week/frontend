import React, { Component } from "react";
import axios from "axios";
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

class Login extends Component {
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
        console.log(res);
        localStorage.setItem("token", res.data.key);
        localStorage.setItem("gametag", this.state.name);
        this.props.history.push('/');
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  submitRegistration = () => {
    axios
    .post("https://lambdamud-2020.herokuapp.com/api/v1/rest-auth/registration/", {
      username: this.state.username,
      password1: this.state.password,
      password2: this.state.password2,
      email: this.state.email
    })
    .then(res => {
      console.log(res);
      localStorage.setItem("token", res.data.key);
      localStorage.setItem("gametag", this.state.name);
      this.props.history.push("/");

    })
    .catch(err => {
    	console.error("Registration failed!");
      console.log(err.response);
    });
  };

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
				<Header>Deadly Arena</Header>
				<FormWrapper>
        {!this.state.register ? (
          <form onSubmit={this.submit} className="login-form">
						<InputsWrapper>
            <input
              label="Game Tag"
              className="form-input"
              name="name"
              type="text"
							placeholder="Game Tag"
              value={this.state.name}
              onChange={this.inputChange}
            />
            <input
              label="Username"
              className="form-input"
              name="username"
              type="text"
							placeholder="Username"
              value={this.state.username}
              onChange={this.inputChange}
            />
            <input
              label="Password"
              className="form-input"
              name="password"
              type="password"
							placeholder="Password"
              value={this.state.password}
              onChange={this.inputChange}
            />
						</InputsWrapper>
          </form>
        ) : (
          <form onSubmit={this.register} className="register-form">
            <InputsWrapper>
						<input
              label="Game Tag"
              className="form-input"
              name="name"
              type="text"
							placeholder="Game Tag"
              value={this.state.name}
              onChange={this.inputChange}
            />
            <input
              label="Email"
              className="form-input"
              name="email"
              type="text"
							placeholder="Email"
              value={this.state.email}
              onChange={this.inputChange}
            />
            <input
              label="Username"
              className="form-input"
              name="username"
              type="text"
							placeholder="Username"
              value={this.state.username}
              onChange={this.inputChange}
            />
            <input
              label="Password1"
              className="form-input"
              name="password"
              type="password"
							placeholder="Password"
              value={this.state.password}
              onChange={this.inputChange}
            />
            <input
              label="Password2"
              className="form-input"
              name="password2"
              type="password"
							placeholder="Confirm password"
              value={this.state.password2}
              onChange={this.inputChange}
            />
						</InputsWrapper>
          </form>
        )}
        <ButtonWrapper>
        <button className="login-button" onClick={this.login}>
          {!this.state.register ? "Login" : "Cancel"}
        </button>
        <button className="register-button" onClick={this.register}>
          Register
        </button>
				</ButtonWrapper>

				</FormWrapper>
      </div>
    );
  }
}

export default withRouter(Login);

const Header = styled.div`
	text-align: center;
	font-size: 6rem;
	color: black;
	font-weight: bolder;
	text-shadow: orangered 1px 3px 5px;
	margin: 30px auto;
`;

const FormWrapper = styled.div`
	input {
		margin: 10px;
		height: 30px;
		width: 60%;
		max-width: 200px;
		padding: 5px;
		border: 3px solid black;
		background-color: darkgrey;
		::placeholder {
			color: #6f1313;
			font-weight: bold;
		}
	}
	padding: 25px 0;
	border: 2px solid black;
	background-color: #333333;
`;

const InputsWrapper = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
`;

const ButtonWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	button {
		background-color: maroon;
		border: 2px solid black;
		color: black;
		font-size: 2rem;
		font-weight: bold;
		margin: 15px;
		width: 40%;
		max-width: 210px;
		height: 50px;
	}
`;

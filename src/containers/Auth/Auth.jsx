import React from "react";
import Input from "../../components/UI/Input/Input";
import classes from "./Auth.module.css";
import Axios from "axios";

class Auth extends React.Component {
  state = {
    login: "",
    password: "",
    nickname: "",
    signIn: true,
  };

  submitHandler = (event) => {
    event.preventDefault();
  };

  onLoginChange = (e) => {
    this.setState({
      login: e.target.value,
    });
  };

  onPasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  onNicknameChange = (e) => {
    this.setState({
      nickname: e.target.value,
    });
  };

  changeSignIn = () => {
    this.setState({
      signIn: !this.state.signIn,
    });
  };

  loginHandler = async () => {
    let response = await Axios.post(
      "https://km0lr02nsg.execute-api.us-east-1.amazonaws.com/user/authuser",
      {
        email: this.state.login,
        password: this.state.password,
      }
    );
    if (response) {
      response = JSON.parse(response.data);
      console.log(response);
      if (response.status === "success") this.props.signIn();
      else if (response.status === "error") {
        console.log("ERROR: ", response.data);
      }
    }
  };

  registerHandler = async () => {
    let response = await Axios.post(
      "https://km0lr02nsg.execute-api.us-east-1.amazonaws.com/user/adduser",
      {
        email: this.state.login,
        password: this.state.password,
        nickname: this.state.nickname,
      }
    );
    if (response) {
      response = JSON.parse(response.data);
      if (response.status === "success") this.props.signIn();
      else if (response.status === "error") {
        console.log("ERROR: ", response.data);
      }
    }
  };

  render() {
    return (
      <div className={classes.Auth}>
        <div className={classes.AuthForm}>
          <div className={classes.Header}>Watfil</div>
          {this.state.signIn ? (
            <form className={classes.Inputs} onSubmit={this.submitHandler}>
              <Input
                label="Login"
                type="email"
                value={this.state.login}
                onLoginChange={this.onLoginChange}
              />
              <Input
                label="Password"
                type="password"
                value={this.state.password}
                onPasswordChange={this.onPasswordChange}
              />
              <Input type="submit" name="SignIn" sign={this.loginHandler} />
              <div className={classes.SignButton} onClick={this.changeSignIn}>
                Регистрация
              </div>
            </form>
          ) : (
            <form className={classes.Inputs} onSubmit={this.submitHandler}>
              <Input
                label="Email"
                type="email"
                value={this.state.login}
                onLoginChange={this.onLoginChange}
              />
              <Input
                label="Nickname"
                type="text"
                value={this.state.nickname}
                onNicknameChange={this.onNicknameChange}
              />
              <Input
                label="Password"
                type="password"
                value={this.state.password}
                onPasswordChange={this.onPasswordChange}
              />
              <Input type="submit" name="SignUp" sign={this.registerHandler} />
              <div className={classes.SignButton} onClick={this.changeSignIn}>
                Вход
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }
}

export default Auth;

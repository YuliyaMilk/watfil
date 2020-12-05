import React from 'react'
import './App.css';
import MainPage from "./containers/MainPage/MainPage"
import Auth from "./containers/Auth/Auth"
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Films from './containers/Films/Films';
import Serials from './containers/Serials/Serials';
import Favorite from './containers/Favorite/Favorite';
import FilmInfo from './containers/FilmInfo/FilmInfo';

// App key = 1q4qbq7le7nbs6q11dnl6bsvj0

class App extends React.Component{

  state = {
    isAuth: !!localStorage.getItem("email"),
    userData: {
      email: localStorage.getItem("email"),
      password: '',
      nickname: localStorage.getItem("nickname")
    }
  }

  signIn = (user) => {
    localStorage.setItem("email", user.email);
    localStorage.setItem("nickname", user.nickname);
    this.setState({
      isAuth: true,
      userData: user
    })
  }

  signOut = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("nickname");
    this.setState({
      isAuth: false
    })
  }

  render() {
    const WrapperAuth = (props) => {
      return (<Auth {...props} signIn = {this.signIn}/>)
    }
    let roots = (
      <Switch>
        <Route path = "/auth" component = {WrapperAuth} />
        <Redirect to="/auth" />
      </Switch>
    );
  
    if(this.state.isAuth) {
      roots = (<Switch>
        <Route path = "/films" component = {Films}/>
        <Route path = "/serials" component = {Serials}/>
        <Route path = "/favorite" component = {Favorite}/>
        <Route path = "/:id" component = {FilmInfo} />
        <Redirect to = "/films"/>
      </Switch>)
    }
    return (
      <BrowserRouter>
        <div className = "App">
          { this.state.isAuth ?
          (<MainPage signOut = {this.signOut} user = {this.state.userData}>
            {roots}
          </MainPage>)
          : <div>{roots}</div>}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

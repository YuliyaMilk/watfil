import React from 'react'
import './App.css';
import MainPage from "./containers/MainPage/MainPage"
import Auth from "./containers/Auth/Auth"
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Films from './containers/Films/Films';
import Serials from './containers/Serials/Serials';
import Favorite from './containers/Favorite/Favorite';

// App key = 1q4qbq7le7nbs6q11dnl6bsvj0

class App extends React.Component{

  state = {
    isAuth: !!localStorage.getItem("token")
  }

  signIn = () => {
    this.setState({
      isAuth: true
    })
    localStorage.setItem("token", true);
  }

  signOut = () => {
    this.setState({
      isAuth: false
    })
    localStorage.removeItem("token");
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
        <Redirect to = "/films"/>
      </Switch>)
    }

    return (
      <BrowserRouter>
        <div className = "App">
          { this.state.isAuth ?
          (<MainPage signOut = {this.signOut}>
            {roots}
          </MainPage>)
          : <div>{roots}</div>}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

import React from "react";
import classes from "./MainPage.module.css";
import Header from "./Header/Header";
import Content from "./Content/Content";

class MainPage extends React.Component {
  render() {
    return (
      <div className={classes.MainPage}>
        <Header signOut = {this.props.signOut} name = {this.props.user.nickname}/>
        {this.props.children}
      </div>
    );
  }
}

export default MainPage;

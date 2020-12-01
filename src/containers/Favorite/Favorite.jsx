import classes from "./Favorite.module.css";
import React from "react";
import { NavLink } from "react-router-dom";
import MainPage from "../MainPage/MainPage";

class Favorite extends React.Component {
  render() {
    return (
        <div className={classes.Favorite}>Favorite</div>
    );
  }
}

export default Favorite;

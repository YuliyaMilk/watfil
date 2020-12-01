import classes from "./Header.module.css";
import BrandName from "../../../components/brandname/BrandName";
import Menu from "../../../components/menu/Menu";
import ProfileHeader from "../../../components/profileHeader/ProfileHeader";
import React from "react";
import { NavLink } from "react-router-dom";

class Header extends React.Component {
  render() {
    const links = [
      <NavLink to="/serials">Сериалы</NavLink>,
      <NavLink to="/films">Фильмы</NavLink>,
      <NavLink to="/favorite">Избранное</NavLink>,
    ];
    return (
      <div className={classes.Header}>
        <BrandName />
        <Menu links={links} />
        <ProfileHeader name="Yuliya Uldanova" signOut={this.props.signOut} />
      </div>
    );
  }
}

export default Header;

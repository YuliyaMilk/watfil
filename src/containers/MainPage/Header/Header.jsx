import classes from "./Header.module.css";
import BrandName from "../../../components/brandname/BrandName";
import Menu from "../../../components/menu/Menu";
import ProfileHeader from "../../../components/profileHeader/ProfileHeader";
import React from "react";
import { NavLink, withRouter } from "react-router-dom";

class Header extends React.Component {

  state = {
    activePage: 1
  }

  changePage = (index) => {
    this.setState({
      activePage: index
    })
  }

  componentDidMount() {
    const location = this.props.location.pathname.slice(1);

    if(location === 'auth' || location === '') {
      this.setState({
        activePage: 1
      })
    }
    else {
      this.setState({
        activePage: location === 'serials' ? 0 : location === 'films' ? 1 : location === 'favorite' ? 2 : -1
      })
    }
  }

  render() {
    const links = [
      <NavLink to="/serials">Сериалы</NavLink>,
      <NavLink to="/films">Фильмы</NavLink>,
      <NavLink to="/favorite">Избранное</NavLink>,
    ];
    return (
      <div className={classes.Header}>
        <BrandName />
        <Menu links={links} changePage = {this.changePage} activePage = {this.state.activePage}/>
        <ProfileHeader name={this.props.name} signOut={this.props.signOut} />
      </div>
    );
  }
}

export default withRouter(Header);

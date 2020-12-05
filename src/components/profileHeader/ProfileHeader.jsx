import React from "react";
import classes from "./ProfileHeader.module.css";

class ProfileHeader extends React.Component {
  render() {
    return (
      <div className={classes.ProfileHeader}>
        <div className={classes.Name}>{this.props.name}</div>

        <div className={classes.SignOut} onClick={this.props.signOut}>
          Выйти
        </div>
      </div>
    );
  }
}

export default ProfileHeader;

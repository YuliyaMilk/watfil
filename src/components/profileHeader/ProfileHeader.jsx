import React from "react";
import classes from "./ProfileHeader.module.css";

class ProfileHeader extends React.Component {
  state = {
    isEdited: false,
  };

  render() {
    return (
      <div className={classes.ProfileHeader}>
        {!this.state.isEdited ? (
          <div
            className={classes.Name}
            onClick={() => {
              this.setState({ isEdited: true });
            }}
          >
            {this.props.name}
          </div>
        ) : (
          <input placeholder={this.props.name}></input>
        )}
        <div className={classes.SignOut} onClick={this.props.signOut}>
          Выйти
        </div>
      </div>
    );
  }
}

export default ProfileHeader;

import classes from "./Input.module.css";

const Input = (props) => {
  let change;
  if (props.onLoginChange) change = props.onLoginChange;
  if (props.onPasswordChange) change = props.onPasswordChange;
  if (props.onNicknameChange) change = props.onNicknameChange;

  if (
    props.type === "text" ||
    props.type === "password" ||
    props.type === "email"
  ) {
    return (
      <div className={classes.Input}>
        <input type={props.type} onChange={change} value = {props.value} required></input>
        <span className={classes.bar}></span>
        <label>{props.label}</label>
      </div>
    );
  }
  if (props.type === "submit") {
    return (
      <div>
        <input
          className={classes.btn}
          type={props.type}
          value={props.name}
          onClick={props.sign}
        ></input>
      </div>
    );
  }
};

export default Input;

import classes from "./Menu.module.css";

const Menu = (props) => {
  return (
    <div className = {classes.ToEnd}>
    <div className={classes.Menu}>
      <ul>
        {props.links.map((link, index) => {
          return <li key={index}>{link}</li>;
        })}
      </ul>
    </div>
    </div>
  );
};

export default Menu;

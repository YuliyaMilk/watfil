import { Link } from "react-router-dom";
import classes from "./Card.module.css";
import React from "react";

const Card = (props) => {
  return (
    <div className={classes.Card} style = {props.style}>
      <div className={classes.Image}>
        <img
            src={props.poster}
            style={{height: "100%"}}
            alt="poster"/>
      </div>
      <div className={classes.Information}>
        <div className={classes.Title} style = {{'fontSize': props.titleFont}}>
          {props.title}
          <div onClick = {() => {
              if(props.deleteFavorite){
                props.deleteFavorite(props.id, props.isMovie)
              }
              else {
                props.addFavorite(props.id, !props.favorite)
              }
            }
            }>
            {props.favorite ? (
              <i className="fa fa-star" aria-hidden="true" style = {{'color': '#ffda00'}}/>
            ) : (
              <i className="fa fa-star-o" aria-hidden="true"/>
            )}
          </div>
        </div>
        <div className={classes.Description} style = {{'fontSize': props.descriptionFont}}>{props.overview}</div>
        <Link to = {{
          pathname: 'filminfo/' + props.id,
          state: {
            isMovie: props.isMovie,
            id: props.id
          }
        }} 
         style={{ textDecoration: 'none', color: 'white', height: '20%', width: '100px' }}>
          <div className={classes.About}>
            Подробнее
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Card;

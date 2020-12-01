import classes from "./Card.module.css";

const Card = (props) => {
    return(
        <div className = {classes.Card}>
            <div className = {classes.Image}>
                <img src = {props.poster} style = {{'width': "210px", "height": "100%"}}></img>
            </div>
            <div className = {classes.Information}>
                <div className = {classes.Title}>
                    {props.title}
                    <i className="fa fa-star-o" aria-hidden="true"></i>
                </div>
                <div className = {classes.Description}>
                    {props.overview}
                </div>
            </div>
        </div>
    )
}

export default Card;
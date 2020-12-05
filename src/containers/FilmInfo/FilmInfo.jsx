import classes from "./FilmInfo.module.css";
import React from "react";
import Axios from "axios";

class FilmInfo extends React.Component {
  
  id = null
  isMovie = null
  film = null
  async componentDidMount() {
    this.id = this.props.location.state.id;
    this.isMovie = this.props.location.state.isMovie;
    console.log(this.film);
    if(this.isMovie) {
        this.film = await Axios.get(
            "https://api.themoviedb.org/3/movie/"+this.id+"?api_key=623a2eda649fb02dee401196f0a282c9&language=ru")
      
    }
    else {
        this.film = await Axios.get(
            "https://api.themoviedb.org/3/tv/"+this.id+"?api_key=623a2eda649fb02dee401196f0a282c9&language=ru")
    }
    console.log(this.film);
 }

  render() {
    return (
        <div className={classes.FilmInfo}>
            {/* {this.isMovie ? this.film.title: this.film.name} */}
        </div>
    );
  }
}

export default FilmInfo;

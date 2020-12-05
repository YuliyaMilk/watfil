import classes from "./FilmInfo.module.css";
import React from "react";
import Axios from "axios";

class FilmInfo extends React.Component {
  film = null;
  videoKey = null;
  state = {
    film: null,
    videoKey: null
  };

  _isMounted = false;

  async componentDidMount() {
    this._isMounted = true;
    this.id = this.props.location.state.id;
    this.isMovie = this.props.location.state.isMovie;
    if (this.isMovie) {
      this.film = await Axios.get(
        "https://api.themoviedb.org/3/movie/" +
          this.id +
          "?api_key=623a2eda649fb02dee401196f0a282c9&language=ru"
      );
      this.videoKey = 
      (await Axios.get( "https://api.themoviedb.org/3/movie/"+this.id+"/videos?api_key=623a2eda649fb02dee401196f0a282c9&language=en")).data.results[0].key
    
    } else {
      this.film = await Axios.get(
        "https://api.themoviedb.org/3/tv/" +
          this.id +
          "?api_key=623a2eda649fb02dee401196f0a282c9&language=ru"
      );
      this.videoKey = 
    (await Axios.get( "https://api.themoviedb.org/3/tv/"+this.id+"/videos?api_key=623a2eda649fb02dee401196f0a282c9&language=en")).data.results[0].key
    
    }
    this.film = this.film.data;
    this._isMounted &&
      this.setState({
        film: this.film,
        videoKey: this.videoKey
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    let rating = [];
    if (this.state.film) {
      let rate = parseInt(this.state.film.vote_average);
      for (let i = 0; i < rate; ++i) {
        rating.push(
          <i
            key={i}
            className="fa fa-star"
            aria-hidden="true"
            style={{ color: "#ffda00" }}
          ></i>
        );
      }
      for (let i = 0; i < 10 - rate; ++i) {
        rating.push(
          <i
            key={rate + i}
            className="fa fa-star-o"
            aria-hidden="true"
            style={{ color: "white" }}
          ></i>
        );
      }
    }
    return (
      <div className={classes.FilmInfo}>
        {this.state.film ? (
          <div className={classes.Page}>
            <div className={classes.Image}>
              <img
                style={{ border: "2px solid yellow" }}
                src={
                  "https://image.tmdb.org/t/p/w200" +
                  this.state.film.poster_path
                }
              ></img>
            </div>
            <div className={classes.TextInfo}>
              <div className={classes.Title}>
                {this.isMovie ? this.state.film.title : this.state.film.name}
              </div>
              <div className={classes.Rating}>
                {rating.map((rate) => {
                  return rate;
                })}
              </div>
              <div className={classes.Description}>
                {this.state.film.overview}
                <div className={classes.Release}>
                  Дата релиза: {this.isMovie ? this.state.film.release_date : this.state.film.first_air_date}
                </div>
                <div className={classes.Status}>
                  Статус: {this.state.film.status}
                </div>
                {this.state.film.tagline ? (
                  <div className={classes.Tagline}>
                    Слоган: {this.state.film.tagline}
                  </div>
                ) : null}
              </div>
              <iframe 
                style = {{border: "2px solid yellow", 'margin-top': "20px"}}
                width="560"
                height="315"
                src={"https://www.youtube.com/embed/" + this.state.videoKey}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default FilmInfo;

import classes from "./FilmInfo.module.css";
import React from "react";
import Axios from "axios";
import SliderAuto from "../../components/slider/SliderAuto";

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
    if(this.props.location.state) {
      this.id = this.props.location.state.id;
      this.isMovie = this.props.location.state.isMovie;
    }else{
      this.id = this.props.location.pathname.slice(10);
      this.isMovie = true;
    }
    if (this.isMovie) {
      this.film = await Axios.get(
        "https://api.themoviedb.org/3/movie/" +
          this.id +
          "?api_key=623a2eda649fb02dee401196f0a282c9&language=ru"
      );
      this.videoKey = 
      (await Axios.get( "https://api.themoviedb.org/3/movie/"+this.id+"/videos?api_key=623a2eda649fb02dee401196f0a282c9&language=en")).data.results
    
    } else {
      this.film = await Axios.get(
        "https://api.themoviedb.org/3/tv/" +
          this.id +
          "?api_key=623a2eda649fb02dee401196f0a282c9&language=ru"
      );
      this.videoKey = 
    (await Axios.get( "https://api.themoviedb.org/3/tv/"+this.id+"/videos?api_key=623a2eda649fb02dee401196f0a282c9&language=en")).data.results 
    
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
            style={{color: "#ffda00"}}
            />
        );
      }
      for (let i = 0; i < 10 - rate; ++i) {
        rating.push(
          <i
            key={rate + i}
            className="fa fa-star-o"
            aria-hidden="true"
            style={{color: "white"}}
            />
        );
      }
    }
    return (
      <div className={classes.FilmInfo}>
        {this.state.film ? (
          <div className={classes.BlackBackground}>
          <div className={classes.Page}>
            <div className={classes.Image}>
              <img
                  style={{border: "2px solid yellow"}}
                  src={
                    "https://image.tmdb.org/t/p/w200" +
                    this.state.film.poster_path
                  }
                  alt = "poster"
                  />
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
              {(this.state.videoKey[0]) ? (
              <iframe
                    title={this.id}
                    style = {{border: "2px solid yellow", 'marginTop': "20px"}}
                    width="560"
                    height="315"
                    src={"https://www.youtube.com/embed/" + this.state.videoKey[0].key}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    />)
                : null}
              
           </div>
            
            
          </div>
          <SliderAuto movie_id={this.id} isMovie = {this.isMovie} className={classes.SliderAuto}/>
          </div>
          
        ) : null}


      </div>
    );
  }
}

export default FilmInfo;

import React, { Component } from "react";
import Slider from "react-slick";
import Axios from "axios";
import classes from "./SliderAuto.module.css";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

class SliderAuto extends Component {

  films = [];

  state = {
    filmsAll : [],
    forceUpdate: false,
  }
  _isMounted = false;
  async componentDidMount() { 
    this._isMounted = true;
    if(this.props.isMovie){
      this.films = (await Axios.get(
          "https://api.themoviedb.org/3/movie/" +
            this.props.movie_id +
            "/similar?api_key=623a2eda649fb02dee401196f0a282c9&language=ru&page=1"
        )).data.results;
    }else{
      this.films = (await Axios.get(
        "https://api.themoviedb.org/3/tv/" +
          this.props.movie_id +
          "/similar?api_key=623a2eda649fb02dee401196f0a282c9&language=ru&page=1"
      )).data.results;
    }

      this._isMounted && this.setState ({
          filmsAll: this.films
      })

  }
 
  componentDidUpdate () {
    if (this.state.forceUpdate) window.location.reload();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 2000,
      cssEase: "linear",
      pauseOnHover: true,
    };
    return (
      <div className={classes.Slider}>

        {
        this.state.filmsAll.length > 0 ?
        this.props.isMovie ? 
          <div className={classes.Text}>Похожие фильмы</div>
          :
          <div className={classes.Text}>Похожие сериалы</div>
        : null}
        
        <Slider {...settings} className={classes.SliderAuto}>
             {this.state.filmsAll.map((film, index) => {
                   return (
                    (film.poster_path) ? (<Link to = {{
                      pathname: '/filminfo/' + film.id,
                      state: {
                        isMovie: this.props.isMovie,
                        id: film.id
                      }}}
                    onClick={ () => {this.setState({
                      forceUpdate: true
                    })}}
                    key={index} 
                     >
                        <div className={classes.Poster}  >
                        <img
                          src={"https://image.tmdb.org/t/p/w200" + film.poster_path}
                          alt = "poster"
                          />
                        </div>
                     </Link>) : null
                   );
                  
             })}
        </Slider>
      </div>
    );
  }
}

export default SliderAuto;
import classes from "./FilmInfo.module.css";
import React from "react";
import Axios from "axios";
import SliderAuto from "../../components/slider/SliderAuto";
import Slider from "react-slick";
import Loader from "../../components/loader/Loader";

class FilmInfo extends React.Component {
  film = null;
  videoKey = null;
  seasons = [];
  state = {
    film: null,
    videoKey: null,
    favorites: [],
    favorite: false,
    seasons: [],
    _loading: false,
  };

  _isMounted = false;

  addFavorite = async (favoriteId, isFav, isMovie) => {
    if (isFav) {
      let response = await Axios.post(
        "https://km0lr02nsg.execute-api.us-east-1.amazonaws.com/user/addfavorite",
        {
          email: localStorage.getItem("email"),
          movie_id: favoriteId,
          movie: isMovie,
        }
      );
      response = JSON.parse(response.data);
      if (response.status === "success") {
        this.setState({
          favorites: [...this.state.favorites, favoriteId],
          favorite: true,
        });
      }
    } else {
      let response = await Axios.post(
        "https://km0lr02nsg.execute-api.us-east-1.amazonaws.com/user/deletefavorite",
        {
          email: localStorage.getItem("email"),
          movie_id: favoriteId,
          movie: isMovie,
        }
      );
      response = JSON.parse(response.data);
      if (response.status === "success") {
        let newFav = this.state.favorites.slice();
        newFav.splice(this.state.favorites.indexOf(favoriteId), 1);
        this.setState({
          favorites: newFav,
          favorite: false,
        });
      }
    }
  };

  async componentDidMount() {
    this._isMounted = true;

    this._isMounted &&
      this.setState({
        _loading: true,
      });

    if (this.props.location.state) {
      this.id = this.props.location.state.id;
      this.isMovie = this.props.location.state.isMovie;
    }
    if (this.isMovie) {
      this.film = await Axios.get(
        "https://api.themoviedb.org/3/movie/" +
          this.id +
          "?api_key=623a2eda649fb02dee401196f0a282c9&language=ru"
      );
      this.videoKey = (
        await Axios.get(
          "https://api.themoviedb.org/3/movie/" +
            this.id +
            "/videos?api_key=623a2eda649fb02dee401196f0a282c9&language=en"
        )
      ).data.results;
    } else {
      this.film = await Axios.get(
        "https://api.themoviedb.org/3/tv/" +
          this.id +
          "?api_key=623a2eda649fb02dee401196f0a282c9&language=ru"
      );

      this._isMounted &&
        this.setState({
          seasons: this.film.data.seasons,
        });

      this.videoKey = (
        await Axios.get(
          "https://api.themoviedb.org/3/tv/" +
            this.id +
            "/videos?api_key=623a2eda649fb02dee401196f0a282c9&language=en"
        )
      ).data.results;
    }
    this.film = this.film.data;
    this._isMounted &&
      this.setState({
        film: this.film,
        videoKey: this.videoKey,
      });

    let fav = await Axios.get(
      "https://km0lr02nsg.execute-api.us-east-1.amazonaws.com/user/fetchfavorites"
    );
    fav = JSON.parse(fav.data);
    if (fav.status === "success") {
      let curFav = [];
      // eslint-disable-next-line array-callback-return
      fav.data.map((item) => {
        if (item.user_primary === localStorage.getItem("email")) {
          curFav.push(parseInt(item.movie_id));
        }
      });
      this._isMounted &&
        this.setState({
          favorites: [...this.state.favorites, ...curFav],
          favorite:
            [...this.state.favorites, ...curFav].indexOf(this.id) !== -1,
        });
    }
    console.log(this.state.favorite);
    this._isMounted &&
      this.setState({
        _loading: false,
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 3,
    };

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
          />
        );
      }
      for (let i = 0; i < 10 - rate; ++i) {
        rating.push(
          <i
            key={rate + i}
            className="fa fa-star-o"
            aria-hidden="true"
            style={{ color: "white" }}
          />
        );
      }
    }
    return (
      <div className={classes.FilmInfo}>
        {this.state._loading ? (
          <Loader />
        ) : (
          <>
            {this.state.film ? (
              <div className={classes.BlackBackground}>
                <div className={classes.Page}>
                  <div className={classes.Image}>
                    <img
                      // style={{border: "2px solid white"}}
                      src={
                        "https://image.tmdb.org/t/p/w200" +
                        this.state.film.poster_path
                      }
                      alt="poster"
                    />
                  </div>
                  <div className={classes.TextInfo}>
                    <div className={classes.Title}>
                      {this.isMovie
                        ? this.state.film.title
                        : this.state.film.name}
                      <div
                        onClick={() => {
                          this.addFavorite(
                            this.id,
                            !this.state.favorite,
                            this.isMovie
                          );
                        }}
                      >
                        {!this.state.favorite ? (
                          <div className={classes.AddFavorite}>
                            {" "}
                            В избранное{" "}
                          </div>
                        ) : (
                          <div
                            className={classes.AddFavorite}
                            style={{ color: "black", background: "#ffda00" }}
                          >
                            {" "}
                            В избранном{" "}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className={classes.Rating}>
                      {rating.map((rate) => {
                        return rate;
                      })}
                    </div>
                    <div className={classes.Description}>
                      {this.state.film.overview}
                      <div className={classes.Release}>
                        Дата релиза:{" "}
                        {this.isMovie
                          ? this.state.film.release_date
                          : this.state.film.first_air_date}
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
                    {this.state.videoKey[0] ? (
                      <iframe
                        title={this.id}
                        style={{ border: "2px solid white", marginTop: "20px" }}
                        width="672"
                        height="378"
                        src={
                          "https://www.youtube.com/embed/" +
                          this.state.videoKey[0].key
                        }
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : null}
                  </div>
                </div>
                {this.isMovie || !this.state.seasons ? (
                  <div />
                ) : (
                  <div className={classes.Text}>Сезоны</div>
                )}
                {this.isMovie || !this.state.seasons ? (
                  <div />
                ) : (
                  <Slider {...settings} className={classes.Seasons}>
                    {this.state.seasons.map((season, index) => {
                      return (
                        <div className={classes.Season} key={index}>
                          <div className={classes.TitleSeason}>
                            {season.name}
                          </div>

                          <div className={classes.Image}>
                            <img
                              style={{ border: "2px solid white" }}
                              src={
                                "https://image.tmdb.org/t/p/w200" +
                                season.poster_path
                              }
                              alt="poster_season"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </Slider>
                )}
                <SliderAuto
                  movie_id={this.id}
                  isMovie={this.isMovie}
                  className={classes.SliderAuto}
                />
              </div>
            ) : null}
          </>
        )}
      </div>
    );
  }
}

export default FilmInfo;

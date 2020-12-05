import classes from "./Films.module.css";
import React from "react";
import Card from "../../components/UI/Card/Card";
import Filter from "../../components/filter/Filter";
import Axios from "axios";
// key = 623a2eda649fb02dee401196f0a282c9
class Films extends React.Component {
  state = {
    films: [],
    genres: [],
    favorites: [],
  };

  _isMounted = false;

  addGenre = async (id) => {
    this._isMounted && await this.setState({
      genres: [...this.state.genres, id],
    });
  };

  deleteGenre = async (id) => {
    let newGenres = this.state.genres.slice();
    newGenres.splice(this.state.genres.indexOf(id), 1);
    this._isMounted && await this.setState({
      genres: newGenres,
    });
  };

  addFavorite = async (favoriteId, isFav) => {
    if (isFav) {
      let response = await Axios.post(
        "https://km0lr02nsg.execute-api.us-east-1.amazonaws.com/user/addfavorite",
        {
          email: localStorage.getItem("email"),
          movie_id: favoriteId,
          movie: true,
        }
      );
      response = JSON.parse(response.data);
      if (response.status === "success") {
        this.setState({
          favorites: [...this.state.favorites, favoriteId],
        });
      }
    } else {
      let response = await Axios.post(
        "https://km0lr02nsg.execute-api.us-east-1.amazonaws.com/user/deletefavorite",
        {
          email: localStorage.getItem("email"),
          movie_id: favoriteId,
          movie: true,
        }
      );
      response = JSON.parse(response.data);
      if (response.status === "success") {
        let newFav = this.state.favorites.slice();
        newFav.splice(this.state.favorites.indexOf(favoriteId), 1);
        this.setState({
          favorites: newFav,
        });
      }
    }
  };

  async componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      for (let i of [1, 2, 3]) {
        const res = (
          await Axios.get(
            "https://api.themoviedb.org/3/movie/popular?api_key=623a2eda649fb02dee401196f0a282c9&language=ru&page=" +
              i
          )
        ).data.results;
        this._isMounted && this.setState({
          films: [...this.state.films, ...res],
        });
      }

      let fav = await Axios.get(
        "https://km0lr02nsg.execute-api.us-east-1.amazonaws.com/user/fetchfavorites"
      );
      fav = JSON.parse(fav.data);
      if (fav.status === "success") {
        let curFav = [];
        fav.data.map((item) => {
          if (
            item.user_primary === localStorage.getItem("email") &&
            item.movie
          ) {
            curFav.push(parseInt(item.movie_id));
          }
        });
        this._isMounted && this.setState({
          favorites: [...this.state.favorites, ...curFav],
        });
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div className={classes.Films}>
        <div className={classes.FilmCards}>
          {this.state.films.map((film) => {
            let isGood = true;
            for (const genre of this.state.genres) {
              if (film.genre_ids.indexOf(genre) === -1) {
                isGood = false;
                break;
              }
            }
            if (isGood) {
              return (
                <Card
                  key={film.id}
                  id={film.id}
                  title={film.title}
                  overview={film.overview}
                  isMovie={true}
                  favorite={this.state.favorites.indexOf(film.id) !== -1}
                  addFavorite={this.addFavorite}
                  poster={"https://image.tmdb.org/t/p/w500" + film.poster_path}
                />
              );
            }
          })}
        </div>
        <div className={classes.Filters}>
          <Filter
            genres={this.state.genres}
            addGenre={this.addGenre}
            deleteGenre={this.deleteGenre}
          />
        </div>
      </div>
    );
  }
}

export default Films;

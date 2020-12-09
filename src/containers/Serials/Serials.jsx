import classes from "./Serials.module.css";
import React from "react";
import Card from "../../components/UI/Card/Card";
import Filter from "../../components/filter/Filter";
import Axios from "axios";

class Serials extends React.Component {
  state = {
    serials: [],
    genres: [],
    favorites: [],
  };

  _isMounted = false;

  addGenre = async (id) => {
    this._isMounted &&
      (await this.setState({
        genres: [...this.state.genres, id],
      }));
  };

  deleteGenre = async (id) => {
    let newGenres = this.state.genres.slice();
    newGenres.splice(this.state.genres.indexOf(id), 1);
    this._isMounted &&
      (await this.setState({
        genres: newGenres,
      }));
  };

  addFavorite = async (favoriteId, isFav) => {
    if (isFav) {
      let response = this._isMounted && await Axios.post(
        "https://km0lr02nsg.execute-api.us-east-1.amazonaws.com/user/addfavorite",
        {
          email: localStorage.getItem("email"),
          movie_id: favoriteId,
          movie: false,
        }
      );
      response = JSON.parse(response.data);
      if (response.status === "success") {
        this.setState({
          favorites: [...this.state.favorites, favoriteId],
        });
      }
    } else {
      let response = this._isMounted && await Axios.post(
        "https://km0lr02nsg.execute-api.us-east-1.amazonaws.com/user/deletefavorite",
        {
          email: localStorage.getItem("email"),
          movie_id: favoriteId,
          movie: false,
        }
      );
      response = JSON.parse(response.data);
      if (response.status === "success") {
        let newFav = this.state.favorites.slice();
        newFav.splice(this.state.favorites.indexOf(favoriteId), 1);
        this._isMounted && this.setState({
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
            "https://api.themoviedb.org/3/tv/popular?api_key=623a2eda649fb02dee401196f0a282c9&language=ru&page=" +
              i
          )
        ).data.results;
        this._isMounted && this.setState({
          serials: [...this.state.serials, ...res],
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
            !item.movie
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
      <div className={classes.Serials}>
        <div className={classes.SerialsCard}>
          {this.state.serials.map((serial) => {
            let isGood = true;
            for (const genre of this.state.genres) {
              if (serial.genre_ids.indexOf(genre) === -1) {
                isGood = false;
                break;
              }
            }
            if (isGood) {
              return (
                <Card
                  key={serial.id}
                  id={serial.id}
                  title={serial.name}
                  isMovie={false}
                  overview={serial.overview}
                  favorite={this.state.favorites.indexOf(serial.id) !== -1}
                  poster={
                    "https://image.tmdb.org/t/p/w500" + serial.poster_path
                  }
                  addFavorite={this.addFavorite}
                />
              );
            }
          })}
        </div>
        <div className={classes.Filters}>
          <Filter
            type="genres"
            genres={this.state.genres}
            addGenre={this.addGenre}
            deleteGenre={this.deleteGenre}
          />
        </div>
      </div>
    );
  }
}

export default Serials;

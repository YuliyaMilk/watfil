import classes from "./Films.module.css";
import React from "react";
import { NavLink } from "react-router-dom";
import MainPage from "../MainPage/MainPage";
import Card from "../../components/UI/Card/Card";
import Filter from "../../components/filter/Filter";
import Axios from "axios";
// key = 623a2eda649fb02dee401196f0a282c9
class Films extends React.Component {
  state = {
    films: [],
    genres: [],
  };

  addGenre = async (id) => {
    await this.setState({
      genres: [...this.state.genres, id],
    });
  };

  deleteGenre = async (id) => {
    let newGenres = this.state.genres.slice();
    newGenres.splice(this.state.genres.indexOf(id));
    await this.setState({
      genres: newGenres,
    });
  };

  async componentDidMount() {
    for (let i of [1, 2, 3]) {
      const res = (
        await Axios.get(
          "https://api.themoviedb.org/3/movie/popular?api_key=623a2eda649fb02dee401196f0a282c9&language=ru&page=" +
            i
        )
      ).data.results;
      this.setState({
        films: [...this.state.films, ...res],
      });
    }
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
                    title={film.title}
                    overview={film.overview}
                    poster={
                      "https://image.tmdb.org/t/p/w500" + film.poster_path
                    }
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

import classes from "./Serials.module.css";
import React from "react";
import { NavLink } from "react-router-dom";
import MainPage from "../MainPage/MainPage";
import Card from "../../components/UI/Card/Card";
import Filter from "../../components/filter/Filter";
import Axios from "axios";

class Serials extends React.Component {
  state = {
    serials: [],
    genres: [],
  };

  addGenre = async (id) => {
    await this.setState({
      genres: [...this.state.genres, id],
    });
    console.log(this.state.genres);
  };

  deleteGenre = async (id) => {
    let newGenres = this.state.genres.slice();
    newGenres.splice(this.state.genres.indexOf(id));
    await this.setState({
      genres: newGenres,
    });
    console.log(this.state.genres);
  };

  async componentDidMount() {
    for (let i of [1, 2, 3]) {
      const res = (
        await Axios.get(
          "https://api.themoviedb.org/3/tv/popular?api_key=623a2eda649fb02dee401196f0a282c9&language=ru&page=" +
            i
        )
      ).data.results;
      this.setState({
        serials: [...this.state.serials, ...res],
      });
    }
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
                  title={serial.name}
                  overview={serial.overview}
                  poster={
                    "https://image.tmdb.org/t/p/w500" + serial.poster_path
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

export default Serials;

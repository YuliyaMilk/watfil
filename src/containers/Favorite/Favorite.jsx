import classes from "./Favorite.module.css";
import React from "react";
import Axios from "axios";
import Card from "../../components/UI/Card/Card";
import Filter from "../../components/filter/Filter";
import Loader from "../../components/loader/Loader";

class Favorite extends React.Component {

  state = {
    cards: [],
    filter: null,
    _loading: false,
  };

  _isMounted = false;

  addMovie = async (type) => {
    this._isMounted &&
      this.setState({
        filter: type,
      });
  };

  deleteMovie = async () => {
    this._isMounted &&
      this.setState({
        filter: null,
      });
  };

  deleteFavorite = async (favoriteId, isMovie) => {
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
      let newFav = this.state.cards.slice();
      for (const card of this.state.cards) {
        if (card.id === favoriteId) {
          newFav.splice(this.state.cards.indexOf(card), 1);
          break;
        }
      }
      this._isMounted &&
        this.setState({
          cards: newFav,
        });
    }
  };

  async componentDidMount() {
    this._isMounted = true;
    this._isMounted &&
      this.setState({
        _loading: true,
      });
    let fav = await Axios.get(
      "https://km0lr02nsg.execute-api.us-east-1.amazonaws.com/user/fetchfavorites"
    );
    fav = JSON.parse(fav.data);
    if (fav.status === "success") {
      let cardsArr = [];
      for (const item of fav.data) {
        if (item.user_primary === localStorage.getItem("email")) {
          let card;
          if (item.movie) {
            card = await Axios.get(
              "https://api.themoviedb.org/3/movie/" +
                item.movie_id +
                "?api_key=623a2eda649fb02dee401196f0a282c9&language=ru"
            );
          } else {
            card = await Axios.get(
              "https://api.themoviedb.org/3/tv/" +
                item.movie_id +
                "?api_key=623a2eda649fb02dee401196f0a282c9&language=ru"
            );
          }
          card = card.data;
          cardsArr.push(card);
        }
      }
      this._isMounted &&
        this.setState({
          cards: cardsArr,
        });
    }
    this._isMounted &&
      this.setState({
        _loading: false,
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div className={classes.FavoritePage}>
        {this.state._loading ? (
          <div style = {{'marginTop': '30px'}}>
          <Loader />
          </div>
        ) : (
          <>
            <div className={classes.Filters}>
              <Filter
                type="Favorite"
                filter={this.state.filter}
                addMovie={this.addMovie}
                deleteMovie={this.deleteMovie}
              />
            </div>

            <div className={classes.Favorite}>
              {this.state.cards.map((card) => {
                let isMovie = card.title ? 1 : 0;
                if (this.state.filter === null || this.state.filter === isMovie)
                  return (
                    <Card
                      style={{ width: "30%" }}
                      titleFont="1.3em"
                      descriptionFont="0.6em"
                      key={card.id}
                      id={card.id}
                      isMovie={card.title ? true : false}
                      title={card.title ? card.title : card.name}
                      overview={card.overview}
                      favorite={true}
                      deleteFavorite={this.deleteFavorite}
                      poster={
                        "https://image.tmdb.org/t/p/w500" + card.poster_path
                      }
                    />
                  );
              })}
            </div>
          </>
        )}
      </div>
    );
  }
}

export default Favorite;

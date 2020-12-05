import classes from "./Favorite.module.css";
import React from "react";
import Axios from "axios";
import Card from "../../components/UI/Card/Card";

class Favorite extends React.Component {

  state = {
    cards: []
  }

  deleteFavorite = async(favoriteId, isMovie) => {
    let response = await Axios.post(
      "https://km0lr02nsg.execute-api.us-east-1.amazonaws.com/user/deletefavorite",
      {
        email: localStorage.getItem("email"),
        movie_id: favoriteId,
        movie: isMovie
      }
    );
    response = JSON.parse(response.data);
    if (response.status === "success") {
      let newFav = this.state.cards.slice();
      for(const card of this.state.cards) {
        if(card.id === favoriteId) {
          newFav.splice(this.state.cards.indexOf(card), 1);
          break;
        }
      }
      this.setState({
        cards: newFav,
      });
    }
  }

  async componentDidMount() {
    let fav = await Axios.get(
      "https://km0lr02nsg.execute-api.us-east-1.amazonaws.com/user/fetchfavorites");
    fav = JSON.parse(fav.data);
    if(fav.status === 'success') {
      let cardsArr = []
      for(const item of fav.data) {
        if(item.user_primary === localStorage.getItem('email')) {
          let card;
          if(item.movie) {
            card = await Axios.get(
              "https://api.themoviedb.org/3/movie/"+item.movie_id+"?api_key=623a2eda649fb02dee401196f0a282c9&language=ru")
          }
          else {
            card = await Axios.get(
              "https://api.themoviedb.org/3/tv/"+item.movie_id+"?api_key=623a2eda649fb02dee401196f0a282c9&language=ru")
          }
          card = card.data;
          cardsArr.push(
            card
          )
        }
      };
      this.setState({
        cards: cardsArr
      });
    }
  }

  render() {
    return (
        <div className={classes.Favorite}>
          {this.state.cards.map(card => {
            return <Card 
              style = {{'width': '30%'}}
              titleFont = '1.3em'
              descriptionFont = '0.6em'
              key={card.id}
              id = {card.id}
              isMovie = {card.title ? true : false}
              title={card.title ? card.title : card.name}
              overview={card.overview}
              favorite = {true}
              deleteFavorite = {this.deleteFavorite}
              poster={
                "https://image.tmdb.org/t/p/w500" + card.poster_path
            }/>;
          }) }
        </div>
    );
  }
}

export default Favorite;

import React from "react";
import Score from "./Score.js";
import { fetchPokemon, randomNumber } from "../utils/api.js";
import Card from "./Card.js";
import Loading from "./Loading.js";
import Footer from "./Footer.js";
import Reset from "./Reset.js";

export default class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      highScore: 0,
      level: 1,
      cards: 4,
      pokemonCards: [],
      clicked: [],
      loading: true,
      loss: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentDidMount() {
    this.populateCards();
  }

  populateCards() {
    // Wait at least 2 seconds before loading cards - aesthetics
    setTimeout(() => {
      fetchPokemon(this.state.cards).then((pokemonCards) => {
        this.setState({
          pokemonCards,
          loading: false,
          loss: false,
        });
      });
    }, 2000);
  }

  handleLoss() {
    this.setState({
      loss: true,
    });
  }

  handleReset() {
    this.setState({
      clicked: [],
      pokemonCards: [],
      cards: 4,
      level: 1,
      score: 0,
      loading: true,
      loss: false,
    });

    this.populateCards();
  }

  checkScoreAgainstHigh() {
    let { score, highScore } = this.state;
    score += 10;

    if (score > highScore) {
      this.setState(({ score }) => ({
        highScore: score,
      }));
    }
  }

  handleNextLevel() {
    console.log("Next level!");
    this.setState(({ cards, level }) => ({
      cards: cards + 2,
      level: level + 1,
      clicked: [],
      loading: true,
    }));

    this.populateCards();
  }

  handleClick(e) {
    let { clicked, pokemonCards } = this.state;
    const identifier = e.target.src;

    // Already clicked this card
    if (clicked.includes(identifier)) {
      return this.handleLoss();
    }

    // Haven't clicked this card - still cards to click
    this.setState((state) => ({
      clicked: [...clicked, identifier],
      score: state.score + 10,
    }));

    // Check if above highScore
    this.checkScoreAgainstHigh();

    // Shuffle Cards
    const cards = this.shuffleCards(pokemonCards);
    this.setState({
      pokemonCards: cards,
    });

    // Haven't clicked this card - level completed
    if (clicked.length + 1 === pokemonCards.length) {
      return this.handleNextLevel();
    }
  }

  shuffleCards(cards) {
    const newArray = [];
    while (newArray.length !== cards.length) {
      let randomIndex = randomNumber(cards.length);
      if (!newArray.includes(cards[randomIndex])) {
        newArray.push(cards[randomIndex]);
      }
    }
    // Guard against no position shuffling
    if (newArray === cards) return this.shuffleCards(cards);
    return newArray;
  }

  render() {
    const { score, highScore, level, pokemonCards, loading, loss } = this.state;

    return (
      <React.Fragment>
        <Score score={score} highScore={highScore} />

        <div className="content">
          {loss && (
            <Reset resetGame={this.handleReset} level={level} score={score} />
          )}

          {loading && <Loading />}

          {!loading && !loss && (
            <React.Fragment>
              <h2 className="content__header">Level {level}</h2>
              <p className="content__instructions">
                To progress to the next level click on each pokemon only once!
                Good luck!
              </p>
              <ul className="card-box">
                {pokemonCards.map((pokemon) => {
                  return (
                    <li key={pokemon}>
                      <Card html={pokemon} onClick={this.handleClick} />
                    </li>
                  );
                })}
              </ul>
            </React.Fragment>
          )}
        </div>

        <Footer />
      </React.Fragment>
    );
  }
}

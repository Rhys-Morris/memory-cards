import React from "react";

export default function Score({ score, highScore, level }) {
  return (
    <div className="score">
      <h2 className="score__header">
        <img
          src="https://fontmeme.com/permalink/210413/5fbfa30b447647d1dc5520938a8e9eca.png"
          alt="pokemon-font"
          border="0"
        />
      </h2>
      <div className="score__score-div">
        <p className="score__current">Score: {score}</p>
        <p className="score__high">Highscore: {highScore}</p>
      </div>
    </div>
  );
}

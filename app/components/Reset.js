import React from "react";

export default function Reset({ resetGame, level, score }) {
  return (
    <div className="reset">
      <h2 className="reset__header">You lost on Level {level}</h2>
      <h4 className="reset__score">Your Score: {score}</h4>
      <button className="btn" onClick={resetGame}>
        Try Again
      </button>
    </div>
  );
}

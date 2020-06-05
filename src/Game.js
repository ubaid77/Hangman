import React, { useState } from "react";
import { randomWord } from "./words";
import "./App.css";
import first from "./bg/0.jpg";
import second from "./bg/1.jpg";
import third from "./bg/2.jpg";
import fourth from "./bg/3.jpg";
import fifth from "./bg/4.jpg";
import sixth from "./bg/5.jpg";
import seventh from "./bg/6.jpg";
export default function Game() {
  const IMAGES = [seventh, sixth, fifth, fourth, third, second, first];
  const [ans, setAns] = useState(randomWord());
  const [guess, setGuess] = useState([]);
  const [lives, setLives] = useState(ans.length);

  const generateLetters = () => {
    return "abcdefghijklmnopqrstuvwxyz"
      .split("")
      .map((char) => <div onClick={handleClick}>{char}</div>);
  };
  const restart = () => {
    setAns(randomWord());
    setLives(ans.length);
    setGuess([]);
  };
  function guessedWord() {
    let w = ans.split("").map((ltr) => (guess.includes(ltr) ? ltr : "_"));
    return w;
  }

  const handleClick = (e) => {
    e.target.classList = "disabled";
    let ltr = e.target.textContent;
    setGuess((prevGuess) => [...prevGuess, ltr]);
    !ans.includes(ltr) ? setLives(lives - 1) : setLives(lives);
  };

  function gamePlay() {
    if (lives == 0) {
      //   setGameOver(true);
      return (
        <>
          <h1>Game Over</h1>
          <button onClick={restart}>Restart</button>
        </>
      );
    } else if (guess.join("") === ans) {
      return (
        <>
          <h1>Correct!</h1>
          <button onClick={restart}>Next</button>
        </>
      );
    } else {
      return <div className="input-btns">{generateLetters()}</div>;
    }
  }

  return (
    <>
      <h1>Hangman</h1>
      <img src={IMAGES[lives]}></img>
      <div className="lives">
        <p>
          <i className="fas fa-heart"></i> {lives}
        </p>
      </div>
      <div className="ans-fields">
        <p>{lives == 0 ? ans : guessedWord()}</p>
      </div>
      {gamePlay()}
    </>
  );
}

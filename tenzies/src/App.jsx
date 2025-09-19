import { useEffect, useRef, useState } from "react";
import "./App.css";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const buttonRef = useRef(null);

  const generateAllNewDice = () => {
    return Array.from({ length: 10 }, () => {
      return {
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
        id: nanoid(),
      };
    });
  };

  const [dice, setDice] = useState(() => generateAllNewDice());

  let gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);
    
  useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus();
    }
  }, [gameWon]);

  const hold = (id) => {
    setDice((prev) =>
      prev.map((dice) => {
        return dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice;
      })
    );
  };

  const rollDice = () => {
    if (!gameWon) {
      setDice((prev) =>
        prev.map((dice) => {
          return dice.isHeld
            ? dice
            : { ...dice, value: Math.floor(Math.random() * 6) + 1 };
        })
      );
    } else {
      setDice(generateAllNewDice());
    }
  };

  return (
    <main>
      {gameWon && <Confetti />}
      <div aria-live="polite" className="sr-only">
        {gameWon && (
          <p>Congratulations! You won! Press "New Game" to start again.</p>
        )}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>

      <div className="dice-container">
        {dice.map((die) => (
          <Die
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            hold={() => hold(die.id)}
          />
        ))}
      </div>
      <button ref={buttonRef} className="roll-dice" onClick={rollDice}>
        {gameWon === true ? "New Game" : "Roll Dice"}
      </button>
    </main>
  );
}

export default App;

import { useState } from "react";
import "./App.css";
import Die from "./components/Die";
import { nanoid } from "nanoid";

function App() {
  const generateAllNewDice = () => {
    return Array.from({ length: 10 }, () => {
      return {
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
        id: nanoid(),
      };
    });
  };
  const [dice, setDice] = useState(generateAllNewDice());

  const hold = (id) => {
    setDice((prev) =>
      prev.map((dice) => {
        return dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice;
      })
    );
    console.log(id);
  };

  const rollDice = () => {
    setDice((prev) =>
      prev.map((dice) => {
        return dice.isHeld
          ? dice
          : { ...dice, value: Math.floor(Math.random() * 6) + 1 };
      })
    );
  };

  return (
    <main>
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
      <button className="roll-dice" onClick={rollDice}>
        Roll Dices
      </button>
    </main>
  );
}

export default App;

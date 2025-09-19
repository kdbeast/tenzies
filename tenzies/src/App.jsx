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
    setDice();
  };

  return (
    <main>
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

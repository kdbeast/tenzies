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

  const rollDice = () => {
    setDice(generateAllNewDice());
  };

  return (
    <main>
      <div className="dice-container">
        {dice.map((die) => (
          <Die key={die.id} value={die.value} isHeld={die.isHeld} />
        ))}
      </div>
      <button className="roll-dice" onClick={rollDice}>
        Roll Dices
      </button>
    </main>
  );
}

export default App;

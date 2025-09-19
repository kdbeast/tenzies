const Die = ({ value, isHeld, hold }) => {
  return (
    <button
      onClick={hold}
      aria-pressed={isHeld}
      aria-label={`Die with value ${value},${isHeld ? "held" : "not held"}`}
      style={{ backgroundColor: isHeld === true ? "#59E391" : "white" }}
    >
      {value}
    </button>
  );
};

export default Die;

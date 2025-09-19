const Die = ({ value, isHeld, hold}) => {
  return (
    <button
      onClick={hold}
      style={{ backgroundColor: isHeld === true ? "#59E391" : "white" }}
    >
      {value}
    </button>
  );
};

export default Die;

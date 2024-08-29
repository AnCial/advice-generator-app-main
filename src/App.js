import "./css/index.css";
import { useEffect, useState } from "react";
import Divider from "./images/pattern-divider-desktop.svg";
import Icon from "./images/icon-dice.svg";

export default function App() {
  return (
    <div className="container">
      <Advice />
    </div>
  );
}

function Advice() {
  const [advice, setAdvice] = useState("");
  const [randomInt, setRandomInt] = useState("");

  async function fetchAdvice() {
    const response = await fetch("https://api.adviceslip.com/advice");
    const data = await response.json();
    setAdvice(data.slip.advice);
    setRandomInt(data.slip.id);
  }

  useEffect(() => {
    fetchAdvice();
  }, []);

  function handleClick() {
    fetchAdvice();
  }

  return (
    <div className="advice">
      <AdviceComponent advice={advice} randomInt={randomInt} />
      <Button onHandleClick={handleClick} />
    </div>
  );
}

function AdviceComponent({ advice, randomInt }) {
  return (
    <div className="advice__text">
      <span>advice #{randomInt}</span>
      <h2>"{advice}"</h2>

      <img src={Divider} alt="divider" />
    </div>
  );
}
function Button({ onHandleClick }) {
  return (
    <button onClick={onHandleClick}>
      <img src={Icon} alt="icon" />
    </button>
  );
}

import { useState } from "react";
import "./App.css";
import Box from "./component/Box";

const choice = {
  rock: {
    name: "Rock",
    img: "https://th.bing.com/th/id/OIP.LZReP5kjJl68lY34h6hUOgHaEo?w=255&h=180&c=7&r=0&o=5&pid=1.7",
  },
  scissors: {
    name: "Scissors",
    img: "https://th.bing.com/th/id/OIP.LHdATXmungai6kPyPOrLpgHaFp?w=262&h=200&c=7&r=0&o=5&pid=1.7",
  },
  paper: {
    name: "Paper",
    img: "https://th.bing.com/th/id/OIP.iTwcNNAT8EJeUtcqf07WMwHaE9?w=292&h=195&c=7&r=0&o=5&pid=1.7",
  },
};

function IntroPage({ onStartGame }) {
  return (
    <div className="intro-page">
      <h1>가위바위보 게임</h1>
      <div className="intro-icons">
        <span role="img" aria-label="scissors">
          ✌️
        </span>
        <span role="img" aria-label="rock">
          ✊
        </span>
        <span role="img" aria-label="paper">
          🖐️
        </span>
      </div>
      <p>컴퓨터와 대결하는 흥미진진한 가위바위보 게임!</p>
      <p>당신의 선택은?</p>
      <button onClick={onStartGame}>게임 시작</button>
    </div>
  );
}

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [userSelect, setUserSelect] = useState(null);
  const [computerSelect, setComputerSelect] = useState(null);
  const [userResult, setUserResult] = useState("");
  const [computerResult, setComputerResult] = useState("");

  const startGame = () => {
    setShowIntro(false);
  };

  const play = (userChoice) => {
    setUserSelect(choice[userChoice]);
    const computerChoice = randomChoice();
    setComputerSelect(computerChoice);
    const userOutcome = judgement(choice[userChoice], computerChoice);
    setUserResult(userOutcome);
    setComputerResult(getComputerResult(userOutcome));
  };

  const judgement = (user, computer) => {
    console.log("user", user, "computer", computer);

    if (user.name === computer.name) {
      return "tie";
    } else if (user.name === "Rock") {
      return computer.name === "Scissors" ? "win" : "lose";
    } else if (user.name === "Scissors") {
      return computer.name === "Paper" ? "win" : "lose";
    } else if (user.name === "Paper") {
      return computer.name === "Rock" ? "win" : "lose";
    }
  };

  const randomChoice = () => {
    let itemArray = Object.keys(choice);
    let randomItem = Math.floor(Math.random() * itemArray.length);
    let final = itemArray[randomItem];
    return choice[final];
  };

  const getComputerResult = (userResult) => {
    if (userResult === "tie") return "tie";
    return userResult === "win" ? "lose" : "win";
  };

  return (
    <div className="container">
      {showIntro ? (
        <IntroPage onStartGame={startGame} />
      ) : (
        <div className="game-area">
          <div className="main">
            <Box title="You" item={userSelect} result={userResult} />
            <Box
              title="Computer"
              item={computerSelect}
              result={computerResult}
            />
          </div>
          <div className="button-area">
            <button onClick={() => play("scissors")}>가위</button>
            <button onClick={() => play("rock")}>바위</button>
            <button onClick={() => play("paper")}>보</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

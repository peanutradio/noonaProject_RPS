import { useState } from "react"; // React의 useState 훅을 가져와 컴포넌트 상태를 관리합니다.
import "./App.css"; // 스타일을 위해 CSS 파일을 가져옵니다.
import Box from "./component/Box"; // Box 컴포넌트를 가져옵니다.

// 게임에서 사용할 선택지: 바위, 가위, 보를 정의한 객체입니다.
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

// 게임 시작 페이지 컴포넌트
function IntroPage({ onStartGame }) {
  return (
    <div className="intro-page">
      <h1>가위바위보 게임</h1> {/* 게임 제목 */}
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
      <p>컴퓨터와 대결하는 흥미진진한 가위바위보 게임!</p> {/* 게임 소개 */}
      <p>당신의 선택은?</p> {/* 플레이어에게 선택을 묻는 문구 */}
      <button onClick={onStartGame}>게임 시작</button> {/* 게임 시작 버튼 */}
    </div>
  );
}

// 메인 App 컴포넌트
function App() {
  const [showIntro, setShowIntro] = useState(true); // 소개 페이지를 보여줄지 여부를 관리하는 상태
  const [userSelect, setUserSelect] = useState(null); // 사용자의 선택을 저장하는 상태
  const [computerSelect, setComputerSelect] = useState(null); // 컴퓨터의 선택을 저장하는 상태
  const [userResult, setUserResult] = useState(""); // 사용자의 결과를 저장하는 상태
  const [computerResult, setComputerResult] = useState(""); // 컴퓨터의 결과를 저장하는 상태

  // 게임을 시작하고 소개 페이지를 숨기는 함수
  const startGame = () => {
    setShowIntro(false);
  };

  // 사용자가 선택했을 때의 게임 로직을 처리하는 함수
  const play = (userChoice) => {
    setUserSelect(choice[userChoice]); // 사용자의 선택을 저장합니다.
    const computerChoice = randomChoice(); // 컴퓨터의 선택을 랜덤으로 가져옵니다.
    setComputerSelect(computerChoice); // 컴퓨터의 선택을 저장합니다.
    const userOutcome = judgement(choice[userChoice], computerChoice); // 사용자의 결과를 판단합니다.
    setUserResult(userOutcome); // 사용자의 결과를 저장합니다.
    setComputerResult(getComputerResult(userOutcome)); // 컴퓨터의 결과를 저장합니다.
  };

  // 사용자의 선택과 컴퓨터의 선택을 비교하여 결과를 판단하는 함수
  const judgement = (user, computer) => {
    console.log("user", user, "computer", computer); // 디버깅을 위해 선택을 로그에 출력합니다.

    if (user.name === computer.name) {
      return "tie"; // 선택이 동일하면 무승부입니다.
    } else if (user.name === "Rock") {
      return computer.name === "Scissors" ? "win" : "lose"; // 바위는 가위를 이깁니다.
    } else if (user.name === "Scissors") {
      return computer.name === "Paper" ? "win" : "lose"; // 가위는 보를 이깁니다.
    } else if (user.name === "Paper") {
      return computer.name === "Rock" ? "win" : "lose"; // 보는 바위를 이깁니다.
    }
  };

  // 컴퓨터의 선택을 랜덤으로 가져오는 함수
  const randomChoice = () => {
    let itemArray = Object.keys(choice); // 선택지 객체의 키를 가져옵니다.
    let randomItem = Math.floor(Math.random() * itemArray.length); // 랜덤 인덱스를 생성합니다.
    let final = itemArray[randomItem]; // 랜덤 인덱스에 해당하는 선택지를 가져옵니다.
    return choice[final]; // 선택지 객체를 반환합니다.
  };

  // 사용자의 결과에 따라 컴퓨터의 결과를 결정하는 함수
  const getComputerResult = (userResult) => {
    if (userResult === "tie") return "tie"; // 무승부일 경우 컴퓨터도 무승부입니다.
    return userResult === "win" ? "lose" : "win"; // 사용자가 이겼을 경우 컴퓨터는 패배, 반대의 경우는 승리입니다.
  };

  return (
    <div className="container">
      {showIntro ? (
        <IntroPage onStartGame={startGame} /> // showIntro가 true이면 소개 페이지를 보여줍니다.
      ) : (
        <div className="game-area">
          {" "}
          {/* showIntro가 false이면 게임 영역을 보여줍니다. */}
          <div className="main">
            <Box title="You" item={userSelect} result={userResult} />{" "}
            {/* 사용자의 선택과 결과를 보여주는 Box 컴포넌트 */}
            <Box
              title="Computer"
              item={computerSelect}
              result={computerResult}
            />{" "}
            {/* 컴퓨터의 선택과 결과를 보여주는 Box 컴포넌트 */}
          </div>
          <div className="button-area">
            <button onClick={() => play("scissors")}>가위</button>{" "}
            {/* 가위를 선택하는 버튼 */}
            <button onClick={() => play("rock")}>바위</button>{" "}
            {/* 바위를 선택하는 버튼 */}
            <button onClick={() => play("paper")}>보</button>{" "}
            {/* 보를 선택하는 버튼 */}
          </div>
        </div>
      )}
    </div>
  );
}

export default App; // App 컴포넌트를 기본 내보내기로 내보냅니다.

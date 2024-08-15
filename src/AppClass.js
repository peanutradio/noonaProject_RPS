import React from "react";
import "./App.css";
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
class IntroPage extends React.Component {
  render() {
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
        <button onClick={this.props.onStartGame}>게임 시작</button>
      </div>
    );
  }
}

// 메인 App 컴포넌트
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showIntro: true,
      userSelect: null,
      computerSelect: null,
      userResult: "",
      computerResult: "",
    };
  }

  // 게임을 시작하고 소개 페이지를 숨기는 메소드
  startGame = () => {
    this.setState({ showIntro: false });
  };

  // 사용자가 선택했을 때의 게임 로직을 처리하는 메소드
  play = (userChoice) => {
    const computerChoice = this.randomChoice();
    const userOutcome = this.judgement(choice[userChoice], computerChoice);

    this.setState({
      userSelect: choice[userChoice],
      computerSelect: computerChoice,
      userResult: userOutcome,
      computerResult: this.getComputerResult(userOutcome),
    });
  };

  // 사용자의 선택과 컴퓨터의 선택을 비교하여 결과를 판단하는 메소드
  judgement = (user, computer) => {
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

  // 컴퓨터의 선택을 랜덤으로 가져오는 메소드
  randomChoice = () => {
    let itemArray = Object.keys(choice);
    let randomItem = Math.floor(Math.random() * itemArray.length);
    let final = itemArray[randomItem];
    return choice[final];
  };

  // 사용자의 결과에 따라 컴퓨터의 결과를 결정하는 메소드
  getComputerResult = (userResult) => {
    if (userResult === "tie") return "tie";
    return userResult === "win" ? "lose" : "win";
  };

  render() {
    return (
      <div className="container">
        {this.state.showIntro ? (
          <IntroPage onStartGame={this.startGame} />
        ) : (
          <div className="game-area">
            <div className="main">
              <Box
                title="You"
                item={this.state.userSelect}
                result={this.state.userResult}
              />
              <Box
                title="Computer"
                item={this.state.computerSelect}
                result={this.state.computerResult}
              />
            </div>
            <div className="button-area">
              <button onClick={() => this.play("scissors")}>가위</button>
              <button onClick={() => this.play("rock")}>바위</button>
              <button onClick={() => this.play("paper")}>보</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;

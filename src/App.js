import { useState } from "react";
import "./App.css";
import Box from "./component/Box";

//1. 박스 2개(타이틀, 사진, 결과값)
//2. 가위 바위 보 버튼이 있다.
//3. 버튼을 클릭하면 클릭한 값이 박스에 보임
//4. 컴퓨터는 랜덤하게 아이템 선택이 된다.
//5. 3~4번의 결과를 가지고 누가 이겼는지 승패를 따진다.
//6. 승패 결과에 따라 테두리 색이 바뀐다(이기면-초록,지면,빨강,비기면-검정)

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

function App() {
  const [userSelect, setUserSelect] = useState(null);

  const play = (userChoice) => {
    setUserSelect(choice[userChoice]);
  };
  return (
    <div>
      <div className="main">
        <Box title="You" item={userSelect} />
        {/* <Box title="computer" /> */}
      </div>
      <div className="main">
        <button onClick={() => play("scissors")}>가위</button>
        <button onClick={() => play("rock")}>바위</button>
        <button onClick={() => play("paper")}>보</button>
      </div>
    </div>
  );
}

export default App;

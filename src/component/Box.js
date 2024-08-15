import React from "react";

// Box 컴포넌트: props로 제목, 아이템, 결과를 받아 적절한 스타일을 적용하여 보여줍니다.
const Box = ({ title, item, result }) => {
  // 결과에 따라 스타일을 동적으로 적용하는 함수
  const getStyles = () => {
    if (result === "win") return { borderColor: "green", borderWidth: "10px" }; // 승리 시 녹색 테두리
    if (result === "lose") return { borderColor: "red", borderWidth: "10px" }; // 패배 시 빨간색 테두리
    if (result === "tie") return { borderColor: "black", borderWidth: "10px" }; // 무승부 시 검은색 테두리
    return { borderColor: "black", borderWidth: "1px" }; // 기본 검은색 테두리
  };

  return (
    <div className="box" style={getStyles()}>
      <h1>{title}</h1> {/* 제목을 보여줍니다 */}
      {item && <img className="item-img" src={item.img} alt={item.name} />}{" "}
      {/* 아이템 이미지가 있으면 보여줍니다 */}
      <h2>{result}</h2> {/* 결과를 보여줍니다 */}
    </div>
  );
};

export default Box; // Box 컴포넌트를 외부에서 사용할 수 있도록 내보냅니다.

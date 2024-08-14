import React from "react";

const Box = ({ title, item, result }) => {
  const getStyles = () => {
    if (result === "win") return { borderColor: "green", borderWidth: "10px" };
    if (result === "lose") return { borderColor: "red", borderWidth: "10px" };
    if (result === "tie") return { borderColor: "black", borderWidth: "10px" };
    return { borderColor: "black", borderWidth: "1px" };
  };

  return (
    <div className="box" style={getStyles()}>
      <h1>{title}</h1>
      {item && <img className="item-img" src={item.img} alt={item.name} />}
      <h2>{result}</h2>
    </div>
  );
};

export default Box;

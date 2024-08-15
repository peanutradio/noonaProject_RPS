import React from "react";

// Box 컴포넌트
class Box extends React.Component {
  getStyles() {
    if (this.props.result === "win")
      return { borderColor: "green", borderWidth: "10px" };
    if (this.props.result === "lose")
      return { borderColor: "red", borderWidth: "10px" };
    if (this.props.result === "tie")
      return { borderColor: "black", borderWidth: "10px" };
    return { borderColor: "black", borderWidth: "1px" };
  }

  render() {
    return (
      <div className="box" style={this.getStyles()}>
        <h1>{this.props.title}</h1>
        {this.props.item && (
          <img
            className="item-img"
            src={this.props.item.img}
            alt={this.props.item.name}
          />
        )}
        <h2>{this.props.result}</h2>
      </div>
    );
  }
}

export default Box;

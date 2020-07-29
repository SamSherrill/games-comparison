import React from "react";
import "./Button.scss";

const Button = (props) => {
  return (
    <div id={props.id}>
      <button className="btn btn-light" onClick={props.onClick}>{props.text}</button>
    </div>
  );
};

export default Button;

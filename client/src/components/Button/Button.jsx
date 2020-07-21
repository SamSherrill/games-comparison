import React from "react";
import "./Button.scss";

const Button = (props) => {
  return (
    <div>
      <button className="btn btn-light" onClick={props.onClick}>{props.text}</button>
    </div>
  );
};

export default Button;

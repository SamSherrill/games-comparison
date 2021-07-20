import React from "react";
import "./Button.scss";

const Button = (props) => {
  return (
      <button  id={props.id} className="btn btn-light" onClick={props.onClick}>{props.children}</button>
  );
};

export default Button;

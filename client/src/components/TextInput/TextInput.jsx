import React from "react";
import "./TextInput.scss";

const TextInput = (props) => {
  return (
    <div className="input-group" key={props.index}>
      <label htmlFor={props.name}>{props.label}</label>
      <input
        type="text"
        className="form-control rounded-left"
        aria-describedby={props.name}
        name={props.name}
        placeholder={props.placeholder}
        onChange={props.onChange}
        spellCheck="false"
      />
      <div className="input-group-append">
        <button
          className="btn btn-danger"
          name={props.name}
          onClick={props.onClick}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default TextInput;

import React from 'react';
import "./TextInput.scss";

const TextInput = (props) => {
    return (
        <div>
            <label for={props.name}>{props.label}</label>
            <input 
              type="text" 
              className="form-control"
              aria-describedby={props.name}
              name={props.name}
              placeholder={props.placeholder}
              onChange={props.onChange}
            />
        </div>
    );
};

export default TextInput;
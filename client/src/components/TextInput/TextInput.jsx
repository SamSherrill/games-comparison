import React from 'react';

const TextInput = (props) => {
    return (
        <div>
            <label for={props.name}>{props.label}</label>
            <input 
              type="text" 
              className="form-control"
              aria-describedby={props.name}
              placeholder={props.placeholder}
            />
        </div>
    );
};

export default TextInput;
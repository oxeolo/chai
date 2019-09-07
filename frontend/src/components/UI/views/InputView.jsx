import React, {Component} from 'react';
import './inputView.css';


const InputView = ({placeholder, type = 'text'}) => (
    <input
        className = 'inputView'
        placeholder = {placeholder}
        type = {type}
    />
)

export default InputView;
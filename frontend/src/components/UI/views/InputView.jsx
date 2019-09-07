import React, {Component} from 'react';
import './inputView.css';


const InputView = ({placeholder, type = 'text', onChange, value}) => (
    <input
        value={value}
        onChange={e => onChange(e.currentTarget.value)}
        className = 'inputView'
        placeholder = {placeholder}
        type = {type}
    />
)

export default InputView;
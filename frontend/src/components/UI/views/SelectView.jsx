import React, { Component } from "react";
import "./inputView.css";

const SelectView = ({ options, onChange, value }) => (
  <select
    value={value}
    defaultValue={value}
    onChange={e => onChange(e.currentTarget.value)}
    className="inputView"
  >
    {options.map(([name, val]) => (
      <option key={val}>
        {name}
      </option>
    ))}
  </select>
);

export default SelectView;

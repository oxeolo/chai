import React, { Component } from "react";
import "./composeView.css";

const ComposeView = ({ value, onChange }) => (
  <textarea
    className="composeView"
    placeholder="What's on your mind?"
    value={value}
    onChange={e => onChange(e.currentTarget.value)}
  />
);

export default ComposeView;

import React, { Component } from "react";
import "./buttonView.css";

import { Link } from "react-router-dom";

const ButtonView = ({ children, loading, onClick = () => {} }) => (
  <button className="buttonView" onClick={onClick}>
    {loading ? "..." : children}
  </button>
);

export const LinkButtonView = ({ to, children }) => (
  <ButtonView>
    {children}
    <Link to={to} />
  </ButtonView>
);

export default ButtonView;

import React, { Component } from "react";
import "./statusView.css";

const StatusView = ({ saved }) => (
  <div className="statusView">
    {saved ? "All Changes Saved" : "Saving..."}
  </div>
);

export default StatusView;

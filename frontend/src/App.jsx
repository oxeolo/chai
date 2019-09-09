import React, { Component } from "react";
import "./App.css";

import Axios from "axios";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import BooksPage from "./pages/BooksPage/BooksPage";
import ComposePage from "./pages/ComposePage/ComposePage";
import { Colors } from "./utils/colors";
import ConfigureBookPage from "./pages/ConfigureBookPage/ConfigureBookPage";

const API =
  process.env.NODE_ENV === "development"
    ? `http://localhost:4000/api`
    : "./api";
Axios.defaults.baseURL = API;
Axios.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={() => <Redirect to="/app" />} />
          <Route exact path="/app" component={LandingPage} />
          <Route path="/app/login" component={LoginPage} />
          <Route path="/app/books" component={BooksPage} />
          <Route path="/app/compose/:id" component={ComposePage} />
          <Route path="/app/configure/" component={ConfigureBookPage} />
        </div>
      </Router>
    );
  }
}

export default App;

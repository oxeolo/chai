import React, { Component } from 'react';
import './App.css';

import {BrowserRouter as Router, Route} from 'react-router-dom';

import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import BooksPage from './pages/BooksPage/BooksPage';
import ComposePage from './pages/ComposePage/ComposePage';
import { Colors } from './utils/colors';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      books: {
        abc: {id: 'abc', color: Colors.mint, title: 'Journal'},
        def: {id: 'def', color: Colors.coral, title: 'To Do'},
        ghi: {id: 'ghi', color: Colors.vanilla, title: 'Travel'}
      }
    }
  }

  render() {
    return (
      <Router>
        <div className='App'>
          <Route exact path='/' component = {LandingPage}/>
          <Route path='/login' component = {LoginPage}/>
          <Route path='/books' component = {() => <BooksPage  books={this.state.books}/>}/>
          <Route path='/compose/:id' component = {({match}) => <ComposePage match={match} books={this.state.books}/>}/>
        </div> 
      </Router>
    );
  }
}

export default App;

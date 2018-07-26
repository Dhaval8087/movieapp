import React from 'react';

import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MovieList from './components/MovieList';
import CompareMovie from './components/CompareMovie';
const App = () =>
  <Router>
    <Switch>
      <Route exact path="/" component={MovieList} />
      <Route exact path="/compare" component={CompareMovie} />
    </Switch>
  </Router>;
export default App;

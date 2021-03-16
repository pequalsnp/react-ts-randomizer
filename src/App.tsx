import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Randomizer from './components/Randomizer';

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
      <Switch>
        <Route exact path="/">
          <Randomizer />
        </Route>
      </Switch>
      </Router>
    </div>
  );
}

export default App;

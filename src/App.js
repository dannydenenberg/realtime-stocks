import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Search from './components/Search'
import CenterView from './components/CenterView'
import Stock from './components/Stock';

function App() {
  return (
    <div className="App">
        <Router>
      <div>
   

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            About
          </Route>
          <Route path="/stock">
          <CenterView>       <Stock /></CenterView>
          </Route>
          <Route path="/">
            <CenterView>       <Search /></CenterView>
     
          </Route>
        </Switch>
      </div>
    </Router>
    </div>
    
  );
}

export default App;

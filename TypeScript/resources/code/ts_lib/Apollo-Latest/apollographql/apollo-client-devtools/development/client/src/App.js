import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useQuery } from '@apollo/client';
import ColorSchemeGenerator from './ColorSchemeGenerator';
import Favorites from './Favorites';
import ColorLookup from './ColorLookup';
import { GET_SAVED_COLORS } from './queries';
import './App.css';

function App() {
  useQuery(GET_SAVED_COLORS);

  return (
    <Router>
      <div className="App">
        <header>
          <Link to="/">
            <h1>Colors</h1>
          </Link>
          <nav>
            <Link to="/favorites">Favorites</Link>
            <Link to="/lookup">Lookup</Link>
          </nav>
        </header>
        <main>
          <Switch>
            <Route path="/favorites">
              <Favorites />
            </Route>
            <Route path="/lookup">
              <ColorLookup />
            </Route>
            <Route path="/">
              <ColorSchemeGenerator />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './Pages/Home';
import Contact from './Pages/Contact';
import Nav from './Shared/Nav';

import "./main.scss";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <div className="overlay">
            <Nav />
          </div>
          <Home />
        </Route>
        <Route path="/project/:id">
          <div className="overlay">
            <Nav />
          </div>
          <Home />
        </Route>
        <Route path="/contact">
          <div className="overlay">
            <Nav />
            <Contact />
          </div>
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

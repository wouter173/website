import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Switch, Route, RouteProps } from 'react-router-dom';

import Home from './Pages/Home';
import Contact from './Pages/Contact';
import Project from './Pages/Project';
import Overlay from './Shared/Overlay';

import "./main.scss";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Overlay nav/>
          <Home />
        </Route>
        <Route path="/project/:id" render={(props: RouteProps) => {
          return (
            <>
              <Overlay>
                <Project routeProps={props} />
              </Overlay>
              <Home />
            </>
          );
          }} />
        <Route path="/contact">
          <Overlay>
            <Contact/>
          </Overlay>
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

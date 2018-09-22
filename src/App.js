import React, { Component } from 'react';
import './style/style.css';
import { connect } from "react-redux";
import { HashRouter, Route, Switch } from 'react-router-dom';

import requireAuth from "./auth/requireAuth";
import Login from './screens/Login';
import Game from './screens/Game';

export default class App extends Component {

  render() {
    return (
      <HashRouter>
        <div id='page'>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/game" component={Game} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

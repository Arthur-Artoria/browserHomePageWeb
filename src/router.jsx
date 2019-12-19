import Home from './views/home';
import Users from './views/uses';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React, { Component } from 'react'
import Container from './layout/container/container';

export default class BasicRouter extends Component {
  render() {
    return (
      <Container>
        <Router>
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route exact path="/users" component={ Users } />
          </Switch>
        </Router>
      </Container>
    )
  }
}




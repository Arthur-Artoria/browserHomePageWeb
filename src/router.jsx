import Home from './views/home';
import Users from './views/uses';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import Container from './layout/container/container';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

export default class BasicRouter extends Component {
  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <Container>
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/users" component={Users} />
            </Switch>
          </Router>
        </Container>
      </ConfigProvider>
    );
  }
}

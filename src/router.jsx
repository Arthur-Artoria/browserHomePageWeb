import React, { Component } from 'react';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import Container from './layout/container/container';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import zhCN from 'antd/es/locale/zh_CN';
import { store } from './redux/store';
import Home from './views/home';
import Users from './views/uses';
import 'typeface-roboto';

export default class BasicRouter extends Component {
  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <Provider store={store}>
          <Container>
            <Router>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/users" component={Users} />
              </Switch>
            </Router>
          </Container>
        </Provider>
      </ConfigProvider>
    );
  }
}

import React, { Component } from 'react';
import './index.scss';
import { Background } from '../background/background';
import { Actions } from '../../components/public/actions';

export class Container extends Component {
  render() {
    return (
      <div id="container">
        <Background />
        <Actions />
        <div className="container-inner">{this.props.children}</div>
      </div>
    );
  }
}

export default Container;

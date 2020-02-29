import React, { Component } from 'react';
import './index.scss';
import Time from '../../components/home/time';
import { SearchBox } from '../../components/home/search-box';
import { Menu } from '../../components/home/menu';

export default class Home extends Component {
  render() {
    return (
      <div id="home" className="flex-center">
        <Time />
        <SearchBox />
        <Menu />
      </div>
    );
  }
}

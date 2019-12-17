import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './index.scss'
import Time from '../../components/home/time'
import SearchBox from '../../components/home/search-box'

export default class Home extends Component {
  render() {
    return (
      <div id="home" className="flex-center">
        <Time />
        <SearchBox />
      </div>
    )
  }
};

import React, { Component } from 'react'
import './index.scss'
export class Container extends Component {

  getBackgroundImageList() {
    return [];
  }

  render() {
    const bj = require(`../../assets/images/background/15.jpg`);
    return (
      <div id="container" className="bg" style={ { 'backgroundImage': `url(${bj})` } } >
        { this.props.children }
      </div >
    )
  }
}

export default Container

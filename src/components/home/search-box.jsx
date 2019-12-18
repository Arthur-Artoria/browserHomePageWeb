import React, { Component } from 'react'
import './search-box.scss'
export class SearchBox extends Component {

  constructor(props) {
    super(props);
  }

  handleInputKeyDown(event) {
    const { keyCode, target: { value } } = event;
    if (keyCode === 13 && value) {
      window.open(`https://www.baidu.com/baidu?wd=${encodeURI(value)}`)
    }
  }

  render() {
    return (
      <div id="search-box">
        <input className="search-box__inner" onKeyDown={ this.handleInputKeyDown } />
      </div>
    )
  }
}


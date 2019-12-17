import React, { Component } from 'react'
import './search-box.scss'
export class SearchBox extends Component {
  render() {
    return (
      <div id="search-box">
        <input className="search-box__inner" />
      </div>
    )
  }
}

export default SearchBox

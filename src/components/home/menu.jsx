import React, { Component } from 'react';
import { Bookmark } from './bookmark';
import './menu.scss';
export class Menu extends Component {
  /**
   * * 渲染书签列表
   */
  renderBookmarkList() {
    const bookmarkList = JSON.parse(localStorage.getItem('bookmarkList'));
    if (!bookmarkList) return null;
    return bookmarkList.map((bookmark, index) => (
      <Bookmark bookmark={bookmark} key={index} />
    ));
  }

  render() {
    return <section id="bookmark-list">{this.renderBookmarkList()}</section>;
  }
}

import React, { Component } from 'react';
import { Bookmark } from './bookmark';
import './menu.scss';
import { GetBookmarks } from '../../assets/js/api';
export class Menu extends Component {
  token = localStorage.getItem('access_token');

  componentDidMount() {
    this.initData();
  }

  /**
   * * 初始化数据
   */
  initData() {}

  /**
   * * 获取书签列表
   */
  getBookmarks() {
    if (this.token) {
      GetBookmarks().then(bookmarks => {
        this.setState({ bookmarks: bookmarks });
      });
    } else {
      const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
      this.setState({ bookmarks: bookmarks });
    }
  }

  /**
   * * 渲染书签列表
   */
  renderBookmarkList() {
    const { bookmarks } = this.props;
    if (!bookmarks.length) return null;
    return bookmarks.map((bookmark, index) => (
      <Bookmark bookmark={bookmark} key={index} />
    ));
  }

  render() {
    return (
      <section id="bookmark-list" className="flex-center">
        {this.renderBookmarkList()}
      </section>
    );
  }
}

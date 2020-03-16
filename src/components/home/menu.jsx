import React, { Component } from 'react';
import { Bookmark } from './bookmark';
import './menu.scss';
import { GetBookmarks } from '../../assets/js/api';
import { UpdateBookmark } from './update-bookmark';
export class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  componentDidMount() {
    this.initData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.token !== prevProps.token) {
      this.initData();
    }
  }

  /**
   * * 初始化数据
   */
  initData() {
    this.getBookmarks();
  }

  /**
   * * 获取书签列表
   */
  async getBookmarks() {
    let bookmarks = [];
    if (this.props.token) {
      bookmarks = await GetBookmarks();
    } else {
      bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    }
    this.props.onInitBookmarks(bookmarks);
  }

  /**
   * * 渲染书签列表
   */
  renderBookmarkList() {
    const { bookmarks } = this.props;
    if (!bookmarks.length) return null;
    return bookmarks.map((bookmark, index) => (
      <Bookmark
        onUpdateBookmark={this.handleUpdateBookmark}
        bookmark={{ ...bookmark }}
        key={index}
      />
    ));
  }

  handleDialogChange = visible => this.setState({ visible });

  handleUpdateBookmark = id => {
    this.bookmarkId = id;
    this.handleDialogChange(true);
  };

  render() {
    const { visible } = this.state;
    return (
      <section id="bookmark-list" className="flex-center">
        {this.renderBookmarkList()}
        <UpdateBookmark
          visible={visible}
          bookmarkId={this.bookmarkId}
          onDialogChange={this.handleDialogChange}
        />
      </section>
    );
  }
}

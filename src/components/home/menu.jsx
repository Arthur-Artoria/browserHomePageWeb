import React, { Component } from 'react';
import { Bookmark } from './bookmark';
import { GetBookmarks } from '../../assets/js/api';
import { UpdateBookmark } from './update-bookmark';
import { Icon, Fab } from '@material-ui/core';
import './menu.scss';

export class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  dialogAction = 'create';

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

  /**
   * * 对话框状态变化设置
   * @param {Boolean} visible 显示状态
   */
  handleDialogChange = visible => this.setState({ visible });

  /**
   * * 编辑书签按钮点击回调
   * @param {number} id 书签id
   */
  handleUpdateBookmark = id => {
    this.dialogAction = 'update';
    this.bookmarkId = id;
    this.handleDialogChange(true);
  };

  /**
   * * 新增书签按钮点击回调
   */
  handleCreateBookmarkClick = () => {
    this.dialogAction = 'create';
    this.handleDialogChange(true);
  };

  setUploadProps() {
    return {
      name: 'file',
      action: 'localhost:3001/oss/upload'
    };
  }

  render() {
    const { visible } = this.state;
    const { dialogAction, bookmarkId } = this;
    return (
      <section id="bookmark-list" className="flex-center">
        {this.renderBookmarkList()}
        <UpdateBookmark
          action={dialogAction}
          visible={visible}
          bookmarkId={bookmarkId}
          onDialogChange={this.handleDialogChange}
        />
        <Fab onClick={this.handleCreateBookmarkClick} aria-label="add">
          <Icon>add</Icon>
        </Fab>
      </section>
    );
  }
}

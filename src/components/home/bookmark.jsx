import React, { Component } from 'react';
import { Button, Popover, message, Popconfirm } from 'antd';
import { DeleteBookmark } from '../../assets/js/api';
import { connect } from 'react-redux';

export class _Bookmark extends Component {
  /**
   * * 渲染书签名称
   * @param {object} param 书签
   */
  bookmarkPopoverContent({ name, id }) {
    return (
      <div className="bookmark-popover">
        {this.renderBookmarkActons(id)}
        <p className="bookmark-name">{name}</p>
      </div>
    );
  }

  /**
   * * 书签的操作按钮渲染
   * @param {number} id 书签操作按钮
   */
  renderBookmarkActons(id) {
    return (
      <div className="bookmark-actions">
        <i
          onClick={this.handleEditClick.bind(this, id)}
          className="material-icons bookmark-actions__icon">
          edit
        </i>
        <Popconfirm
          title="确定删除吗？"
          okText="确定"
          cancelText="取消"
          onConfirm={this.handleDeleteClick.bind(this, id)}>
          <i className="material-icons bookmark-actions__icon">delete</i>
        </Popconfirm>
      </div>
    );
  }

  handleEditClick = id => {};

  handleDeleteClick = id => {
    DeleteBookmark(id).then(res => {
      this.props.dispatch({ type: 'DELETE_BOOKMARK', payload: id });
      message.success('删除成功！');
    });
  };

  render() {
    const { bookmark } = this.props;
    const { name, href } = bookmark;
    return (
      <Popover
        content={this.bookmarkPopoverContent(bookmark)}
        className="bookmark">
        <Button
          href={href}
          size="large"
          target="_blank"
          shape="circle"
          className="bookmark-cover">
          {name.slice(0, 1)}
        </Button>
      </Popover>
    );
  }
}

export const Bookmark = connect()(_Bookmark);

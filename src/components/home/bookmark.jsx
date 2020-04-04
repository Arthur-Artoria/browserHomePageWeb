import React, { Component } from 'react';
import { Popover, message, Popconfirm } from 'antd';
import { DeleteBookmark } from '../../assets/js/api';
import { connect } from 'react-redux';
import { Button, IconButton, Icon, Avatar } from '@material-ui/core';

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
        <IconButton
          className="bookmark-actions__btn"
          onClick={this.handleUpdateClick.bind(this, id)}
          aria-label="edit">
          <Icon className="bookmark-actions__icon">edit</Icon>
        </IconButton>
        <Popconfirm
          title="确定删除吗？"
          okText="确定"
          cancelText="取消"
          onConfirm={this.handleDeleteClick.bind(this, id)}>
          <IconButton className="bookmark-actions__btn" aria-label="delete">
            <Icon className="bookmark-actions__icon">delete</Icon>
          </IconButton>
        </Popconfirm>
      </div>
    );
  }

  /**
   * * 点击更改按钮
   * @param {number} id 待更改书签id
   */
  handleUpdateClick = id => {
    this.props.onUpdateBookmark(id);
  };

  /**
   * * 点击删除按钮
   * @param {number} id 待删除书签id
   */
  handleDeleteClick = id => {
    DeleteBookmark(id).then(res => {
      this.props.dispatch({ type: 'DELETE_BOOKMARK', payload: id });
      message.success('删除成功！');
    });
  };

  /**
   * * 渲染书签内容
   * @param {object} bookmark 书签
   */
  renderBookmarkCover(bookmark) {
    const { cover, name } = bookmark;
    if (!cover) return name.slice(0, 1);
    return <Avatar src={cover} className="bookmark-cover" />;
  }

  render() {
    const { bookmark } = this.props;
    const { href } = bookmark;
    return (
      <Popover
        content={this.bookmarkPopoverContent(bookmark)}
        className="bookmark">
        <Button
          href={href}
          shape="circle"
          color="primary"
          target="_blank"
          variant="contained"
          className="bookmark-cover">
          {this.renderBookmarkCover(bookmark)}
        </Button>
      </Popover>
    );
  }
}

export const Bookmark = connect()(_Bookmark);

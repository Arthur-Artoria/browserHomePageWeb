import React, { Component } from 'react';
import { Button, Popover, message } from 'antd';
import { DeleteBookmark } from '../../assets/js/api';
import { connect } from 'react-redux';

export class _Bookmark extends Component {
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
        <i
          onClick={this.handleDeleteClick.bind(this, id)}
          className="material-icons bookmark-actions__icon">
          delete
        </i>
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
          target="blank"
          shape="circle"
          className="bookmark-cover">
          {name.slice(0, 1)}
        </Button>
      </Popover>
    );
  }
}

export const Bookmark = connect()(_Bookmark);

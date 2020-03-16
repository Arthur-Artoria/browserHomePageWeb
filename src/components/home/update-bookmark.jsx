import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  Button
} from '@material-ui/core';

import React, { Component } from 'react';
import { mapReduxState } from '../../assets/js/tools';
import { connect } from 'react-redux';
import { UpdateBookmark as UpdateBookmarkApi } from '../../assets/js/api';
import { message } from 'antd';

export class _UpdateBookmark extends Component {
  form = {
    name: {
      value: ''
    },
    href: {
      value: ''
    }
  };

  transition = {
    duration: {
      enter: 400,
      exit: 400
    }
  };

  handleClose = () => {
    this.props.onDialogChange(false);
  };

  /**
   * * 获取当前更改的书签信息
   * @param {number} bookmarkId 当前更改的书签的id
   * @param {any[]} bookmarks 书签列表
   */
  getBookmark(bookmarkId, bookmarks) {
    const bookmark = bookmarks.find(({ id }) => bookmarkId === id);
    return bookmark || {};
  }

  /**
   * * 点击确定
   */
  handleOkClick = () => {
    const {
      name: { value: name },
      href: { value: href }
    } = this.form;
    const { bookmarkId, dispatch } = this.props;
    UpdateBookmarkApi(bookmarkId, { name, href }).then(res => {
      this.handleClose();
      dispatch({
        type: 'UPDATE_BOOKMARK',
        payload: { name, href, id: bookmarkId }
      });
      message.success('修改成功！');
    });
  };

  /**
   * * 输入框改变监听
   * @param {string} type 输入框的所对应属性
   * @param {Object} event 事件对象
   */
  handleInputChange = (type, { target: { value } }) => {
    this.form[type].value = value;
  };

  render() {
    const { visible, bookmarkId, bookmarks } = this.props;
    const { name, href } = this.getBookmark(bookmarkId, bookmarks);
    this.form.name.value = name;
    this.form.href.value = href;
    return (
      <Dialog
        className="bookmark-edit-dialog"
        transitionDuration={this.transition.duration}
        open={visible}>
        <DialogTitle>修改书签</DialogTitle>
        <DialogContent className="dialog-content">
          <TextField
            autoFocus
            required
            type="text"
            label="书签名称"
            defaultValue={name}
            onChange={this.handleInputChange.bind(this, 'name')}
            fullWidth
          />
          <TextField
            required
            type="text"
            margin="normal"
            label="书签地址"
            defaultValue={href}
            onChange={this.handleInputChange.bind(this, 'href')}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose}>取消</Button>
          <Button onClick={this.handleOkClick} color="primary">
            确定
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

function mapStateToProps(state) {
  return mapReduxState(state, ['bookmarks']);
}

export const UpdateBookmark = connect(mapStateToProps)(_UpdateBookmark);

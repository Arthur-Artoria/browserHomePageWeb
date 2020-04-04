import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Icon,
  Paper,
  Typography,
  Avatar
} from '@material-ui/core';

import React, { Component } from 'react';
import { mapReduxState, generateUUID } from '../../assets/js/tools';
import { connect } from 'react-redux';
import {
  UpdateBookmark as UpdateBookmarkApi,
  SaveBookmark
} from '../../assets/js/api';
import { message, Upload } from 'antd';

class _UpdateBookmark extends Component {
  form = {
    name: {
      value: '',
      error: false
    },
    href: {
      value: '',
      error: false
    }
  };

  transition = {
    duration: {
      enter: 400,
      exit: 400
    }
  };

  updateData = null;

  state = {
    cover: null,
    tempImg: null,
    formError: {
      name: false,
      href: false
    }
  };

  bookmark = null;

  componentDidUpdate(prevProps) {
    const { visible, action } = this.props;
    if (visible !== prevProps.visible && visible && action === 'update') {
      this.initState(this.bookmark);
    }
  }

  /**
   * * 判断对话框功能
   */
  getAction() {
    const { action } = this.props;
    if (action === 'update') {
      const { bookmarkId, bookmarks } = this.props;
      return this.getBookmark(bookmarkId, bookmarks);
    } else if (action === 'create') {
      return { name: null, href: null };
    }
  }

  /**
   * * 获取当前更改的书签信息
   * @param {number} bookmarkId 当前更改的书签的id
   * @param {any[]} bookmarks 书签列表
   */
  getBookmark(bookmarkId, bookmarks) {
    const bookmark = bookmarks.find(({ id }) => bookmarkId === id) || {};
    this.bookmark = bookmark;
    return bookmark || {};
  }

  /**
   * * 根据原书签信息初始化state
   * @param {object} bookmark 书签信息
   * @param {string} bookmark.cover 书签封面
   * @param {string} bookmark.coverName 书签封面图片真实名称
   * @param {string} bookmark.href 书签链接
   * @param {string} bookmark.name 书签名称
   */
  initState({ cover, coverName, href, name }) {
    this.form.name.value = name;
    this.form.href.value = href;
    if (!cover) return;
    this.setState({
      tempImg: cover,
      cover: coverName
    });
  }

  /**
   * * 更改书签
   * @param {object} bookmark 书签信息
   */
  updateBookmark(bookmark) {
    const { bookmarkId: id, dispatch } = this.props;
    UpdateBookmarkApi(id, bookmark).then(res => {
      dispatch({
        type: 'UPDATE_BOOKMARK',
        payload: { id, ...bookmark, cover: this.state.tempImg }
      });
      this.handleClose();
      message.success('修改成功！');
    });
  }

  /**
   * * 保存书签数据
   * @param {object} bookmark 新增的书签数据
   */
  saveBookmark(bookmark) {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
      this.saveBookmarkDatabase(bookmark);
    } else {
      this.saveBookmarkLocal(bookmark);
    }
  }

  /**
   * * 将书签保存在本地缓存中去
   * @param {object} bookmark 新增书签数据
   */
  saveBookmarkLocal(bookmark) {
    const bookmarkList = JSON.parse(localStorage.getItem('bookmarkList')) || [];
    bookmarkList.push(bookmark);
    localStorage.setItem('bookmarkList', JSON.stringify(bookmarkList));
    this.saveSuccess(bookmark);
  }

  /**
   * * 保存书签到数据库中去
   */
  saveBookmarkDatabase(bookmark) {
    SaveBookmark(bookmark).then(() => this.saveSuccess(bookmark));
  }

  /**
   * * 保存成功
   */
  saveSuccess(bookmark) {
    this.props.dispatch({
      type: 'PUSH_BOOKMARK',
      payload: { ...bookmark, cover: this.state.tempImg }
    });
    this.handleClose();
    message.success('保存书签成功！');
  }

  /**
   * * 关闭对话框
   */
  handleClose = () => {
    this.props.onDialogChange(false);
    this.setState({ tempImg: null, cover: null });
  };

  /**
   * * 点击确定
   */
  handleOkClick = () => {
    Object.keys(this.state.formError).forEach(this.handleInputBlur);
    const { formError } = this.state;
    if (formError.name || formError.href) return;

    const { action } = this.props;
    const {
      name: { value: name },
      href: { value: href }
    } = this.form;
    const { cover } = this.state;
    if (action === 'update') {
      this.updateBookmark({ name, href, cover });
    } else if (action === 'create') {
      this.saveBookmark({ name, href, cover });
    }
  };

  /**
   * * 输入框改变监听
   * @param {string} type 输入框的所对应属性
   * @param {Object} event 事件对象
   */
  handleInputChange = (type, { target: { value } }) => {
    this.form[type].value = value;
    this.handleInputBlur(type);
  };

  /**
   * * 上传之前的回调
   * @param {object} file 上传文件信息
   */
  handleBeforeUpload = file => {
    const { name, type, size } = file;
    const isJpgOrPng = type === 'image/jpeg' || type === 'image/png';
    if (!isJpgOrPng) message.error('你只能上传 JPG/PNG 格式的图片！');
    const isLt2M = size / 1024 / 1024 < 2;
    if (!isLt2M) message.error('图片大小不得超过 2M ！');
    this.updateData = { fileName: `/bookmark/${name}` };
    return isJpgOrPng && isLt2M;
  };

  /**
   * * 设置上传所需额外数据
   * @param {object} file 上传文件信息
   */
  setUpdateData = file => {
    const { name } = file;
    return { fileName: `/bookmark/${generateUUID()}${name}` };
  };

  /**
   * * 上传状态更改回调
   */
  handleUpdateChange = info => {
    const {
      file: { response, status }
    } = info;
    if (status === 'done') {
      const { name, img } = response;
      this.setState({ cover: name, tempImg: img });
    }
  };

  /**
   * * 根据上传图片信息渲染上传显示
   */
  renderUpdateContent() {
    const { tempImg } = this.state;
    if (tempImg) {
      return (
        <Paper elevation={0} className="dialog-avatar">
          <Avatar src={tempImg} className="dialog-avatar__img" />
          <Paper elevation={0} className="dialog-avatar__hover flex-center">
            <Icon>edit</Icon>
          </Paper>
        </Paper>
      );
    } else {
      return (
        <Paper variant="outlined" className="dialog-upload flex-center" square>
          <Icon>cloud_upload</Icon>
          上传
        </Paper>
      );
    }
  }

  /**
   * * 鼠标移出焦点监听
   * @param {string} type 输入框字段
   * @returns {Boolean} isError
   */
  handleInputBlur = type => {
    const { value } = this.form[type];
    const { formError } = this.state;
    formError[type] = !value;
    this.setState({ formError });
    return formError[type];
  };

  render() {
    const { visible, action } = this.props;
    const { name, href } = this.getAction();
    const { formError } = this.state;
    return (
      <Dialog
        className="bookmark-edit-dialog"
        transitionDuration={this.transition.duration}
        open={visible}>
        <DialogTitle>修改书签</DialogTitle>
        <DialogContent className="dialog-content">
          <TextField
            required
            fullWidth
            autoFocus
            type="text"
            label="书签名称"
            defaultValue={name}
            error={formError.name}
            onBlur={this.handleInputBlur.bind(this, 'name')}
            helperText={'书签名称不得为空！'}
            onChange={this.handleInputChange.bind(this, 'name')}
          />
          <TextField
            required
            fullWidth
            type="text"
            margin="normal"
            label="书签地址"
            defaultValue={href}
            error={formError.href}
            onBlur={this.handleInputBlur.bind(this, 'href')}
            helperText={'书签地址不得为空！'}
            onChange={this.handleInputChange.bind(this, 'href')}
          />
          {/* 图标设置 */}
          <Typography variant="body1" display="block" gutterBottom>
            图标设置
          </Typography>
          <Upload
            name="file"
            showUploadList={false}
            data={this.setUpdateData}
            onChange={this.handleUpdateChange}
            beforeUpload={this.handleBeforeUpload}
            action={`${process.env.REACT_APP_API_HOST}/oss/upload`}>
            {this.renderUpdateContent()}
          </Upload>
          {/* 图标设置·end */}
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose}>取消</Button>
          <Button
            variant="contained"
            onClick={this.handleOkClick}
            color="primary">
            {action === 'update' ? '确认' : '保存'}
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

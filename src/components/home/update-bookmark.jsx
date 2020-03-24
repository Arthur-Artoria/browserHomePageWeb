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

/**
 * @todo 原有图片无法显示
 */
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

  updateData = null;

  state = {
    cover: null,
    tempImg: null
  };

  /**
   * * 判断对话框功能
   */
  getAction() {
    const { action } = this.props;
    if (action === 'update') {
      const { bookmarkId, bookmarks } = this.props;
      return this.getBookmark(bookmarkId, bookmarks);
    } else if (action === 'create') {
      const {
        name: { value: name },
        href: { value: href }
      } = this.form;
      return { name, href };
    }
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
      return <Avatar src={tempImg} className="dialog-upload__img" />;
    } else {
      return (
        <Paper variant="outlined" className="dialog-upload flex-center" square>
          <Icon>cloud_upload</Icon>
          上传
        </Paper>
      );
    }
  }

  render() {
    const { visible, action } = this.props;
    const { name, href } = this.getAction();
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

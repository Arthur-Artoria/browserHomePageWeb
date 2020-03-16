import React, { Component } from 'react';
import { Modal, Form, Input, message } from 'antd';
import { SaveBookmark } from '../../assets/js/api';
import { connect } from 'react-redux';

/**
 * * 表单
 */
const BookmarkCreateForm = Form.create({ name: 'BookmarkCreateForm' })(
  class extends Component {
    formItemList = [
      {
        label: '名称',
        option: 'name',
        rules: [
          {
            required: true,
            message: '书签名称不得为空！'
          }
        ]
      },
      {
        label: '链接',
        option: 'href',
        rules: [
          {
            required: true,
            message: '链接不得为空！'
          }
        ]
      }
    ]; // 表单列表

    renderFormItem() {
      const { form } = this.props;
      const { getFieldDecorator } = form;

      return this.formItemList.map(({ label, option, rules }, index) => (
        <Form.Item key={index} label={label}>
          {getFieldDecorator(option, { rules })(<Input />)}
        </Form.Item>
      ));
    }

    render() {
      return <Form layout="vertical">{this.renderFormItem()}</Form>;
    }
  }
);

export class SettingModal extends Component {
  constructor(props, context) {
    super(props);
  }

  /**
   * * 设置弹窗显示与否
   * @param {Boolean} isVisible 控制弹窗是否显示
   */
  controlSettingModal = isVisible => {
    this.props.onVisibleChange(isVisible);
  };

  /**
   * * 点击确定
   */
  handleOk = e => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) return;
      this.saveBookmark(values);
      form.resetFields();
      this.controlSettingModal(false);
    });
  };

  /**
   * * 缓存书签数据
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
    SaveBookmark(bookmark).then(res => {
      this.saveSuccess(bookmark);
    });
  }

  /**
   * * 保存成功
   */
  saveSuccess(bookmark) {
    this.props.dispatch({ type: 'PUSH_BOOKMARK', payload: bookmark });
    message.success('保存书签成功！');
  }

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <Modal
        onOk={this.handleOk}
        centered
        onCancel={this.controlSettingModal.bind(this, false)}
        visible={this.props.visible}
        title="添加书签">
        <BookmarkCreateForm wrappedComponentRef={this.saveFormRef} />
      </Modal>
    );
  }
}

export const SettingModalContainer = connect()(SettingModal);

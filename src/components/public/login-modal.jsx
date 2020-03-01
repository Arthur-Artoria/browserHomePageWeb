import React, { Component } from 'react';
import { Modal, Form, Input, message } from 'antd';

/**
 * * 表单
 */
const LoginForm = Form.create({ name: 'BookmarkCreateForm' })(
  class extends Component {
    formItemList = [
      {
        label: '账号',
        option: 'account',
        rules: [
          {
            required: true,
            message: '账号不得为空！'
          }
        ]
      },
      {
        label: '密码',
        option: 'password',
        rules: [
          {
            required: true,
            message: '密码不得为空！'
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

export class LoginModal extends Component {
  /**
   * * 设置弹窗显示与否
   * @param {Boolean} isVisible 控制弹窗是否显示
   */
  controlModal = isVisible => {
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
      this.controlModal(false);
    });
  };

  /**
   * * 缓存书签数据
   * @param {object} bookmark 新增的书签数据
   */
  saveBookmark(bookmark) {
    const bookmarkList = JSON.parse(localStorage.getItem('bookmarkList')) || [];
    bookmarkList.push(bookmark);
    localStorage.setItem('bookmarkList', JSON.stringify(bookmarkList));
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
        onCancel={this.controlModal.bind(this, false)}
        visible={this.props.visible}
        title="登录">
        <LoginForm wrappedComponentRef={this.saveFormRef} />
      </Modal>
    );
  }
}

import React, { Component } from 'react';
import { Modal, Form, Input, message } from 'antd';
import { Login } from '../../assets/js/api';

/**
 * * 表单
 */
const LoginForm = Form.create({ name: 'BookmarkCreateForm' })(
  class extends Component {
    formItemList = [
      {
        label: '账号',
        option: 'username',
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
        type: 'password',
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

      return this.formItemList.map(
        ({ label, option, rules, type = 'text' }, index) => (
          <Form.Item key={index} label={label}>
            {getFieldDecorator(option, { rules })(<Input type={type} />)}
          </Form.Item>
        )
      );
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
      this.login(values);
      // form.resetFields();
      // this.controlModal(false);
    });
  };

  /**
   * * 登录
   * @param {object} formData 登录数据
   */
  login({ username, password }) {
    Login(username, password).then(({ access_token }) => {
      message.success('登录成功！');
      localStorage.setItem('access_token', access_token);
      window.location.reload();
    });
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

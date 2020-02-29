import React, { Component } from 'react';
import { Modal, Form, Input, message } from 'antd';

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
        onCancel={this.controlSettingModal.bind(this, false)}
        visible={this.props.visible}
        title="添加书签">
        <BookmarkCreateForm wrappedComponentRef={this.saveFormRef} />
      </Modal>
    );
  }
}

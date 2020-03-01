import React, { Component } from 'react';
import './actions.scss';
import { SettingModal } from './setting-modal';
import { LoginModal } from './login-modal';

export class Actions extends Component {
  state = {
    isVisibleSettingModal: false,
    actionList: {
      user: {
        icon: 'account_circle',
        isVisibleModal: false,
        handleClick: 'handleUserClick'
      },
      setting: {
        icon: 'settings',
        isVisibleModal: false,
        handleClick: 'controlModal'
      }
    }
  };

  /**
   * * 设置弹窗显示与否
   * @param {string} modal 弹窗的名称
   * @param {Boolean} isVisible 控制弹窗是否显示
   */
  controlModal = (modal, isVisible = true) => {
    const { actionList } = this.state;
    actionList[modal].isVisibleModal = !!isVisible;
    this.setState({ actionList });
  };

  /**
   * * 点击用户按钮
   */
  handleUserClick = () => {
    this.controlModal('user');
  };

  /**
   * * 渲染操作按钮列表
   */
  renderActionList = () => {
    const { actionList } = this.state;
    return Object.keys(actionList).map((key, index) => {
      const { icon, handleClick } = actionList[key];

      return (
        // 按钮
        <i
          key={index}
          onClick={this[handleClick].bind(this, key)}
          className="material-icons actions-icon">
          {icon}
        </i>
      );
    });
  };

  render() {
    return (
      <div id="actions">
        {this.renderActionList()}

        {/* 设置 对话框 */}
        <SettingModal
          onVisibleChange={this.controlModal.bind(this, 'setting')}
          visible={this.state.actionList.setting.isVisibleModal}
        />

        {/* 登录 对话框 */}
        <LoginModal
          onVisibleChange={this.controlModal.bind(this, 'user')}
          visible={this.state.actionList.user.isVisibleModal}
        />
      </div>
    );
  }
}

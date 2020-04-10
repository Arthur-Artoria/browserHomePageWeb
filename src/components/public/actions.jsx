import React, { Component } from 'react';
import './actions.scss';
import { LoginModalHook } from './login-modal-hook';
import { IconButton, Icon } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

export const Actions = withRouter(
  class Actions extends Component {
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
          route: '/setting',
          handleClick: 'handleSettingClick'
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
     * * 点击设置按钮
     */
    handleSettingClick = key => {
      const { route } = this.state.actionList[key];
      const {
        history,
        history: {
          location: { pathname }
        }
      } = this.props;
      pathname.includes(route) ? history.push('/') : history.push(route);
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
          <IconButton
            key={index}
            className="actions-icon"
            onClick={handleClick && this[handleClick].bind(this, key)}>
            <Icon>{icon}</Icon>
          </IconButton>
        );
      });
    };

    render() {
      return (
        <div id="actions">
          {this.renderActionList()}

          <LoginModalHook
            visible={this.state.actionList.user.isVisibleModal}
            onVisibleChange={this.controlModal.bind(this, 'user')}
          />
        </div>
      );
    }
  }
);

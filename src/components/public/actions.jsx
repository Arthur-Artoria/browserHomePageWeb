import React, { Component } from 'react';
import './actions.scss';
import { SettingModal } from './setting-modal';

export class Actions extends Component {
  state = {
    isVisibleSettingModal: false
  };

  /**
   * * 设置弹窗显示与否
   * @param {Boolean} isVisible 控制弹窗是否显示
   */
  controlSettingModal = isVisible => {
    this.setState({ isVisibleSettingModal: isVisible });
  };

  render() {
    return (
      <div id="actions">
        <i
          onClick={this.controlSettingModal.bind(this, true)}
          className="material-icons actions-icon">
          settings
        </i>

        {/* 设置 对话框 */}
        <SettingModal
          onVisibleChange={this.controlSettingModal}
          visible={this.state.isVisibleSettingModal}
        />
      </div>
    );
  }
}

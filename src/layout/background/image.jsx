import React, { Component } from 'react';

export class Image extends Component {
  /**
   * * 根据是否激活设置不同的className
   * @param {boolean} isActive 判断是否激活
   * @returns {string} className
   */
  setBackClassName(isActive) {
    const defaultClassName = `back bg`;
    return isActive ? `activeBack ${defaultClassName}` : defaultClassName;
  }

  render() {
    const { isActive, imageName } = this.props;
    // const image = require(`../../assets/images/background/${imageName}.jpg`);

    return (
      <div
        className={this.setBackClassName(isActive)}
        style={{ backgroundImage: `url(${imageName})` }}></div>
    );
  }
}

export default Image;

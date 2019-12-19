import React, { Component } from 'react'
import './index.scss'
export class Container extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeImage: 1
    }
    this.setRandomBackground = this.setRandomBackground.bind(this);
    this.setBackground()
  }

  /**
   * * 获取图片列表
   * 
   * @param {number} imgListLength 图片列表的长度
   * 
   * @returns {Array<number>} imgList 图片名称列表
   */
  getBackgroundImageList(imgListLength) {
    const imgList = [];
    let imgCount = 0;
    while (imgCount < imgListLength) {
      imgList.push(++imgCount);
    }

    return imgList;
  }


  /**
   * * 设置背景图
   */
  setBackground() {
    const imgList = this.getBackgroundImageList(26);

    // this.setRandomBackground(imgList);
    setInterval(this.setRandomBackground, 10000, imgList);
  }

  /**
   * * 随机显示背景图
   * @param {Array<number>} imgList 图片列表
   */
  setRandomBackground(imgList) {
    const random = imgList[Math.floor(Math.random() * imgList.length)];
    this.setState({ activeImage: random });
  }

  render() {
    const bj = require(`../../assets/images/background/${this.state.activeImage}.jpg`);
    return (
      <div id="container" className="bg" style={ { 'backgroundImage': `url(${bj})` } } >
        { this.props.children }
      </div >
    )
  }
}

export default Container

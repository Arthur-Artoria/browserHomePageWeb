import React, { Component } from 'react';
import './background.scss';
import Image from './image';
export class Background extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeImageIndex: 0 // 激活显示的图片在随机列表中的下标值
    };
    this.setRandomBackground = this.setRandomBackground.bind(this);
    this.setBackground();
  }

  /** @type {Array<number>} */
  randomImageList = []; // 随机得出的图片列表

  /** @type {Array<number>} */
  imgList = []; // 全部图片列表

  componentDidMount() {
    setTimeout(() => {
      const nextActiveImageIndex = this.state.activeImageIndex === 0 ? 1 : 0;
      this.setState({ activeImageIndex: nextActiveImageIndex });
    }, 2000);
    this.randomBackTimer = setInterval(
      this.setRandomBackground,
      20000,
      this.imgList
    );
  }

  componentWillUnmount() {
    clearInterval(this.randomBackTimer);
  }

  /**
   * * 获取图片列表
   * @param {number} imgListLength 图片列表的长度
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
    this.imgList = imgList;
    for (let index = 0; index < 2; index++) {
      this.randomImageList.push(this.getRandomImage(imgList));
    }
  }

  /**
   * * 获取已有随机列表中不包含的随机图片名称
   * @param {Array<number>} imgList 全部图片列表
   * @returns {number} random 获取的随机图片名称
   */
  getRandomImage(imgList) {
    let random = imgList[Math.floor(Math.random() * imgList.length)];
    while (this.randomImageList.includes(random)) {
      random = imgList[Math.floor(Math.random() * imgList.length)];
    }
    return random;
  }

  /**
   * * 随机显示背景图
   * @param {Array<number>} imgList 图片列表
   * @returns {function}
   */
  setRandomBackground(imgList) {
    const { activeImageIndex } = this.state;
    const nextActiveImageIndex = activeImageIndex === 0 ? 1 : 0;
    const random = this.getRandomImage(imgList);

    this.randomImageList[nextActiveImageIndex] = random;
    this.setState({ activeImageIndex: nextActiveImageIndex });

    return this.setRandomBackground;
  }

  /**
   * * 根据是否激活设置不同的className
   * @param {boolean} isActive 判断是否激活
   * @returns {string} className
   */
  setBackClassName(isActive) {
    const defaultClassName = 'back bg';
    return isActive ? `activeBack ${defaultClassName}` : defaultClassName;
  }

  render() {
    const { activeImageIndex } = this.state;
    const [first, second] = this.randomImageList;
    return (
      <div id="background">
        {/* 背景1 */}
        <Image
          imageName={first}
          imgList={this.imgList}
          isActive={activeImageIndex === 0}
        />

        {/* 背景2 */}
        <Image
          imageName={second}
          imgList={this.imgList}
          isActive={activeImageIndex === 1}
        />
      </div>
    );
  }
}

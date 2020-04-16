import React, { Component } from 'react';
import './background.scss';
import Image from './image';
import { GetPhotos, GetBingPhotos } from '../../assets/js/api';
import { connect } from 'react-redux';
import { mapReduxState } from '../../assets/js/tools';
export class _Background extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeImageIndex: 0 // 激活显示的图片在随机列表中的下标值
    };
    this.setRandomBackground = this.setRandomBackground.bind(this);
    this.getPhotos();
  }

  /** @type {Array<number>} */
  randomImageList = []; // 随机得出的图片列表

  /** @type {Array<number>} */
  imgList = []; // 全部图片列表

  componentDidUpdate(prevProps) {
    const { token, photos } = this.props;
    if (token && token !== prevProps.token) {
      this.getPhotos();
    }
    if (photos.length !== prevProps.photos.length) {
      this.setRandomBackground(photos);
      this.initRandomTimer(photos);
    }
  }

  componentWillUnmount() {
    clearInterval(this.randomBackTimer);
  }

  /**
   * * 获取背景图片
   */
  getPhotos() {
    GetPhotos().then(
      photos => {
        this.props.dispatch({
          type: 'SET_PHOTOS',
          payload: photos.filter(({ name }) => name !== '0')
        });
      },
      err => {
        this.getBingPhotos();
      }
    );
  }

  /**
   * * 获取必应图片
   */
  getBingPhotos() {
    GetBingPhotos().then(({ images }) => {
      this.props.dispatch({
        type: 'SET_PHOTOS',
        payload: images.map(({ url }) => ({
          name: `https://cn.bing.com${url}`
        }))
      });
    });
  }

  /**
   * * 初始化计时器
   */
  initRandomTimer(photos) {
    clearInterval(this.randomBackTimer);
    this.randomBackTimer = setInterval(this.setRandomBackground, 20000, photos);
  }

  /**
   * * 获取已有随机列表中不包含的随机图片名称
   * @param {any[]>} imgList 全部图片列表
   * @returns {string} random 获取的随机图片名称
   */
  getRandomImage(imgList) {
    if (!imgList.length) return '';
    let random = imgList[Math.floor(Math.random() * imgList.length)].name;
    while (this.randomImageList.includes(random)) {
      random = imgList[Math.floor(Math.random() * imgList.length)].name;
    }
    return random;
  }

  /**
   * * 随机显示背景图
   * @param {any[]} imgList 图片列表
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
        <Image imageName={first} isActive={activeImageIndex === 0} />

        {/* 背景2 */}
        <Image imageName={second} isActive={activeImageIndex === 1} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return mapReduxState(state, ['token', 'photos']);
}

export const Background = connect(mapStateToProps)(_Background);
